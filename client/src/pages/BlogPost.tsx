import { Nav } from "@/components/Nav";
import { useRoute } from "wouter";

// Simulating a database of blog posts for the mockup
const posts: Record<string, any> = {
  "zero-trust-architecture": {
    date: "2026-02-15",
    title: "Implementing Zero Trust Architecture in Legacy Systems",
    readingTime: "8 min",
    content: `
# Implementing Zero Trust Architecture in Legacy Systems

Legacy infrastructure wasn't built with the assumption that the internal network is already compromised. Transitioning these systems to a Zero Trust Architecture (ZTA) requires a paradigm shift: never trust, always verify.

## The Problem with "Castle-and-Moat"

Historically, once an attacker bypassed the perimeter firewall, they had unrestricted lateral movement. In modern environments, this is a catastrophic vulnerability. 

## Micro-segmentation is Key

The first step is isolating workloads. By implementing micro-segmentation, we divide the data center into distinct security segments down to the individual workload level. 

1. **Map the data flows**: Understand what applications need to talk to each other.
2. **Define strict policies**: Deny all traffic by default.
3. **Identity-Aware Proxies (IAP)**: Shift authentication from the network layer to the application layer.

## Conclusion

ZTA is not a product you can buy; it's a methodology. It requires continuous verification of identity and context before granting access to any resource.
    `
  },
  "iot-vulnerabilities-2026": {
    date: "2026-01-28",
    title: "The State of IoT Security: Firmware Analysis",
    readingTime: "12 min",
    content: `
# The State of IoT Security: Firmware Analysis

Despite massive advancements in consumer technology, IoT devices remain the weakest link in network security. During a recent audit of commercial smart home devices, the findings were alarming.

## Hardcoded Credentials

Over 40% of the firmware analyzed contained hardcoded credentials. These aren't just backdoors; they are front doors left wide open.

## Unencrypted MQTT

Many devices rely on MQTT for telemetry. Astonishingly, a significant portion still transmits payloads over port 1883 without TLS. This allows for trivial man-in-the-middle (MitM) attacks.

## Mitigation

For IoT manufacturers, the fix is straightforward but requires discipline:
- Enforce unique, randomly generated passwords per device.
- Mandate TLS/SSL for all external communications.
- Implement secure, signed over-the-air (OTA) update mechanisms.
    `
  },
  "ddos-mitigation-strategies": {
    date: "2025-11-10",
    title: "Beyond the Firewall: Advanced DDoS Mitigation",
    readingTime: "6 min",
    content: `
# Beyond the Firewall: Advanced DDoS Mitigation

When a volumetric attack exceeds 10Gbps, a traditional firewall will simply fall over. The state table fills up, and legitimate traffic is dropped alongside the malicious payload.

## BGP Anycast

The most effective way to handle massive volumetric attacks is to absorb them using a distributed network. By utilizing BGP Anycast, incoming traffic is routed to the nearest scrubbing center.

## Edge-Based Traffic Scrubbing

Once the traffic hits the scrubbing center, we employ deep packet inspection (DPI) and heuristic analysis to separate the signal from the noise. 

## Conclusion

Resilience isn't just about having a bigger pipe; it's about intelligent traffic routing and instantaneous anomaly detection at the edge.
    `
  }
};

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id || "";
  const post = posts[postId];

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
        <Nav />
        <div className="container mx-auto px-4 py-12">
          <div className="text-destructive font-mono">
            <span className="text-primary font-bold">guest@parthdoshi</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~/blog</span>
            <span className="text-white">$</span> cat {postId}.md<br/><br/>
            cat: {postId}.md: No such file or directory
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Nav />
      <main className="container mx-auto px-4 py-12">
        <div className="text-sm md:text-base mb-8">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/blog</span>
          <span className="text-white">$</span> cat {postId}.md
        </div>

        <article className="ml-4 max-w-3xl">
          <div className="mb-8 border-b border-primary/20 pb-4">
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="text-xs text-muted-foreground font-mono flex flex-wrap gap-4">
              <span>DATE: {post.date}</span>
              <span>READ_TIME: {post.readingTime}</span>
              <span className="text-primary">AUTHOR: root</span>
            </div>
          </div>

          <div className="font-mono text-sm leading-loose whitespace-pre-wrap text-muted-foreground">
            {/* Extremely simple markdown-like rendering for the mockup */}
            {post.content.trim().split('\\n').map((line: string, i: number) => {
              if (line.startsWith('# ')) {
                return <h1 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{line.replace('# ', '')}</h1>;
              }
              if (line.startsWith('## ')) {
                return <h2 key={i} className="text-xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="ml-4 list-disc text-primary">{line.replace('- ', '')}</li>;
              }
              if (line.match(/^\\d+\\.\\s/)) {
                return <li key={i} className="ml-4 list-decimal text-primary">{line.replace(/^\\d+\\.\\s/, '')}</li>;
              }
              if (line === '') {
                return <br key={i} />;
              }
              // Handle bold text
              let formattedLine = line;
              const boldRegex = /\\*\\*(.*?)\\*\\*/g;
              if (boldRegex.test(line)) {
                const parts = line.split(boldRegex);
                return (
                  <p key={i} className="mb-4">
                    {parts.map((part, index) => 
                      index % 2 === 1 ? <strong key={index} className="text-white">{part}</strong> : part
                    )}
                  </p>
                );
              }

              return <p key={i} className="mb-4">{line}</p>;
            })}
          </div>
        </article>

        <div className="text-sm md:text-base mt-16 mb-2 flex items-center">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/blog</span>
          <span className="text-white">$</span>
          <span className="terminal-cursor"></span>
        </div>
      </main>
      
      <footer className="border-t border-primary/20 py-8 mt-12 text-center font-mono text-xs text-muted-foreground border-dashed">
        <p>SYSTEM.LOG("© {new Date().getFullYear()} Parth Doshi.")</p>
      </footer>
    </div>
  );
}
