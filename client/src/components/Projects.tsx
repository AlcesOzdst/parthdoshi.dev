const projects = [
  {
    permissions: "drwxr-xr-x",
    size: "4.2K",
    date: "Oct 12 14:20",
    name: "suricata_ids",
    desc: "Lightweight intrusion detection on Raspberry Pi 5. 100% detection rate."
  },
  {
    permissions: "-rw-r--r--",
    size: "1.8M",
    date: "Nov 05 09:15",
    name: "ddos_toolkit.py",
    desc: "Simulation toolkit for volumetric attacks. 10Gbps artificial surges."
  },
  {
    permissions: "drwxrwxr-x",
    size: "8.1K",
    date: "Dec 18 16:45",
    name: "project_omnis",
    desc: "AI-driven threat prediction platform (SIH 2025 Finalist)."
  },
  {
    permissions: "-rwxr-xr-x",
    size: "845B",
    date: "Jan 22 11:30",
    name: "thermal_response.cpp",
    desc: "IoT hardware automation for fire detection. <2s response time."
  }
];

export function Projects() {
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
                <tr key={i} className="hover:bg-primary/10 transition-colors">
                  <td className="py-2 pr-4 text-white/70">{p.permissions}</td>
                  <td className="py-2 pr-4 text-white/70">{p.size}</td>
                  <td className="py-2 pr-4 text-white/70">{p.date}</td>
                  <td className={`py-2 pr-4 font-bold ${p.permissions.startsWith('d') ? 'text-blue-400' : 'text-primary'}`}>
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
