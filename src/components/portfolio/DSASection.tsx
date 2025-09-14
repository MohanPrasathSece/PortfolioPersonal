import { Trophy, Target, Brain, BarChart3 } from "lucide-react";
import LeetCodeStats from "./LeetCodeStats";


// Brand logo URLs (Simple Icons SVG CDN / site favicon)
const ICONS = {
  leetcode: "https://cdn.simpleicons.org/leetcode/ffffff",
  hackerrank: "https://cdn.simpleicons.org/hackerrank/ffffff",
  codechef: "https://cdn.simpleicons.org/codechef/ffffff",
  skillrack: "https://skillrack.com/favicon.ico",
};

const DSASection = () => {
  const dsaTopics = [
    { name: "Arrays & Strings", progress: 95, icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Linked Lists", progress: 90, icon: <Target className="h-5 w-5" /> },
    { name: "Trees & Graphs", progress: 85, icon: <Brain className="h-5 w-5" /> },
    { name: "Dynamic Programming", progress: 80, icon: <Trophy className="h-5 w-5" /> },
    { name: "Graph Algorithms", progress: 85, icon: <Target className="h-5 w-5" /> },
    { name: "Sorting & Searching", progress: 95, icon: <BarChart3 className="h-5 w-5" /> }
  ];

  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            DSA & <span className="orange-gradient bg-clip-text text-transparent">Competitive Programming</span>
          </h2>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Strong foundation in data structures and algorithms with consistent competitive programming practice
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* LeetCode Stats */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-gradient card-shadow rounded-xl p-8 hover-glow">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary">LeetCode Stats</h3>
                  <p className="text-gray-text">Competitive Programming Journey</p>
                </div>
                <Trophy className="h-12 w-12 text-primary animate-pulse-orange" />
              </div>
              
              <LeetCodeStats username="MohanPrasathSece" />

              {/* LeetCode Profile Link (moved here) */}
              <a
                href="https://leetcode.com/u/MohanPrasathSece"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all hover-glow group"
              >
                <div className="flex items-center">
                  <div className="text-primary group-hover:text-primary-glow transition-smooth mr-4">
                    <img src={ICONS.leetcode} alt="LeetCode" className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">LeetCode</div>
                    <div className="text-gray-text text-sm">MohanPrasathSece - LeetCode Profile</div>
                  </div>
                </div>
                <div className="text-primary opacity-0 group-hover:opacity-100 transition-all">→</div>
              </a>
            </div>

            <div className="card-gradient card-shadow rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Brain className="mr-2 h-5 w-5 text-primary" />
                Other Platforms
              </h4>
              <div className="space-y-3">
                <a
                  href="https://www.hackerrank.com/profile/MohanPrasathSece"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all hover-glow group"
                >
                  <div className="flex items-center">
                    <div className="text-primary group-hover:text-primary-glow transition-smooth mr-4">
                      <img src={ICONS.hackerrank} alt="HackerRank" className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">HackerRank</div>
                      <div className="text-gray-text text-sm">Silver Badge (C, Java, Python)</div>
                    </div>
                  </div>
                  <div className="text-primary opacity-0 group-hover:opacity-100 transition-all">→</div>
                </a>
                <a
                  href="https://skillrack.com/faces/resume.xhtml?id=484447&key=93fccd1923168209fb2de154e69195ba5f0882c7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all hover-glow group"
                >
                  <div className="flex items-center">
                    <div className="text-primary group-hover:text-primary-glow transition-smooth mr-4">
                      <img src={ICONS.skillrack} alt="Skillrack" className="h-5 w-5 rounded-sm" />
                    </div>
                    <div>
                      <div className="font-medium">Skillrack</div>
                      <div className="text-gray-text text-sm">700+ Problems Solved</div>
                    </div>
                  </div>
                  <div className="text-primary opacity-0 group-hover:opacity-100 transition-all">→</div>
                </a>
                <a
                  href="https://www.codechef.com/users/mohanprasaths"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all hover-glow group"
                >
                  <div className="flex items-center">
                    <div className="text-primary group-hover:text-primary-glow transition-smooth mr-4">
                      <img src={ICONS.codechef} alt="CodeChef" className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">CodeChef</div>
                      <div className="text-gray-text text-sm">156 Problems Solved</div>
                    </div>
                  </div>
                  <div className="text-primary opacity-0 group-hover:opacity-100 transition-all">→</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DSASection;