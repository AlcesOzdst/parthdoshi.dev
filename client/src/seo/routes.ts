export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  type: "website" | "profile" | "article" | "project";
  isIndexable: boolean;
  ogImage: string;
  ogImageAlt: string;
  datePublished?: string;
  dateModified?: string;
  markdownPath?: string;
  breadcrumbs: BreadcrumbItem[];
  jsonLd: Record<string, any>;
  keywords?: string[];
}

export const CANONICAL_HOST = "https://www.parthdoshi.me";

export const PERSON_GRAPH = {
  "@type": "Person",
  "@id": `${CANONICAL_HOST}/#person`,
  name: "Parth Doshi",
  url: `${CANONICAL_HOST}/`,
  jobTitle: "Security Researcher & Embedded Systems Engineer",
  description: "Third-year ECE (AI-ML) student at MIT-WPU in Pune doing security research on embedded & IoT hardware, firmware reverse engineering, and bare-metal systems.",
  email: "mailto:parthdoshi404@gmail.com",
  image: `${CANONICAL_HOST}/og/home.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  alternateName: ["AlcesOzdst"],
  memberOf: {
    "@type": "Organization",
    name: "Hack-X, Cybersecurity Club - MIT-WPU",
    roleName: "President",
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "MIT World Peace University",
    sameAs: "https://mitwpu.edu.in/",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "MIT World Peace University",
    sameAs: "https://mitwpu.edu.in/",
  },
  sameAs: [
    "https://github.com/AlcesOzdst",
    "https://linkedin.com/in/parthdoshi404",
    "https://profile.hackthebox.com/profile/019c59d7-edfc-7172-b666-bedfbe635e49",
    "https://g.dev/Alcesozdst",
  ],
  knowsAbout: [
    "Embedded Systems Security",
    "IoT Security",
    "Firmware Reverse Engineering",
    "Responsible Vulnerability Disclosure",
    "Hardware Interfaces (UART, SPI, I2C)",
    "C8051 & ESP32 Microcontrollers",
    "Horology & Mechanical Movements",
    "Technical Pencil Sketching",
  ],
};

export const WEBSITE_GRAPH = {
  "@type": "WebSite",
  "@id": `${CANONICAL_HOST}/#website`,
  url: `${CANONICAL_HOST}/`,
  name: "Parth Doshi Portfolio",
  publisher: {
    "@id": `${CANONICAL_HOST}/#person`,
  },
};

export function buildBreadcrumbList(items: BreadcrumbItem[], canonicalUrl: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumbs`,
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.path === "/" ? `${CANONICAL_HOST}/` : `${CANONICAL_HOST}${item.path}`,
    })),
  };
}

export const routes: RouteMeta[] = [
  {
    path: "/",
    title: "Parth Doshi | Embedded & IoT Security Researcher, Pune",
    description: "Portfolio and research notes of Parth Doshi, third-year ECE (AI-ML) student at MIT-WPU, Pune. Embedded and IoT security, firmware reverse engineering, bare-metal C.",
    type: "website",
    isIndexable: true,
    ogImage: "/og/home.png",
    ogImageAlt: "Parth Doshi - Embedded & IoT Security Researcher based in Pune",
    dateModified: "2026-10-02T02:23:43+05:30",
    breadcrumbs: [{ name: "Home", path: "/" }],
    keywords: ["Parth Doshi", "Embedded Security", "IoT Security", "Firmware Reverse Engineering", "Pune Security Researcher"],
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        PERSON_GRAPH,
        WEBSITE_GRAPH,
        {
          "@type": "ProfilePage",
          "@id": `${CANONICAL_HOST}/#profilepage`,
          url: `${CANONICAL_HOST}/`,
          name: "Parth Doshi | Embedded & IoT Security Researcher, Pune",
          isPartOf: { "@id": `${CANONICAL_HOST}/#website` },
          mainEntity: { "@id": `${CANONICAL_HOST}/#person` },
        },
      ],
    },
  },
  {
    path: "/resume",
    title: "Resume | Parth Doshi - Security Researcher & Embedded Systems",
    description: "Credentials and experience of Parth Doshi: Ethical hacker and red teamer, penetration testing, IoT security, robotics & innovation intern, ECE (AI-ML) at MIT-WPU.",
    type: "profile",
    isIndexable: true,
    ogImage: "/og/resume.png",
    ogImageAlt: "Parth Doshi Resume - Embedded Systems & Cybersecurity Researcher",
    dateModified: "2026-10-02T02:23:43+05:30",
    markdownPath: "resume.md",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Resume", path: "/resume" },
    ],
    keywords: ["Parth Doshi Resume", "Cybersecurity Student", "Embedded Systems Intern", "MIT-WPU Pune", "Hack-X President"],
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        PERSON_GRAPH,
        WEBSITE_GRAPH,
        {
          "@type": "ProfilePage",
          "@id": `${CANONICAL_HOST}/resume#profilepage`,
          url: `${CANONICAL_HOST}/resume`,
          name: "Resume | Parth Doshi",
          isPartOf: { "@id": `${CANONICAL_HOST}/#website` },
          about: { "@id": `${CANONICAL_HOST}/#person` },
          mainEntity: { "@id": `${CANONICAL_HOST}/#person` },
          primaryImageOfPage: `${CANONICAL_HOST}/og/resume.png`,
        },
        buildBreadcrumbList(
          [
            { name: "Home", path: "/" },
            { name: "Resume", path: "/resume" },
          ],
          `${CANONICAL_HOST}/resume`
        ),
      ],
    },
  },
  {
    path: "/blog",
    title: "The Log | Hardware Security & Firmware Field Notes | Parth Doshi",
    description: "Technical field notes and writeups by Parth Doshi: firmware extraction, hardware interfaces, logic analyzer traces, and responsible disclosures.",
    type: "website",
    isIndexable: true,
    ogImage: "/og/blog.png",
    ogImageAlt: "The Log - Hardware Security Field Notes by Parth Doshi",
    dateModified: "2026-10-02T02:23:43+05:30",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Writing", path: "/blog" },
    ],
    keywords: ["Hardware Security Notes", "Firmware Teardown", "Logic Analyzer Traces", "Responsible Disclosure", "Parth Doshi Blog"],
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        PERSON_GRAPH,
        WEBSITE_GRAPH,
        {
          "@type": "CollectionPage",
          "@id": `${CANONICAL_HOST}/blog#collection`,
          url: `${CANONICAL_HOST}/blog`,
          name: "The Log | Hardware Security & Firmware Field Notes",
          isPartOf: { "@id": `${CANONICAL_HOST}/#website` },
          about: { "@id": `${CANONICAL_HOST}/#person` },
        },
        buildBreadcrumbList(
          [
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
          ],
          `${CANONICAL_HOST}/blog`
        ),
      ],
    },
  },
  {
    path: "/blog/building-in-public",
    title: "Building in Public: Hardware Security & Firmware | Parth Doshi",
    description: "Why I document my research in public: from raw UART flash extraction and logic analyzer captures to responsible vulnerability disclosures.",
    type: "article",
    isIndexable: true,
    ogImage: "/og/blog-building-in-public.png",
    ogImageAlt: "Building in Public - Hardware Security and Firmware Field Notes",
    datePublished: "2026-09-30",
    dateModified: "2026-10-02T02:23:43+05:30",
    markdownPath: "client/src/content/blog/building-in-public.md",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Writing", path: "/blog" },
      { name: "Building in Public", path: "/blog/building-in-public" },
    ],
    keywords: ["Hardware Security", "Firmware Reverse Engineering", "UART Flash Dump", "Logic Analyzer", "Responsible Disclosure"],
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        PERSON_GRAPH,
        WEBSITE_GRAPH,
        {
          "@type": "TechArticle",
          "@id": `${CANONICAL_HOST}/blog/building-in-public#article`,
          url: `${CANONICAL_HOST}/blog/building-in-public`,
          headline: "Building in Public: Hardware Security & Firmware Field Notes",
          description: "Why I document my research in public: from raw UART flash extraction and logic analyzer captures to responsible vulnerability disclosures.",
          mainEntityOfPage: `${CANONICAL_HOST}/blog/building-in-public`,
          inLanguage: "en",
          datePublished: "2026-09-30",
          dateModified: "2026-10-02",
          author: { "@id": `${CANONICAL_HOST}/#person` },
          publisher: { "@id": `${CANONICAL_HOST}/#person` },
          image: `${CANONICAL_HOST}/og/blog-building-in-public.png`,
          license: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
          keywords: ["Embedded Security", "Hardware Hacking", "Firmware Reverse Engineering", "UART Flash Extraction"],
        },
        buildBreadcrumbList(
          [
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
            { name: "Building in Public", path: "/blog/building-in-public" },
          ],
          `${CANONICAL_HOST}/blog/building-in-public`
        ),
      ],
    },
  },
  {
    path: "/projects/ddos-toolkit",
    title: "DDoS Volumetric Simulation Toolkit | Parth Doshi",
    description: "Python-based SYN Flood, UDP Amplification & HTTP GET Flood simulator for testing network resilience in sandboxed environments.",
    type: "project",
    isIndexable: true,
    ogImage: "/og/project-ddos-toolkit.png",
    ogImageAlt: "DDoS Volumetric Simulation Toolkit by Parth Doshi",
    datePublished: "2025-06-01",
    dateModified: "2026-09-26T05:28:14+05:30",
    markdownPath: "client/src/content/projects/ddos-toolkit.md",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/#work" },
      { name: "DDoS Toolkit", path: "/projects/ddos-toolkit" },
    ],
    keywords: ["DDoS Simulation", "SYN Flood", "UDP Amplification", "Python Network Tool", "Packet Generation"],
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        PERSON_GRAPH,
        WEBSITE_GRAPH,
        {
          "@type": "SoftwareSourceCode",
          "@id": `${CANONICAL_HOST}/projects/ddos-toolkit#software`,
          url: `${CANONICAL_HOST}/projects/ddos-toolkit`,
          name: "DDoS Volumetric Simulation Toolkit",
          description: "Python-based SYN Flood, UDP Amplification & HTTP GET Flood simulator for testing network resilience in sandboxed environments.",
          programmingLanguage: "Python",
          codeRepository: "https://github.com/AlcesOzdst/DDoS_AssMnt",
          author: { "@id": `${CANONICAL_HOST}/#person` },
        },
        buildBreadcrumbList(
          [
            { name: "Home", path: "/" },
            { name: "Projects", path: "/#work" },
            { name: "DDoS Toolkit", path: "/projects/ddos-toolkit" },
          ],
          `${CANONICAL_HOST}/projects/ddos-toolkit`
        ),
      ],
    },
  },
  {
    path: "/projects/home-automation",
    title: "IoT Home Automation Node | Parth Doshi",
    description: "ESP8266 NodeMCU smart home system with Blynk Cloud for remote relay-based appliance control via smartphone. Sub-second response over WiFi.",
    type: "project",
    isIndexable: true,
    ogImage: "/og/project-home-automation.png",
    ogImageAlt: "IoT Home Automation Node by Parth Doshi",
    datePublished: "2024-04-10",
    dateModified: "2026-02-22T04:03:00+05:30",
    markdownPath: "client/src/content/projects/home-automation.md",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/#work" },
      { name: "Home Automation", path: "/projects/home-automation" },
    ],
    keywords: ["ESP8266", "NodeMCU", "Blynk Cloud", "Smart Home", "IoT Appliance Control"],
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        PERSON_GRAPH,
        WEBSITE_GRAPH,
        {
          "@type": "CreativeWork",
          "@id": `${CANONICAL_HOST}/projects/home-automation#work`,
          url: `${CANONICAL_HOST}/projects/home-automation`,
          name: "Home Automation System Using IoT",
          description: "ESP8266 NodeMCU smart home system with Blynk Cloud for remote relay-based appliance control via smartphone.",
          author: { "@id": `${CANONICAL_HOST}/#person` },
        },
        buildBreadcrumbList(
          [
            { name: "Home", path: "/" },
            { name: "Projects", path: "/#work" },
            { name: "Home Automation", path: "/projects/home-automation" },
          ],
          `${CANONICAL_HOST}/projects/home-automation`
        ),
      ],
    },
  },
  {
    path: "/projects/noise-indicator",
    title: "Acoustic Noise Level Indicator | Parth Doshi",
    description: "Analog circuit using electret mic, op-amp amplifier & voltage comparators to drive a 5-band LED volume meter. Simulated in NI Multisim.",
    type: "project",
    isIndexable: true,
    ogImage: "/og/project-noise-indicator.png",
    ogImageAlt: "Acoustic Noise Level Indicator by Parth Doshi",
    datePublished: "2024-05-15",
    dateModified: "2026-02-22T04:03:00+05:30",
    markdownPath: "client/src/content/projects/noise-indicator.md",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/#work" },
      { name: "Noise Level Indicator", path: "/projects/noise-indicator" },
    ],
    keywords: ["Analog Circuit", "Electret Mic", "Op-Amp", "NI Multisim", "LED Volume Meter"],
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        PERSON_GRAPH,
        WEBSITE_GRAPH,
        {
          "@type": "CreativeWork",
          "@id": `${CANONICAL_HOST}/projects/noise-indicator#work`,
          url: `${CANONICAL_HOST}/projects/noise-indicator`,
          name: "Noise Level Indicator (Clap Switch Evolution)",
          description: "Analog circuit using electret mic, op-amp amplifier & voltage comparators to drive a 5-band LED volume meter.",
          author: { "@id": `${CANONICAL_HOST}/#person` },
        },
        buildBreadcrumbList(
          [
            { name: "Home", path: "/" },
            { name: "Projects", path: "/#work" },
            { name: "Noise Level Indicator", path: "/projects/noise-indicator" },
          ],
          `${CANONICAL_HOST}/projects/noise-indicator`
        ),
      ],
    },
  },
  {
    path: "/projects/project-omnis",
    title: "Project Omnis: AI Threat Prediction | Parth Doshi",
    description: "AI platform using Isolation Forests & Autoencoders to flag anomalous access patterns in server logs with a 94% true-positive rate.",
    type: "project",
    isIndexable: true,
    ogImage: "/og/project-project-omnis.png",
    ogImageAlt: "Project Omnis AI Threat Prediction by Parth Doshi",
    datePublished: "2025-08-20",
    dateModified: "2026-09-26T05:33:00+05:30",
    markdownPath: "client/src/content/projects/project-omnis.md",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/#work" },
      { name: "Project Omnis", path: "/projects/project-omnis" },
    ],
    keywords: ["AI Threat Prediction", "Isolation Forest", "Autoencoders", "Log Anomaly Detection", "SIH 2025 Finalist"],
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        PERSON_GRAPH,
        WEBSITE_GRAPH,
        {
          "@type": "CreativeWork",
          "@id": `${CANONICAL_HOST}/projects/project-omnis#work`,
          url: `${CANONICAL_HOST}/projects/project-omnis`,
          name: "Project Omnis: AI Threat Prediction",
          description: "AI platform using Isolation Forests & Autoencoders to flag anomalous access patterns in server logs.",
          author: { "@id": `${CANONICAL_HOST}/#person` },
        },
        buildBreadcrumbList(
          [
            { name: "Home", path: "/" },
            { name: "Projects", path: "/#work" },
            { name: "Project Omnis", path: "/projects/project-omnis" },
          ],
          `${CANONICAL_HOST}/projects/project-omnis`
        ),
      ],
    },
  },
  {
    path: "/projects/suricata-ids",
    title: "Suricata IDS Deployment on ARM | Parth Doshi",
    description: "Deployed Suricata on a Raspberry Pi 5 as an edge IDS node, with custom rules tuned for a home-lab network.",
    type: "project",
    isIndexable: true,
    ogImage: "/og/project-suricata-ids.png",
    ogImageAlt: "Suricata IDS Deployment on ARM Architecture by Parth Doshi",
    datePublished: "2025-02-14",
    dateModified: "2026-09-26T05:33:00+05:30",
    markdownPath: "client/src/content/projects/suricata-ids.md",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/#work" },
      { name: "Suricata IDS", path: "/projects/suricata-ids" },
    ],
    keywords: ["Suricata IDS", "Raspberry Pi 5", "ARM Architecture", "Intrusion Detection", "Network Security"],
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        PERSON_GRAPH,
        WEBSITE_GRAPH,
        {
          "@type": "CreativeWork",
          "@id": `${CANONICAL_HOST}/projects/suricata-ids#work`,
          url: `${CANONICAL_HOST}/projects/suricata-ids`,
          name: "Suricata IDS Deployment on ARM Architecture",
          description: "Deployed Suricata on a Raspberry Pi 5 as an edge IDS node, with custom rules tuned for a home-lab network.",
          author: { "@id": `${CANONICAL_HOST}/#person` },
        },
        buildBreadcrumbList(
          [
            { name: "Home", path: "/" },
            { name: "Projects", path: "/#work" },
            { name: "Suricata IDS", path: "/projects/suricata-ids" },
          ],
          `${CANONICAL_HOST}/projects/suricata-ids`
        ),
      ],
    },
  },
  {
    path: "/projects/thermal-response",
    title: "Autonomous Thermal Response Array | Parth Doshi",
    description: "ESP32-based autonomous fire detection using IR thermal camera (MLX90640) and MQ-2 gas sensor with sub-2s CO2 suppression trigger.",
    type: "project",
    isIndexable: true,
    ogImage: "/og/project-thermal-response.png",
    ogImageAlt: "Autonomous Thermal Response Array by Parth Doshi",
    datePublished: "2024-11-05",
    dateModified: "2026-09-26T05:33:00+05:30",
    markdownPath: "client/src/content/projects/thermal-response.md",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/#work" },
      { name: "Thermal Response", path: "/projects/thermal-response" },
    ],
    keywords: ["ESP32", "MLX90640", "Thermal Camera", "Autonomous Fire Detection", "MQ-2 Sensor"],
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        PERSON_GRAPH,
        WEBSITE_GRAPH,
        {
          "@type": "CreativeWork",
          "@id": `${CANONICAL_HOST}/projects/thermal-response#work`,
          url: `${CANONICAL_HOST}/projects/thermal-response`,
          name: "Autonomous Thermal Response Array",
          description: "ESP32-based autonomous fire detection using IR thermal camera (MLX90640) and MQ-2 gas sensor with sub-2s CO2 suppression trigger.",
          author: { "@id": `${CANONICAL_HOST}/#person` },
        },
        buildBreadcrumbList(
          [
            { name: "Home", path: "/" },
            { name: "Projects", path: "/#work" },
            { name: "Thermal Response", path: "/projects/thermal-response" },
          ],
          `${CANONICAL_HOST}/projects/thermal-response`
        ),
      ],
    },
  },
  {
    path: "/404",
    title: "Page Not Found | Parth Doshi",
    description: "The requested security research note, project build, or document could not be found on parthdoshi.me. Please check the URL or return to home.",
    type: "website",
    isIndexable: false,
    ogImage: "/og/home.png",
    ogImageAlt: "Page Not Found - Parth Doshi",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Not Found", path: "/404" },
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Page Not Found",
    },
  },
];

export function getRouteMeta(path: string): RouteMeta | undefined {
  const normalized = path === "/" ? "/" : path.replace(/\/$/, "");
  return routes.find((r) => r.path === normalized);
}
