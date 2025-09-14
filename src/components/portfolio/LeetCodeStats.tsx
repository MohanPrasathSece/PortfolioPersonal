import { useEffect, useMemo, useState } from "react";
import { Trophy, CheckCircle2 } from "lucide-react";

interface ContestInfo {
  rating?: number | null;
  topPercentage?: number | null;
}

interface ProblemsInfo {
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
}

interface Props {
  username: string;
}

// Free community API (no key needed): https://github.com/alfaarghya/alfa-leetcode-api
// Endpoints used:
// - GET https://alfa-leetcode-api.onrender.com/userProfile/{username}
// - GET https://alfa-leetcode-api.onrender.com/userContestRankingInfo/{username}
export default function LeetCodeStats({ username }: Props) {
  const [contest, setContest] = useState<ContestInfo | null>(null);
  const [problems, setProblems] = useState<ProblemsInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const profileUrl = `https://alfa-leetcode-api.onrender.com/userProfile/${encodeURIComponent(username)}`;
        const contestUrl = `https://alfa-leetcode-api.onrender.com/userContestRankingInfo/${encodeURIComponent(username)}`;

        const [profileRes, contestRes] = await Promise.all([
          fetch(profileUrl, { headers: { "Accept": "application/json" } }),
          fetch(contestUrl, { headers: { "Accept": "application/json" } }),
        ]);

        if (!profileRes.ok || !contestRes.ok) {
          throw new Error("Failed to fetch from LeetCode API");
        }

        const profileJson = await profileRes.json();
        const contestJson = await contestRes.json();

        if (cancelled) return;

        // Profile response commonly contains: totalSolved, easySolved, mediumSolved, hardSolved
        const probs: ProblemsInfo = {
          totalSolved: profileJson?.totalSolved ?? profileJson?.matchedUser?.submitStats?.acSubmissionNum?.[0]?.count,
          easySolved: profileJson?.easySolved,
          mediumSolved: profileJson?.mediumSolved,
          hardSolved: profileJson?.hardSolved,
        };

        // Contest response: userContestRanking.rating
        const cinfo: ContestInfo = {
          rating: contestJson?.userContestRanking?.rating ?? null,
          topPercentage: contestJson?.userContestRanking?.topPercentage ?? null,
        };

        setProblems(probs);
        setContest(cinfo);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Unable to load LeetCode stats");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const totalSolved = useMemo(() => problems?.totalSolved ?? 0, [problems]);
  const rating = useMemo(() => (contest?.rating ? Math.round(contest.rating) : null), [contest]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-6 animate-pulse">
        <div className="text-center">
          <div className="h-8 w-20 mx-auto rounded bg-secondary/60 mb-2" />
          <div className="h-4 w-24 mx-auto rounded bg-secondary/50" />
        </div>
        <div className="text-center">
          <div className="h-8 w-20 mx-auto rounded bg-secondary/60 mb-2" />
          <div className="h-4 w-28 mx-auto rounded bg-secondary/50" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">—</div>
          <div className="text-gray-text">Contest Rating</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">—</div>
          <div className="text-gray-text">Problems Solved</div>
        </div>
        <div className="col-span-2 text-center text-xs text-gray-text/80">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary mb-2">
          <Trophy className="h-6 w-6" />
          <span>{rating ?? "—"}</span>
        </div>
        <div className="text-gray-text">Contest Rating</div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary mb-2">
          <CheckCircle2 className="h-6 w-6" />
          <span>{totalSolved}</span>
        </div>
        <div className="text-gray-text">Problems Solved</div>
      </div>
    </div>
  );
}
