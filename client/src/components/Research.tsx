import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { 
  X, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  Sidebar, 
  Layers, 
  Tag, 
  ShieldCheck, 
  AlertTriangle, 
  Terminal, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  BookOpen
} from "lucide-react";

export interface FindingDetail {
  number: string;
  title: string;
  program: string;
  icon: string;
  severity: "Critical" | "High" | "Medium";
  cvss: string;
  cwe: string;
  status: string;
  date: string;
  bounty?: string;
  shortDesc: string;
  tags: string[];
  callout: string;
  overview: string;
  technicalAnalysis: string;
  pocSnippet: {
    language: string;
    code: string;
    caption: string;
  };
  impact: string;
  remediation: string;
  keyTakeaway: string;
}

const findingsData: FindingDetail[] = [
  {
    number: "001",
    title: "Responsible Disclosure – IDOR in University ERP Portal",
    program: "MIT-WPU University ERP Portal",
    icon: "🎓",
    severity: "High",
    cvss: "8.5 (CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N)",
    cwe: "CWE-639: Authorization Bypass Through User-Controlled Key (IDOR)",
    status: "Resolved & Disclosed",
    date: "July 2024",
    bounty: "Responsible Disclosure Acknowledgment",
    shortDesc:
      "Identified an Insecure Direct Object Reference (IDOR) affecting the university ERP portal by manipulating student PRN identifiers, demonstrating unauthorized access to student profile resources.",
    tags: ["idor", "burp-suite", "access-control", "responsible-disclosure"],
    callout:
      "Parameter manipulation of student PRN identifiers in session-authenticated requests allowed unprivileged queries to access profile databases of any enrolled student.",
    overview:
      "During security assessments of the campus enterprise resource planning (ERP) portal, I analyzed the student profile and record query endpoints. While session tokens authenticated that the user was an enrolled student, individual database queries trusted raw PRN request parameters without validating object-level ownership.",
    technicalAnalysis:
      "By intercepting HTTP requests using Burp Suite and modifying the 'student_prn' parameter in the query payload, the backend API returned full student demographic, academic, and fee-payment records belonging to arbitrary students. I prepared a formal vulnerability assessment report with CVSS v3.1 scoring and submitted it directly to the university administration.",
    pocSnippet: {
      language: "http",
      code: `POST /api/v1/portal/student/profile-fetch HTTP/1.1
Host: erp.mitwpu.edu.in
Authorization: Bearer <valid_student_jwt>
Content-Type: application/json

{"target_prn": "1032210892"} <!-- Modified to target PRN -->

HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "success",
  "prn": "1032210892",
  "name": "REDACTED",
  "dob": "2003-08-14",
  "contact": "+91-98XXXXXXXX",
  "academic_record": { "gpa": 8.92, "branch": "ECE" }
}`,
      caption: "IDOR parameter modification via Burp Suite exfiltrating unauthorized student records.",
    },
    impact:
      "Unauthorized horizontal privilege escalation permitting any authenticated student to scrape thousands of sensitive personal records, contact information, and academic histories across the entire university student body.",
    remediation:
      "The university development team instituted server-side session-binding checks ensuring that requested PRN resources strictly match the authenticated user identity extracted from the verified JWT claim.",
    keyTakeaway:
      "Authentication proves who a user is; authorization proves what they are allowed to touch. Object-level access control must be validated on every single query.",
  },
  {
    number: "002",
    title: "CORS Misconfiguration & Unauthenticated Admin Endpoints → Account Takeover",
    program: "Under Armour Bug Bounty",
    icon: "🛡️",
    severity: "Critical",
    cvss: "9.1 (CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:N)",
    cwe: "CWE-942: Permissive Cross-Origin Resource Sharing & CWE-306",
    status: "Resolved · Hall of Fame",
    date: "2024",
    bounty: "Bounty & Hall of Fame Acknowledgment",
    shortDesc:
      "A permissive CORS origin reflection paired with an exposed administrative routing table enabled cross-origin session theft and silent full account takeover.",
    tags: ["cors-reflection", "account-takeover", "api-security", "auth-bypass"],
    callout:
      "The server reflected arbitrary origin headers without verifying domain ownership while simultaneously allowing Access-Control-Allow-Credentials: true on session-bearing endpoints.",
    overview:
      "During security auditing of Under Armour's external web footprint, I mapped legacy staging endpoints routed behind an edge reverse proxy. While primary login gateways enforced strict origin validation, auxiliary internal admin endpoints reflected arbitrary 'Origin' headers sent in cross-site requests.",
    technicalAnalysis:
      "The application verified origins using a flawed regex matching prefix patterns, allowing subdomains like 'attacker-underarmour.com'. Furthermore, internal administrative API routes (/api/v2/internal/admin/sessions) failed to enforce authorization middleware, relying solely on edge proxy IP whitelisting that had slipped through during infrastructure migration.",
    pocSnippet: {
      language: "http",
      code: `GET /api/v2/internal/admin/user/session-dump HTTP/1.1
Host: api.target.com
Origin: https://malicious-domain.com
Cookie: session_token=s%3A7F8a99b2c...
Sec-Fetch-Site: cross-site

HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://malicious-domain.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: Set-Cookie, X-Admin-Token
Content-Type: application/json

{"status":"success","user_id":"admin_0921","auth_hash":"e2c84...","permissions":["SUPERUSER"]}`,
      caption: "CORS preflight & credential reflection leading to credential exfiltration via malicious payload.",
    },
    impact:
      "An unauthenticated external attacker could lure an authenticated employee or user to a malicious page. A background script would execute silent cross-origin fetches, reading the reflected response body, extracting sensitive session tokens, and hijacking high-privilege administrative accounts.",
    remediation:
      "Under Armour implemented a strict origin allowlist containing only verified production domains, removed wildcard credentials policies, and refactored internal endpoint routing to require multi-factor JWT validation regardless of origin context.",
    keyTakeaway:
      "Never rely on network perimeter or regex prefix matches for cross-origin security. CORS policies must treat every domain as hostile unless explicitly validated against a hard-coded canonical origin set.",
  },
  {
    number: "003",
    title: "GraphQL Introspection Leakage Exposing Hidden Mutations & PII Storage Routes",
    program: "Whatnot · HackerOne",
    icon: "⚡",
    severity: "High",
    cvss: "8.2 (CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:L/A:N)",
    cwe: "CWE-200: Exposure of Sensitive Information via Introspection",
    status: "Resolved · Triaged by Security Team",
    date: "2024",
    bounty: "Awarded Bounty",
    shortDesc:
      "Production GraphQL gateway left schema introspection enabled, revealing unreleased administrative mutations and hidden query fields for user PII.",
    tags: ["graphql", "introspection", "information-disclosure", "schema-leak"],
    callout:
      "Introspection queries returned the entire AST schema of internal services, allowing precise parameter construction for unpublished administrative mutations.",
    overview:
      "While testing GraphQL gateway endpoints on a high-traffic live-stream commerce application, standard queries were restricted. However, submitting an obfuscated full introspection query payload (__schema and __type queries) bypassed rate-limiting and dumped the comprehensive API graph.",
    technicalAnalysis:
      "The GraphQL engine was configured with introspection enabled for staging environments, but a configuration drift during canary releases caused the introspection flag to remain active on production edge clusters. Analysis of the 14,000-line schema revealed deprecated endpoints containing sensitive user payment metadata and hidden debug mutations capable of adjusting inventory counts.",
    pocSnippet: {
      language: "graphql",
      code: `query IntrospectAdminGraph {
  __schema {
    types {
      name
      fields {
        name
        type { name kind }
        args { name type { name } }
      }
    }
    mutationType {
      name
      fields {
        name
        description # Exposed internal developer comments
      }
    }
  }
}`,
      caption: "Full schema extraction revealing internal mutation signatures and confidential developer annotations.",
    },
    impact:
      "Attackers could map out the entire internal object model, discover administrative interfaces that were not linked anywhere in web assets, and formulate targeted IDOR or broken object level authorization (BOLA) attacks against unhardened backend microservices.",
    remediation:
      "Disabled GraphQL introspection across all production gateways using Apollo Server middleware flags, and instituted automated CI/CD security linters that fail builds if introspection is detected in production manifests.",
    keyTakeaway:
      "GraphQL without introspection disabled is equivalent to giving attackers your complete source code database schema. Defense in depth requires schema hiding combined with field-level authorization.",
  },
  {
    number: "004",
    title: "Smart-Contract Reentrancy & Hash Collision Signature Bypass",
    program: "The Graph · Immunefi & HTB CTF",
    icon: "🔬",
    severity: "High",
    cvss: "8.6 (CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:N)",
    cwe: "CWE-841: Reliance on Untrusted Inputs in a Security Decision",
    status: "Validated · Audit Writeup",
    date: "2024",
    bounty: "Research & CTF First Blood",
    shortDesc:
      "Exploited tight state-update timing via abi.encodePacked hash collision to bypass on-chain cryptographic signature verification.",
    tags: ["solidity", "reentrancy", "hash-collision", "smart-contract"],
    callout:
      "Using dynamic types in abi.encodePacked creates identical hashes for different input combinations, allowing signature re-use across unauthorized parameters.",
    overview:
      "In smart-contract security audits and CTF challenges, cryptographic signatures are commonly used to authorize token distributions and privilege escalation. When signing functions utilize abi.encodePacked with multiple dynamic parameters (e.g. string or bytes), hash collisions occur naturally.",
    technicalAnalysis:
      "The contract validated off-chain ECDSA signatures against `keccak256(abi.encodePacked(userRole, userName, nonce))`. Because `abi.encodePacked('admin', 'parth', 1)` produces the exact same packed byte sequence as `abi.encodePacked('ad', 'minparth', 1)`, an attacker with a valid signature for one combination could reorder characters across variable boundaries to satisfy privileged role checks.",
    pocSnippet: {
      language: "solidity",
      code: `// Vulnerable signing verification
function verifyClaim(string memory role, string memory user, uint256 nonce, bytes memory sig) public view returns (bool) {
    // VULNERABILITY: Hash collision with dynamic types in encodePacked
    bytes32 messageHash = keccak256(abi.encodePacked(role, user, nonce));
    bytes32 ethSignedMessageHash = keccak256(abi.encodePacked("\\x19Ethereum Signed Message:\\n32", messageHash));
    return recoverSigner(ethSignedMessageHash, sig) == trustedAdmin;
}

// Exploit:
// User registers with user="min_user", role="ad"
// Yields identical hash as role="admin", user="_user"!`,
      caption: "Solidity collision PoC demonstrating privilege escalation via signature reallocation.",
    },
    impact:
      "Enables malicious participants to forge claims, bypass governance thresholds, and withdraw staked tokens by recycling valid administrative authorization signatures under spoofed identity schemas.",
    remediation:
      "Replaced `abi.encodePacked` with `abi.encode` which enforces 32-byte word padding between parameters, completely eliminating hash collision ambiguity. Also incorporated OpenZeppelin's ECDSA and ReentrancyGuard contracts.",
    keyTakeaway:
      "Cryptographic security is only as sound as the serialization layer underneath it. Always use standard ABI encoding with length-prefixing or type-safe EIP-712 structured data hashing.",
  },
];

export function Research() {
  const [selectedFinding, setSelectedFinding] = useState<FindingDetail | null>(null);
  const [peekMode, setPeekMode] = useState<"side" | "center">("side");

  // Keyboard navigation & escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedFinding) return;
      if (e.key === "Escape") {
        setSelectedFinding(null);
      } else if (e.key === "ArrowLeft") {
        const curIdx = findingsData.findIndex((f) => f.number === selectedFinding.number);
        if (curIdx > 0) setSelectedFinding(findingsData[curIdx - 1]);
      } else if (e.key === "ArrowRight") {
        const curIdx = findingsData.findIndex((f) => f.number === selectedFinding.number);
        if (curIdx < findingsData.length - 1) setSelectedFinding(findingsData[curIdx + 1]);
      }
    };

    if (selectedFinding) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFinding]);

  const currentIndex = selectedFinding ? findingsData.findIndex((f) => f.number === selectedFinding.number) : -1;

  return (
    <section id="findings" className="section-spacing">
      <div>
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow mb-3">04 — Security Findings</p>
              <h2 className="display text-3xl md:text-5xl leading-tight">
                Vulnerabilities &amp; <span className="italic-accent">research writeups</span>.
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="mono-label hidden sm:inline-flex items-center gap-1.5 text-text-secondary">
                <BookOpen size={13} className="text-accent" /> Click any item for Notion peek view
              </span>
              <a
                href="https://tryhackme.com/p/AlcesOzdst"
                target="_blank"
                rel="noreferrer"
                className="mono-label u-link hover:text-text transition-colors inline-flex items-center gap-1"
              >
                tryhackme ↗
              </a>
            </div>
          </div>
        </Reveal>

        {/* Findings Cards Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {findingsData.map((f, i) => (
            <Reveal key={f.number} delay={i * 0.08}>
              <div
                onClick={() => setSelectedFinding(f)}
                className="card h-full p-6 md:p-7 transition-all duration-300 hover:border-accent hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
                data-cursor="open peek"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedFinding(f)}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg select-none">{f.icon}</span>
                      <span className="font-mono text-xs text-accent font-semibold">{f.number}</span>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface border border-border text-text-secondary">
                      {f.severity}
                    </span>
                  </div>

                  <p className="mono-label text-accent/90 mb-2">{f.program}</p>
                  <h3 className="font-display font-semibold text-lg leading-snug mb-3 group-hover:text-accent transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-6">{f.shortDesc}</p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="mono-label text-[10px]">{f.tags.slice(0, 2).join(" · ")}</span>
                  <span className="font-mono text-[11px] text-accent inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    peek writeup ↝
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Notion-Style Peek View Modal / Drawer */}
      <AnimatePresence>
        {selectedFinding && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedFinding(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Notion Page Panel (Side or Center Mode) */}
            <div className={`relative z-10 w-full h-full flex ${peekMode === "center" ? "items-center justify-center p-3 sm:p-6" : "justify-end"}`}>
              <motion.div
                initial={peekMode === "center" ? { scale: 0.95, opacity: 0 } : { x: "100%" }}
                animate={peekMode === "center" ? { scale: 1, opacity: 1 } : { x: 0 }}
                exit={peekMode === "center" ? { scale: 0.95, opacity: 0 } : { x: "100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
                className={`bg-bg border border-border flex flex-col overflow-hidden shadow-2xl ${
                  peekMode === "center"
                    ? "w-full max-w-4xl max-h-[92vh] rounded-xl"
                    : "w-full max-w-2xl h-full border-l rounded-l-none sm:rounded-l-2xl"
                }`}
              >
                {/* Notion-style Top Bar */}
                <div className="px-5 py-3 border-b border-border bg-surface/80 backdrop-blur flex items-center justify-between select-none">
                  {/* Left: Breadcrumbs */}
                  <div className="flex items-center gap-2 text-xs font-mono text-text-secondary truncate">
                    <span>Research</span>
                    <span>/</span>
                    <span>Findings</span>
                    <span>/</span>
                    <span className="text-text font-medium truncate max-w-[200px]">{selectedFinding.program}</span>
                  </div>

                  {/* Right: Peek Controls */}
                  <div className="flex items-center gap-2">
                    {/* Mode toggle */}
                    <button
                      onClick={() => setPeekMode(peekMode === "side" ? "center" : "side")}
                      title={peekMode === "side" ? "Switch to center modal" : "Switch to side peek"}
                      className="p-1.5 rounded hover:bg-bg text-text-secondary hover:text-text transition-colors font-mono text-xs flex items-center gap-1"
                    >
                      {peekMode === "side" ? <Maximize2 size={14} /> : <Sidebar size={14} />}
                      <span className="hidden sm:inline text-[10px]">{peekMode === "side" ? "Center" : "Side"}</span>
                    </button>

                    {/* Prev / Next controls */}
                    <div className="flex items-center border-l border-border pl-2 gap-1">
                      <button
                        disabled={currentIndex <= 0}
                        onClick={() => currentIndex > 0 && setSelectedFinding(findingsData[currentIndex - 1])}
                        className="p-1.5 rounded hover:bg-bg disabled:opacity-30 disabled:hover:bg-transparent text-text-secondary transition-colors"
                        title="Previous finding (←)"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        disabled={currentIndex >= findingsData.length - 1}
                        onClick={() => currentIndex < findingsData.length - 1 && setSelectedFinding(findingsData[currentIndex + 1])}
                        className="p-1.5 rounded hover:bg-bg disabled:opacity-30 disabled:hover:bg-transparent text-text-secondary transition-colors"
                        title="Next finding (→)"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* Close */}
                    <button
                      onClick={() => setSelectedFinding(null)}
                      className="p-1.5 rounded hover:bg-bg text-text-secondary hover:text-accent transition-colors ml-1"
                      title="Close (Esc)"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Notion Page Scrollable Document Content */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-8">
                  {/* Notion Header Icon & Title */}
                  <div>
                    <div className="text-4xl mb-4 select-none">{selectedFinding.icon}</div>
                    <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-3">
                      {selectedFinding.title}
                    </h1>
                    <p className="mono-label text-accent font-medium">{selectedFinding.program} · Case #{selectedFinding.number}</p>
                  </div>

                  {/* Notion Properties Block */}
                  <div className="border border-border/80 rounded-lg p-4 bg-surface/50 space-y-3 font-mono text-xs">
                    <div className="grid grid-cols-[130px_1fr] items-center gap-2">
                      <span className="text-text-secondary flex items-center gap-1.5">
                        <ShieldCheck size={13} className="text-accent" /> Status
                      </span>
                      <span className="px-2 py-0.5 rounded bg-accent/15 text-accent font-semibold inline-flex items-center gap-1.5 w-fit">
                        <CheckCircle2 size={11} /> {selectedFinding.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-[130px_1fr] items-center gap-2">
                      <span className="text-text-secondary flex items-center gap-1.5">
                        <AlertTriangle size={13} className="text-amber" /> Severity
                      </span>
                      <span className="text-text font-medium">{selectedFinding.severity} ({selectedFinding.cvss.split(" ")[0]})</span>
                    </div>

                    <div className="grid grid-cols-[130px_1fr] items-center gap-2">
                      <span className="text-text-secondary flex items-center gap-1.5">
                        <Layers size={13} /> Vulnerability
                      </span>
                      <span className="text-text">{selectedFinding.cwe}</span>
                    </div>

                    <div className="grid grid-cols-[130px_1fr] items-center gap-2">
                      <span className="text-text-secondary flex items-center gap-1.5">
                        <Tag size={13} /> Tags
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedFinding.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-bg border border-border text-[10px] text-text-secondary">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Notion Callout Box */}
                  <div className="p-4 rounded-lg bg-surface border-l-4 border-accent flex items-start gap-3 text-sm leading-relaxed">
                    <span className="text-lg select-none">💡</span>
                    <div>
                      <p className="font-semibold text-text mb-1">Key Vulnerability Mechanics</p>
                      <p className="text-text-secondary text-xs sm:text-sm">{selectedFinding.callout}</p>
                    </div>
                  </div>

                  {/* Document Body Sections */}
                  <div className="space-y-6 text-sm text-text-secondary leading-relaxed font-sans">
                    <div>
                      <h2 className="font-display text-xl font-semibold text-text mb-2 flex items-center gap-2">
                        <span>1. Background &amp; Discovery</span>
                      </h2>
                      <p>{selectedFinding.overview}</p>
                    </div>

                    <div>
                      <h2 className="font-display text-xl font-semibold text-text mb-2 flex items-center gap-2">
                        <span>2. Technical Analysis</span>
                      </h2>
                      <p>{selectedFinding.technicalAnalysis}</p>
                    </div>

                    {/* Code Snippet Box */}
                    <div>
                      <h2 className="font-display text-xl font-semibold text-text mb-2 flex items-center gap-2">
                        <Terminal size={17} className="text-accent" />
                        <span>3. Proof of Concept Trace</span>
                      </h2>
                      <div className="rounded-lg overflow-hidden border border-border bg-black/80 my-3">
                        <div className="px-4 py-2 border-b border-border/80 bg-surface flex items-center justify-between text-[11px] font-mono text-text-secondary">
                          <span>{selectedFinding.pocSnippet.language.toUpperCase()} PO_TRACE</span>
                          <span>READ-ONLY PAYLOAD</span>
                        </div>
                        <pre className="p-4 text-xs font-mono text-text overflow-x-auto leading-relaxed whitespace-pre">
                          <code>{selectedFinding.pocSnippet.code}</code>
                        </pre>
                      </div>
                      <p className="font-mono text-[11px] text-text-secondary italic">
                        ↳ {selectedFinding.pocSnippet.caption}
                      </p>
                    </div>

                    <div>
                      <h2 className="font-display text-xl font-semibold text-text mb-2 flex items-center gap-2">
                        <span>4. Business &amp; Architectural Impact</span>
                      </h2>
                      <p>{selectedFinding.impact}</p>
                    </div>

                    <div>
                      <h2 className="font-display text-xl font-semibold text-text mb-2 flex items-center gap-2">
                        <span>5. Remediation &amp; Verification</span>
                      </h2>
                      <p>{selectedFinding.remediation}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-surface/40 border border-border">
                      <p className="font-mono text-xs uppercase tracking-wider text-accent mb-1 font-semibold">
                        Researcher Takeaway
                      </p>
                      <p className="text-xs text-text leading-relaxed">{selectedFinding.keyTakeaway}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="px-6 py-3 border-t border-border bg-surface/40 flex items-center justify-between text-xs font-mono text-text-secondary">
                  <span>Press <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px]">Esc</kbd> to exit</span>
                  <button
                    onClick={() => setSelectedFinding(null)}
                    className="text-accent hover:underline cursor-pointer"
                  >
                    Done reading ↗
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
