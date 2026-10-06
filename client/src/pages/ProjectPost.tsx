import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useRoute } from "wouter";
import { parseMarkdown } from "@/lib/markdown";
import { ArrowLeft, ExternalLink, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Link } from "wouter";

const mdFiles = import.meta.glob("../content/projects/*.md", { query: "?raw", import: "default", eager: true });

const projectsData: Record<string, any> = {};

Object.entries(mdFiles).forEach(([path, raw]) => {
  const { meta, content } = parseMarkdown(raw as string);
  const id = path.split("/").pop()?.replace(".md", "") || "";

  projectsData[id] = {
    id,
    name: meta.name || id,
    desc: meta.desc || "",
    link: meta.link || null,
    github: meta.github || null,
    content,
  };
});

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("# ")) return <h2 key={i} className="text-2xl font-serif font-bold text-text mt-10 mb-4">{line.replace("# ", "")}</h2>;
    if (line.startsWith("## ")) return <h3 key={i} className="text-xl font-serif font-semibold text-text mt-8 mb-3">{line.replace("## ", "")}</h3>;
    if (line.startsWith("### ")) return <h4 key={i} className="text-lg font-serif font-semibold text-text mt-6 mb-2">{line.replace("### ", "")}</h4>;
    if (line.startsWith("- ")) {
      const text = line.replace("- ", "");
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return (
        <li key={i} className="ml-4 list-disc text-text-secondary my-1.5 pl-1">
          <span>
            {parts.map((part, index) => {
              if (part.startsWith("**") && part.endsWith("**")) return <strong key={index} className="text-text font-medium">{part.slice(2, -2)}</strong>;
              return part;
            })}
          </span>
        </li>
      );
    }
    if (line.match(/^!\[.*\]\(.*\)/)) {
      const match = line.match(/^!\[(.*)\]\((.*)\)/);
      return match ? (
        <figure key={i} className="my-8 space-y-2">
          <img src={match[2]} alt={match[1]} className="w-full rounded-lg border border-border" />
          <figcaption className="text-center mono-label italic">{match[1]}</figcaption>
        </figure>
      ) : null;
    }
    if (line === "") return <div key={i} className="h-3"></div>;

    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={i} className="mb-4 text-text-secondary leading-[1.75]">
        {parts.map((part, index) => {
          if (part.startsWith("**") && part.endsWith("**")) return <strong key={index} className="text-text font-medium">{part.slice(2, -2)}</strong>;
          return part;
        })}
      </p>
    );
  });
}

export default function ProjectPost() {
  const [, params] = useRoute("/projects/:id");
  const rawId = params?.id || "";
  const normalizedId = rawId.replace(/_/g, "-");
  const project = projectsData[rawId] || projectsData[normalizedId];

  if (!project) {
    return (
      <div className="min-h-screen">
        <Nav />
        <div className="page-container py-32 text-center">
          <h1 className="text-lg font-serif text-text-secondary italic mb-6">Not found.</h1>
          <Link href="/" className="text-sm text-text-secondary hover:text-text transition-colors link-underline">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Siblings for related navigation
  const allProjects = Object.values(projectsData);
  const siblings = allProjects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="page-container py-20 md:py-28">
        {/* Breadcrumb UI */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-text-secondary font-mono mb-8">
          <Link href="/" className="hover:text-text transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/#work" className="hover:text-text transition-colors">Projects</Link>
          <ChevronRight size={12} />
          <span className="text-text truncate max-w-[240px]">{project.name}</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-text leading-tight mb-3">
            {project.name}
          </h1>
          <p className="text-text-secondary leading-relaxed mb-5 text-base">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-pill-primary text-[12px]"
              >
                <ExternalLink size={12} />
                Live preview
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-pill-secondary text-[12px]"
              >
                <FaGithub size={12} />
                Source
              </a>
            )}
          </div>
        </div>

        <article className="border-t border-border pt-6">
          {renderMarkdown(project.content)}
        </article>

        {/* Related Projects Navigation */}
        <div className="mt-16 pt-8 border-t border-border">
          <h2 className="mono-label uppercase tracking-[0.16em] text-accent mb-4">
            Related Project Writeups
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {siblings.map((sib) => (
              <Link
                key={sib.id}
                href={`/projects/${sib.id}`}
                className="p-3.5 rounded border border-border bg-surface/30 hover:bg-surface/70 hover:border-accent/40 transition-all block"
              >
                <span className="font-display font-semibold text-sm text-text block mb-1 truncate">{sib.name}</span>
                <span className="mono-label text-[10px] text-accent">view project →</span>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/#work"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-text transition-colors"
            >
              <ArrowLeft size={13} /> Back to all projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
