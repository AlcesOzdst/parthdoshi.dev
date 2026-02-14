/**
 * Project Data Source
 * Contains details for all projects including modal and full page content.
 */
const projectsData = [
    {
        id: 'suricata-ids',
        title: 'Suricata IDS',
        tagline: 'Lightweight intrusion detection on Raspberry Pi 5',
        image: 'assets/project1.jpg',
        brief: 'Deployed a lightweight Intrusion Detection System using Suricata on a Raspberry Pi 5 to monitor live network traffic and detect suspicious patterns. Tuned Suricata rules to reduce noise and improve detection accuracy by 92%. Analyzed alerts, logs, and packet captures to generate structured investigation summaries and recommendations.',
        roles: ['Network Security', 'IDS Configuration', 'Log Analysis'],
        deliverables: ['IDS Deployment', 'Custom Rule Tuning', 'Investigation Reports'],
        theme: 'warm'
    },
    {
        id: 'ddos-toolkit',
        title: 'DDoS Toolkit',
        tagline: 'Network hardening through simulation',
        image: 'assets/project2.jpg',
        brief: 'Developed a Python-based DDoS simulation tool to test IDS/IPS and firewall responsiveness. Optimized Suricata configurations to reduce false positives by 18%. Documented mitigation strategies, network defenses, and incident-handling workflows for comprehensive network hardening.',
        roles: ['Cybersecurity Simulation', 'Python Development', 'Network Defense'],
        deliverables: ['Simulation Tool', 'Hardened Configs', 'Mitigation Docs'],
        theme: 'dark'
    },
    {
        id: 'project-omnis',
        title: 'Project Omnis',
        tagline: 'AI-driven cybersecurity platform — SIH 2025',
        image: 'assets/project3.jpg',
        brief: 'Contributed to "Omnis," an AI-driven cybersecurity platform integrating malware detection, threat intelligence, and blockchain logging for Smart India Hackathon 2025. Built multi-model orchestration of 150+ AI agents for automated scanning and threat reasoning. Implemented secure, immutable threat logging with under 5s response latency.',
        roles: ['AI Integration', 'Blockchain Logging', 'Threat Intelligence'],
        deliverables: ['AI Agent Orchestration', 'Blockchain Logger', 'Prototype Platform'],
        theme: 'blue'
    },
    {
        id: 'fire-detection',
        title: 'Fire Detection',
        tagline: 'IoT-based fire detection & auto-extinguisher',
        image: 'assets/project4.jpg',
        brief: 'Built an IoT-based fire detection and automatic extinguisher prototype using ESP32 and sensor-based detection. Integrated IR sensors and basic electronic components to detect fire conditions. Automated water pump activation for immediate extinguishing response. Focused on low-cost hardware integration and real-world safety automation.',
        roles: ['IoT Development', 'Embedded Systems', 'Hardware Prototyping'],
        deliverables: ['ESP32 Firmware', 'Sensor Integration', 'Safety Prototype'],
        theme: 'coral'
    },
    {
        id: 'home-automation',
        title: 'IoT Home Auto',
        tagline: 'Smart home control with ESP8266',
        image: 'assets/project5.jpg',
        brief: 'Built an IoT-based home automation system using the ESP8266 microcontroller. Studied fundamentals of IoT and learned NodeMCU programming. Used Blynk Cloud to create a GUI for controlling the ESP8266, enabling remote control of home appliances via smartphone.',
        roles: ['IoT Development', 'Cloud Integration', 'Embedded Programming'],
        deliverables: ['ESP8266 Firmware', 'Blynk Cloud GUI', 'Documentation'],
        theme: 'teal'
    },
    {
        id: 'noise-indicator',
        title: 'Noise Indicator',
        tagline: 'Sound-reactive LED circuit design',
        image: 'assets/project6.jpg',
        brief: 'Developed a circuit to detect and amplify sound levels using basic electronic components — an evolution of the classic clap switch. Designed LED indicators that react to varying sound intensities for visual feedback. Documented project workflow, component usage, and future improvement suggestions.',
        roles: ['Circuit Design', 'Hardware Prototyping', 'Documentation'],
        deliverables: ['Circuit Board', 'Multisim Simulation', 'Technical Report'],
        theme: 'purple'
    }
];

// Export for module usage or global access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectsData;
} else {
    window.projectsData = projectsData;
}
