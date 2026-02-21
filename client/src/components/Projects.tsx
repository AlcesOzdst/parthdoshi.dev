import { useLocation } from "wouter";
import { parseMarkdown } from "@/lib/markdown";

const mdFiles = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default', eager: true });

const projects = Object.entries(mdFiles).map(([path, raw]) => {
  const { meta } = parseMarkdown(raw as string);
  const id = path.split('/').pop()?.replace('.md', '') || '';
  
  return {
    id,
    permissions: meta.permissions || "drwxr-xr-x",
    size: meta.size || "4.0K",
    date: meta.date || "Unknown",
    name: meta.name || id,
    desc: meta.desc || ""
  };
});

export function Projects() {
  const [, setLocation] = useLocation();

  return (
    <section id="projects" className="py-8 border-t border-primary/20 border-dashed">
      <div className="container mx-auto px-4">
        
        <div className="text-sm md:text-base mb-6">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/projects</span>
          <span className="text-white">$</span> ls -la
        </div>

        <div className="ml-4 overflow-x-auto text-xs sm:text-sm">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="text-muted-foreground border-b border-primary/20">
                <th className="font-normal py-2 pr-4">PERMISSIONS</th>
                <th className="font-normal py-2 pr-4">SIZE</th>
                <th className="font-normal py-2 pr-4">DATE</th>
                <th className="font-normal py-2 pr-4">NAME</th>
                <th className="font-normal py-2">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr 
                  key={i} 
                  onClick={() => setLocation(`/projects/${p.id}`)}
                  className="hover:bg-primary/10 transition-colors cursor-pointer group"
                >
                  <td className="py-2 pr-4 text-white/70">{p.permissions}</td>
                  <td className="py-2 pr-4 text-white/70">{p.size}</td>
                  <td className="py-2 pr-4 text-white/70">{p.date}</td>
                  <td className={`py-2 pr-4 font-bold group-hover:underline ${p.permissions.startsWith('d') ? 'text-blue-400' : 'text-primary'}`}>
                    {p.name}
                  </td>
                  <td className="py-2 text-muted-foreground"># {p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
