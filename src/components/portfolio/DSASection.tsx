import { Trophy, Target, Brain, BarChart3 } from "lucide-react";
import streakImg from "@/assets/leetcode.png";

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
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1508</div>
                  <div className="text-gray-text">Contest Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">250+</div>
                  <div className="text-gray-text">Problems Solved</div>
                </div>
              </div>

              {/* LeetCode Streak Image */}
              <div className="mt-6">
                <img
                  src={streakImg}
                  alt="LeetCode submissions heatmap (streak)"
                  className="w-full rounded-lg border border-border"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src.endsWith("/placeholder.svg")) return;
                    target.src = "/placeholder.svg";
                  }}
                />
                <p className="text-sm text-gray-text mt-2 text-center">
                  LeetCode submissions in the past year
                </p>
              </div>
            </div>

            <div className="card-gradient card-shadow rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Brain className="mr-2 h-5 w-5 text-primary" />
                Other Platforms
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>HackerRank</span>
                  <span className="text-primary font-semibold">Silver Badge (C, Java, Python)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Skillrack</span>
                  <span className="text-primary font-semibold">700+ Problems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DSASection;