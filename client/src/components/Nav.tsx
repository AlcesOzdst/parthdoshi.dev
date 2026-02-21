import { Link, useLocation } from "wouter";

export function Nav() {
  const [location] = useLocation();
  const isBlog = location.startsWith("/blog");

  return (
    <nav className="w-full bg-black border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row md:items-center justify-between">
        <div className="text-sm flex items-center">
          <Link href="/">
            <a className="text-primary font-bold hover:underline cursor-pointer">guest@parthdoshi</a>
          </Link>
          <span className="text-white">:</span>
          <span className="text-blue-400">{isBlog ? "~/blog" : "~"}</span>
          <span className="text-white">$</span>
        </div>
        
        {isBlog ? (
          <div className="flex gap-4 text-xs mt-2 md:mt-0 text-muted-foreground">
            <Link href="/">
              <a className="hover:text-primary hover:underline">[0] cd ..</a>
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 text-xs mt-2 md:mt-0 text-muted-foreground">
            <a href="#about" className="hover:text-primary hover:underline">[1] ./about.sh</a>
            <a href="#skills" className="hover:text-primary hover:underline">[2] cat sys_specs.txt</a>
            <a href="#projects" className="hover:text-primary hover:underline">[3] ls -l ./projects</a>
            <Link href="/blog">
              <a className="hover:text-primary hover:underline">[4] cd ./blog</a>
            </Link>
            <a href="#contact" className="hover:text-primary hover:underline">[5] ssh connect</a>
          </div>
        )}
      </div>
    </nav>
  );
}
