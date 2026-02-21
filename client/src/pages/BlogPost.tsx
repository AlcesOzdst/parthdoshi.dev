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

![Network Diagram](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000)

## Micro-segmentation is Key

The first step is isolating workloads. By implementing micro-segmentation, we divide the data center into distinct security segments down to the individual workload level. 

- **Map the data flows**: Understand what applications need to talk to each other.
- **Define strict policies**: Deny all traffic by default.
- **Identity-Aware Proxies (IAP)**: Shift authentication from the network layer to the application layer.

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

![Circuit Board](https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000)

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
          <div className="text-destructive font-mono text-xs md:text-sm">
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

  // Custom simple parser to render markdown into smaller, cleaner typography
  const renderContent = (content: string) => {
    const lines = content.trim().split('\\n');
    return lines.map((line, i) => {
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-xl md:text-2xl font-bold text-white mt-10 mb-4">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-lg md:text-xl font-bold text-white mt-8 mb-3">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-base font-bold text-white mt-6 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('- ')) {
        // Bullet points formatting
        // Support bolding within bullets
        const text = line.replace('- ', '');
        const parts = text.split(/(\\*\\*.*?\\*\\*)/g);
        return (
          <li key={i} className="ml-4 list-none text-muted-foreground my-1 flex items-start">
            <span className="text-primary mr-2 mt-[2px]">-</span>
            <span>
              {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                }
                return part;
              })}
            </span>
          </li>
        );
      }
      if (line.match(/^!\\[.*\\]\\(.*\\)/)) {
        const match = line.match(/^!\\[(.*)\\]\\((.*)\\)/);
        return match ? (
          <div key={i} className="my-8">
            <img src={match[2]} alt={match[1]} className="max-w-full h-auto border border-primary/20 opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <div className="text-[10px] text-muted-foreground mt-2 italic border-l border-primary/30 pl-2">fig: {match[1]}</div>
          </div>
        ) : null;
      }
      if (line === '') {
        return <div key={i} className="h-4"></div>;
      }
      
      // Paragraph with Bold parsing
      const parts = line.split(/(\\*\\*.*?\\*\\*)/g);
      return (
        <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
          {parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Nav />
      <main className="container mx-auto px-4 py-12">
        <div className="text-xs md:text-sm mb-8">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/blog</span>
          <span className="text-white">$</span> cat {postId}.md
        </div>

        <article className="ml-4 max-w-2xl">
          <div className="mb-8 border-b border-primary/20 pb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="text-xs text-muted-foreground font-mono flex flex-wrap gap-4">
              <span>DATE: {post.date}</span>
              <span>READ_TIME: {post.readingTime}</span>
              <span className="text-primary">AUTHOR: root</span>
            </div>
          </div>

          <div className="font-mono text-xs md:text-sm">
            {renderContent(post.content)}
          </div>
        </article>

        <div className="text-xs md:text-sm mt-16 mb-2 flex items-center">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/blog</span>
          <span className="text-white">$</span>
          <span className="terminal-cursor"></span>
        </div>
      </main>
      
      <footer className="border-t border-primary/20 py-8 mt-12 text-center font-mono text-[10px] md:text-xs text-muted-foreground border-dashed">
        <p>SYSTEM.LOG("© {new Date().getFullYear()} Parth Doshi.")</p>
      </footer>
    </div>
  );
}
