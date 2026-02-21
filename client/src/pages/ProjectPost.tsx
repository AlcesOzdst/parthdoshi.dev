import { Nav } from "@/components/Nav";
import { useRoute } from "wouter";

const projectsData: Record<string, any> = {
  "suricata_ids": {
    permissions: "drwxr-xr-x",
    size: "4.2K",
    date: "Oct 12 14:20",
    name: "suricata_ids",
    desc: "Lightweight intrusion detection on Raspberry Pi 5. 100% detection rate.",
    content: `
# Suricata IDS Deployment on ARM Architecture

Traditional Intrusion Detection Systems (IDS) are heavy and resource-intensive. This project demonstrates deploying Suricata on a Raspberry Pi 5 to create a formidable, edge-computing security node.

## Architecture & Setup

The system is configured to monitor all traffic traversing the local gateway. We compiled Suricata from source to optimize for the ARM64 architecture, disabling unnecessary modules to preserve RAM.

- **Hardware**: Raspberry Pi 5 (8GB RAM)
- **OS**: Debian Bookworm
- **Software**: Suricata 7.0, ELK Stack for log aggregation

![Raspberry Pi Setup](https://images.unsplash.com/photo-1592085187428-281b3b1e779a?auto=format&fit=crop&q=80&w=1000)

## Custom Rulesets

We didn't just use Emerging Threats (ET) open rules. I wrote custom PCRE (Perl Compatible Regular Expressions) to detect anomalous IoT telemetry specific to my local network, catching unencrypted MQTT packets instantly.

## Verified Outcome

The node successfully parsed over 500Mbps of continuous traffic without dropping packets, providing a 100% detection rate for all simulated attacks during the testing phase.
    `
  },
  "ddos_toolkit": {
    permissions: "-rw-r--r--",
    size: "1.8M",
    date: "Nov 05 09:15",
    name: "ddos_toolkit.py",
    desc: "Simulation toolkit for volumetric attacks. 10Gbps artificial surges.",
    content: `
# DDoS Volumetric Simulation Toolkit

To build resilient systems, you must learn how to break them. This toolkit was written in Python to simulate massive volumetric attacks against local infrastructure in a controlled sandbox.

## Attack Vectors Supported

- **SYN Flood**: Exhausting the target's connection queue.
- **UDP Amplification**: Spoofed IP requests to open NTP/DNS servers.
- **HTTP GET Flood**: Layer 7 exhaustion by requesting heavy assets.

## The Script Structure

The script leverages **asyncio** and raw sockets to bypass standard kernel limitations, maximizing the output of packets per second (PPS).

- **Multi-threading**: Utilizes all CPU cores for packet generation.
- **Randomization**: Payload sizes and intervals are randomized to bypass basic heuristic firewalls.

## Verified Outcome

Successfully generated artificial surges up to 10Gbps on a closed 10G local loop, allowing the testing and subsequent optimization of BGP null-routing and iptables rules.
    `
  },
  "project_omnis": {
    permissions: "drwxrwxr-x",
    size: "8.1K",
    date: "Dec 18 16:45",
    name: "project_omnis",
    desc: "AI-driven threat prediction platform (SIH 2025 Finalist).",
    content: `
# Project Omnis: AI Threat Prediction

Developed as a submission for the Smart India Hackathon (SIH) 2025. Project Omnis is an AI-driven platform that ingests raw server logs and predicts vulnerability exploitation paths.

## The Machine Learning Model

We trained an anomaly detection model using Isolation Forests and Autoencoders on standard Apache/Nginx logs combined with OSSEC alerts.

- **Feature Engineering**: Extracted IP geolocation, request frequency, user-agent entropy, and payload signatures.
- **Inference Speed**: The model evaluates new log entries in < 5ms.

## Dashboard & Visualization

The frontend is a dark, terminal-inspired React application that visualizes threat vectors on a global map and provides actionable mitigation commands.

## Verified Outcome

Omnis reached the finals of SIH 2025 by demonstrating a 94% true-positive rate in predicting lateral movement during a live red-team exercise.
    `
  },
  "thermal_response": {
    permissions: "-rwxr-xr-x",
    size: "845B",
    date: "Jan 22 11:30",
    name: "thermal_response.cpp",
    desc: "IoT hardware automation for fire detection. <2s response time.",
    content: `
# Autonomous Thermal Response Array

An IoT hardware automation project designed to detect rapid thermal anomalies and trigger localized extinguishing mechanisms without human intervention.

## Hardware Stack

- **Microcontroller**: ESP32
- **Sensors**: MLX90640 (IR Thermal Camera) & MQ-2 (Gas Sensor)
- **Actuator**: Relays connected to a localized CO2 suppression valve.

## Embedded Logic (C++)

The logic runs on a FreeRTOS task schedule. It doesn't just look for high temperatures; it calculates the *rate of change* (delta T over time) to distinguish between a fire and a hot ambient environment.

- **Failsafe**: If the WiFi connection to the central server drops, the node continues to operate autonomously.
- **Telemetry**: Publishes state data over encrypted MQTT.

![Circuit Assembly](https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1000)

## Verified Outcome

Achieved a sub-two-second physical response capability from detection to actuator trigger during controlled burn tests.
    `
  }
};

export default function ProjectPost() {
  const [, params] = useRoute("/projects/:id");
  const projectId = params?.id || "";
  const project = projectsData[projectId];

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
        <Nav />
        <div className="container mx-auto px-4 py-12">
          <div className="text-destructive font-mono text-xs md:text-sm">
            <span className="text-primary font-bold">guest@parthdoshi</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~/projects</span>
            <span className="text-white">$</span> cat {projectId}<br/><br/>
            cat: {projectId}: No such file or directory
          </div>
        </div>
      </div>
    );
  }

  const renderContent = (content: string) => {
    const lines = content.trim().split('\\n');
    return lines.map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-xl md:text-2xl font-bold text-white mt-10 mb-4">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-lg md:text-xl font-bold text-white mt-8 mb-3">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-base font-bold text-white mt-6 mb-2">{line.replace('### ', '')}</h3>;
      if (line.startsWith('- ')) {
        const text = line.replace('- ', '');
        const parts = text.split(/(\\*\\*.*?\\*\\*)/g);
        return (
          <li key={i} className="ml-4 list-none text-muted-foreground my-1 flex items-start">
            <span className="text-primary mr-2 mt-[2px]">-</span>
            <span>
              {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
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
      if (line === '') return <div key={i} className="h-4"></div>;
      
      const parts = line.split(/(\\*\\*.*?\\*\\*)/g);
      return (
        <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
          {parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
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
          <span className="text-blue-400">~/projects</span>
          <span className="text-white">$</span> cat {projectId}
        </div>

        <article className="ml-4 max-w-2xl">
          <div className="mb-8 border-b border-primary/20 pb-6">
            <div className="text-xs text-muted-foreground font-mono flex flex-wrap gap-4 mb-4">
              <span>PERMISSIONS: {project.permissions}</span>
              <span>SIZE: {project.size}</span>
              <span>DATE: {project.date}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 leading-tight">
              {project.name}
            </h1>
            <p className="text-sm text-white/70 italic"># {project.desc}</p>
          </div>

          <div className="font-mono text-xs md:text-sm">
            {renderContent(project.content)}
          </div>
        </article>

        <div className="text-xs md:text-sm mt-16 mb-2 flex items-center">
          <span className="text-primary font-bold">guest@parthdoshi</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">~/projects</span>
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
