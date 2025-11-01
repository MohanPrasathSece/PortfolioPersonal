import { Github, ExternalLink, GitPullRequest, Star } from "lucide-react";
import TinyStars from "@/components/portfolio/TinyStars";
import { Button } from "@/components/ui/button";

type OSS = {
  name: string;
  org: string;
  whatIDid: string[];
  tech: string[];
  repo: string;
  pr: string;
  issue: string;
};

const badges = [
  { label: "Super Contributor", icon: Star },
  { label: "6+ Open Source PRs", icon: GitPullRequest },
  { label: "Docs & Code", icon: ExternalLink },
  { label: "TypeScript", icon: Star },
  { label: "Performance", icon: Star },
  { label: "Accessibility", icon: Star },
];

const projects: OSS[] = new Array(6).fill(0).map((_, i) => ({
  name: `Open Source Project ${i + 1}`,
  org: `Organization ${i + 1}`,
  whatIDid: ["Short summary #1", "Short summary #2"],
  tech: ["TypeScript", "React"],
  repo: "#", pr: "#", issue: "#",
}));

export default function OpenSourceSection() {
  // Auto-load up to 6 badge images from assets/oss/badges
  const badgeModules = import.meta.glob('/src/assets/oss/badges/*.{png,PNG,svg,SVG,webp,WEBP}', { eager: true, import: 'default' }) as Record<string, string>;
  const badgeImages = Object.values(badgeModules).slice(0, 6);
  return (
    <section id="open-source" className="relative py-16 md:py-24 px-4 md:px-6">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <TinyStars densityScale={1.0} />
      </div>

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Open Source</h2>
          <p className="text-muted-foreground">Super contributor across 6 projects</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {badges.map((b, i) => {
            const Icon = b.icon as any;
            return (
              <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur text-sm">
                <Icon className="h-4 w-4 text-primary" />{b.label}
              </span>
            );
          })}
        </div>

        <div className="mb-12">
          <h3 className="text-center text-lg font-semibold mb-4">Hacktoberfest Badges</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 items-center justify-items-center">
            {Array.from({ length: 6 }).map((_, i) => {
              const src = badgeImages[i];
              return (
                <div key={i} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border border-border/60 bg-card/50 flex items-center justify-center overflow-hidden">
                  {src ? (
                    <img src={src} alt={`Badge ${i + 1}`} className="object-contain w-full h-full" />
                  ) : (
                    <span className="text-[10px] sm:text-xs text-muted-foreground">Add badge {i + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">Place up to 6 images in src/assets/oss/badges (png/svg/webp).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <div key={idx} className="bg-card/50 backdrop-blur border border-border/60 rounded-2xl p-5 hover:border-primary/50 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.org}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded bg-primary/10 text-primary border border-primary/20">Contribution</span>
              </div>
              <p className="text-sm font-medium mb-1">What I implemented</p>
              <ul className="space-y-1 mb-3">
                {p.whatIDid.map((w, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-primary">•</span>{w}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tech.map((t) => (<span key={t} className="px-2 py-1 text-xs rounded border border-border bg-background/60">{t}</span>))}
              </div>
              <div className="flex gap-2">
                <a href={p.repo} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm" className="gap-2"><Github className="h-4 w-4"/>Repo</Button></a>
                <a href={p.pr} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm" className="gap-2"><GitPullRequest className="h-4 w-4"/>PR</Button></a>
                <a href={p.issue} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm">Issue</Button></a>
              </div>
            </div>
          ))}
        </div>

        {/* PLT placeholder */}
        <div className="mt-10 rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Proof/Links Table (PLT) – paste links to PRs, issues, discussions here.</p>
            <ExternalLink className="h-4 w-4 text-muted-foreground"/>
          </div>
        </div>
      </div>
    </section>
  );
}
