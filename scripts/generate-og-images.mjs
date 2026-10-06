import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distOgDir = path.resolve(__dirname, '../dist/og');
const publicOgDir = path.resolve(__dirname, '../client/public/og');

fs.mkdirSync(distOgDir, { recursive: true });
fs.mkdirSync(publicOgDir, { recursive: true });

// Load local TTF fonts
const fontSerif = fs.readFileSync(path.join(__dirname, 'fonts/InstrumentSerif-Regular.ttf'));
const fontInter = fs.readFileSync(path.join(__dirname, 'fonts/Inter-Regular.ttf'));
const fontInterBold = fs.readFileSync(path.join(__dirname, 'fonts/Inter-SemiBold.ttf'));

const cards = [
  {
    file: 'home.png',
    badge: 'SECURITY RESEARCHER · PUNE',
    title: 'Parth Doshi',
    subtitle: 'Embedded & IoT Security · Firmware Reverse Engineering · Hardware Interfaces',
    meta: 'MIT-WPU · Third-Year ECE (AI-ML) · President of Hack-X',
  },
  {
    file: 'resume.png',
    badge: 'CURRICULUM VITAE & CREDENTIALS',
    title: 'Parth Doshi - Resume',
    subtitle: 'Embedded & IoT Security, R&D Intern at PHN Tech, Hack The Box & Bug Bounty Research',
    meta: 'Education: MIT-WPU Pune (2024-2028) · President @ Hack-X',
  },
  {
    file: 'blog.png',
    badge: 'TECHNICAL FIELD NOTES',
    title: 'The Log: Hardware & Firmware Notes',
    subtitle: 'Firmware extractions, UART flash dumping, logic analyzer traces, and vulnerability disclosures.',
    meta: 'Raw lab notes from the workbench · Building in public',
  },
  {
    file: 'blog-building-in-public.png',
    badge: 'RESEARCH FIELD NOTE · 3 MIN',
    title: 'Building in Public: Hardware Security & Firmware Field Notes',
    subtitle: 'Why I document my research in public: from raw UART flash extraction to responsible disclosures.',
    meta: 'Parth Doshi · 30 Sep 2026 · Embedded Security Lab',
  },
  {
    file: 'project-ddos-toolkit.png',
    badge: 'SECURITY TOOLKIT · PYTHON',
    title: 'DDoS Volumetric Simulation Toolkit',
    subtitle: 'Python-based SYN Flood, UDP Amplification & HTTP GET Flood simulator for network resilience testing.',
    meta: 'Multi-threaded socket architecture · Local loopback testbed',
  },
  {
    file: 'project-home-automation.png',
    badge: 'EMBEDDED HARDWARE · IOT',
    title: 'IoT Home Automation Node',
    subtitle: 'ESP8266 NodeMCU smart home system with Blynk Cloud for remote relay appliance control.',
    meta: 'Sub-second response over WiFi · 4-channel optocoupler relays',
  },
  {
    file: 'project-noise-indicator.png',
    badge: 'ANALOG HARDWARE · SIMULATION',
    title: 'Acoustic Noise Level Indicator',
    subtitle: 'Analog circuit using electret microphone, op-amp amplifier, and 5-band comparator LED meter.',
    meta: 'National Instruments Multisim · Hardware testbench',
  },
  {
    file: 'project-project-omnis.png',
    badge: 'AI THREAT PREDICTION · SIH 2025',
    title: 'Project Omnis: AI Threat Prediction',
    subtitle: 'Unsupervised threat detection engine using Isolation Forests & Autoencoders on network server logs.',
    meta: '94% True Positive Rate · Smart India Hackathon 2025 Finalist',
  },
  {
    file: 'project-suricata-ids.png',
    badge: 'NETWORK SECURITY · ARM',
    title: 'Suricata IDS Deployment on ARM',
    subtitle: 'Edge network intrusion detection deployed on Raspberry Pi 5 with custom signature rules.',
    meta: 'Promiscuous mode inspection · Low-overhead ARM64 tuning',
  },
  {
    file: 'project-thermal-response.png',
    badge: 'AUTONOMOUS SENSORS · EMBEDDED C++',
    title: 'Autonomous Thermal Response Array',
    subtitle: 'Autonomous fire detection using MLX90640 IR thermal camera and MQ-2 sensor with CO2 suppression trigger.',
    meta: 'ESP32 Dual-Core · Sub-2s suppression trigger threshold',
  },
];

async function generateCard(card) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          backgroundColor: '#0E0A06',
          padding: '64px 72px',
          fontFamily: 'Inter',
          color: '#E9DFC9',
          border: '1px solid #281E12',
          boxSizing: 'border-box',
        },
        children: [
          // Top bar
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: '#5FCE86',
                          },
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '20px',
                            letterSpacing: '0.04em',
                            color: '#E9DFC9',
                          },
                          children: 'parthdoshi.me',
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontFamily: 'Inter',
                      fontWeight: 600,
                      fontSize: '14px',
                      letterSpacing: '0.14em',
                      color: '#5FCE86',
                      textTransform: 'uppercase',
                    },
                    children: card.badge,
                  },
                },
              ],
            },
          },

          // Center content
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginTop: '30px',
                marginBottom: '30px',
              },
              children: [
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontFamily: 'Instrument Serif',
                      fontSize: card.title.length > 35 ? '58px' : '72px',
                      fontWeight: 400,
                      lineHeight: 1.06,
                      color: '#E9DFC9',
                      margin: 0,
                    },
                    children: card.title,
                  },
                },
                {
                  type: 'p',
                  props: {
                    style: {
                      fontFamily: 'Inter',
                      fontSize: '22px',
                      color: '#9E8C6F',
                      lineHeight: 1.45,
                      margin: 0,
                      maxWidth: '960px',
                    },
                    children: card.subtitle,
                  },
                },
              ],
            },
          },

          // Bottom bar
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                paddingTop: '28px',
                borderTop: '1px solid #281E12',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '16px',
                      color: '#9E8C6F',
                      fontFamily: 'Inter',
                    },
                    children: card.meta,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '15px',
                            color: '#5FCE86',
                            fontWeight: 600,
                          },
                          children: 'https://www.parthdoshi.me',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Instrument Serif', data: fontSerif, weight: 400, style: 'normal' },
        { name: 'Inter', data: fontInter, weight: 400, style: 'normal' },
        { name: 'Inter', data: fontInterBold, weight: 600, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const pngData = resvg.render().asPng();

  // Save to both public/og and dist/og
  const distPath = path.join(distOgDir, card.file);
  const publicPath = path.join(publicOgDir, card.file);
  fs.writeFileSync(distPath, pngData);
  fs.writeFileSync(publicPath, pngData);

  if (card.file === 'home.png') {
    fs.writeFileSync(path.join(distOgDir, '../og-default.png'), pngData);
    fs.writeFileSync(path.join(publicOgDir, '../og-default.png'), pngData);
  }

  console.log(`Rendered OG: ${card.file} (${Math.round(pngData.length / 1024)} KB)`);
}

for (const card of cards) {
  await generateCard(card);
}
console.log('All OG images generated successfully.');
