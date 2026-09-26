import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="mono-label mb-2">404</p>
          <h1 className="text-xl font-serif font-semibold text-text mb-3">
            Nothing here
          </h1>
          <Link href="/">
            <a className="text-sm text-text-secondary hover:text-text transition-colors link-underline">
              ← Go home
            </a>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
