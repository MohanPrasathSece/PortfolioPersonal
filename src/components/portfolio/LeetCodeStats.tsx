import { useEffect, useMemo, useState } from "react";
import { Trophy, CheckCircle2 } from "lucide-react";

interface ContestInfo {
  rating?: number | null;
  topPercentage?: number | null;
  historyRating?: number | null;
}

interface ProblemsInfo {
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
}

interface Props {
  username: string;
  overrideRating?: number;
  overrideSolvedDisplay?: string;
}

// Free community API (no key needed): https://github.com/alfaarghya/alfa-leetcode-api
// Endpoints used:
// - GET https://alfa-leetcode-api.onrender.com/userProfile/{username}
// - GET https://alfa-leetcode-api.onrender.com/userContestRankingInfo/{username}
export default function LeetCodeStats({ username, overrideRating, overrideSolvedDisplay }: Props) {
  const [contest, setContest] = useState<ContestInfo | null>(null);
  const [problems, setProblems] = useState<ProblemsInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // simple localStorage cache with TTL to avoid rate limits
    const TTL_MS = 1000 * 60 * 60 * 6; // 6 hours
    const now = Date.now();
    const readCache = (key: string) => {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const obj = JSON.parse(raw);
        if (typeof obj?.ts !== 'number' || (now - obj.ts) > TTL_MS) return null;
        return obj.data;
      } catch { return null; }
    };
    const writeCache = (key: string, data: any) => {
      try { localStorage.setItem(key, JSON.stringify({ ts: now, data })); } catch {}
    };

    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

    const COOLDOWN_MS = 1000 * 60 * 10; // 10 minutes
    async function getJsonWithCache(cacheKey: string, url: string) {
      const cached = readCache(cacheKey);
      // global cooldown: if we recently hit 429, avoid network entirely
      try {
        const cdRaw = localStorage.getItem('lc_api_cooldown');
        const cd = cdRaw ? Number(cdRaw) : 0;
        if (cd && now < cd) {
          if (cached) return { json: cached, fromCache: true } as const;
          throw new Error('Rate limited (cooldown active)');
        }
      } catch {}
      if (cached) return { json: cached, fromCache: true } as const;
      // minimal retry/backoff
      for (let attempt = 0; attempt < 2; attempt++) {
        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (res.ok) {
          const json = await res.json();
          writeCache(cacheKey, json);
          return { json, fromCache: false } as const;
        }
        // 429 or transient error: small backoff
        if (res.status === 429) {
          // set cooldown to avoid spamming logs and requests
          try { localStorage.setItem('lc_api_cooldown', String(now + COOLDOWN_MS)); } catch {}
          await sleep(500 + attempt * 750);
          continue;
        } else {
          // non-retryable error
          break;
        }
      }
      // fall back to cache if available
      if (cached) return { json: cached, fromCache: true } as const;
      throw new Error('Rate limited or failed to fetch');
    }

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const profileUrl = `https://alfa-leetcode-api.onrender.com/userProfile/${encodeURIComponent(username)}`;
        const contestUrl = `https://alfa-leetcode-api.onrender.com/userContestRankingInfo/${encodeURIComponent(username)}`;

        const [{ json: profileJson }, { json: contestJson }] = await Promise.all([
          getJsonWithCache(`lc_profile_${username}`, profileUrl),
          getJsonWithCache(`lc_contest_${username}`, contestUrl),
        ]);

        if (cancelled) return;

        // Profile response commonly contains: totalSolved, easySolved, mediumSolved, hardSolved
        const probs: ProblemsInfo = {
          totalSolved: profileJson?.totalSolved ?? profileJson?.matchedUser?.submitStats?.acSubmissionNum?.[0]?.count,
          easySolved: profileJson?.easySolved,
          mediumSolved: profileJson?.mediumSolved,
          hardSolved: profileJson?.hardSolved,
        };

        // Contest response: userContestRanking.rating; fallback to the latest non-null rating from history
        const cinfo: ContestInfo = {
          rating: contestJson?.userContestRanking?.rating ?? null,
          topPercentage: contestJson?.userContestRanking?.topPercentage ?? null,
          historyRating: (() => {
            const hist = contestJson?.userContestRankingHistory;
            if (Array.isArray(hist) && hist.length > 0) {
              // Find the last entry that has a rating
              for (let i = hist.length - 1; i >= 0; i--) {
                const r = hist[i]?.rating;
                if (typeof r === 'number' && !Number.isNaN(r)) return r;
              }
            }
            return null;
          })(),
        };

        setProblems(probs);
        setContest(cinfo);
      } catch (e: any) {
        if (!cancelled) {
          // Last-ditch cache read (even if stale)
          try {
            const staleP = localStorage.getItem(`lc_profile_${username}`);
            const staleC = localStorage.getItem(`lc_contest_${username}`);
            if (staleP || staleC) {
              const p = staleP ? JSON.parse(staleP)?.data : null;
              const c = staleC ? JSON.parse(staleC)?.data : null;
              if (p) {
                setProblems({
                  totalSolved: p?.totalSolved ?? p?.matchedUser?.submitStats?.acSubmissionNum?.[0]?.count,
                  easySolved: p?.easySolved,
                  mediumSolved: p?.mediumSolved,
                  hardSolved: p?.hardSolved,
                });
              }
              if (c) {
                setContest({
                  rating: c?.userContestRanking?.rating ?? null,
                  topPercentage: c?.userContestRanking?.topPercentage ?? null,
                  historyRating: (() => {
                    const hist = c?.userContestRankingHistory;
                    if (Array.isArray(hist) && hist.length > 0) {
                      for (let i = hist.length - 1; i >= 0; i--) {
                        const r = hist[i]?.rating;
                        if (typeof r === 'number' && !Number.isNaN(r)) return r;
                      }
                    }
                    return null;
                  })(),
                });
              }
            }
          } catch {}
          setError(e?.message || 'Unable to load LeetCode stats');
        }
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
  const solvedDisplay = overrideSolvedDisplay ?? String(totalSolved);
  const rating = useMemo(() => {
    if (typeof overrideRating === 'number') {
      return Math.round(overrideRating);
    }
    if (!contest) return null;
    const latest = contest.historyRating; // prefer latest from history
    const fallback = contest.rating;      // fallback to overall rating
    const chosen = typeof latest === 'number' ? latest : (typeof fallback === 'number' ? fallback : null);
    return chosen != null ? Math.round(chosen) : null;
  }, [contest, overrideRating]);

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
        <div className="flex items-center justify-center gap-2 text-[26px] md:text-3xl font-bold text-primary mb-2">
          <Trophy className="h-5 w-5 md:h-6 md:w-6" />
          <span>{rating ?? "—"}</span>
        </div>
        <div className="typ-small">Latest Contest Rating</div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-[26px] md:text-3xl font-bold text-primary mb-2">
          <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6" />
          <span>{solvedDisplay}</span>
        </div>
        <div className="typ-small">Problems Solved</div>
      </div>
    </div>
  );
}
