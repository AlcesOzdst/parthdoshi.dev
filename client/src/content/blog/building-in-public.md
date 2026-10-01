---
title: "Building in Public: Hardware Security & Firmware Field Notes"
date: "2026-09-30"
readingTime: "3 min"
summary: "Why I document my research in public: from raw UART flash extraction and logic analyzer captures to responsible vulnerability disclosures."
---

Instead of publishing generic high-level summaries, this space is dedicated to raw, authentic technical field notes from my workbench.

Security research is best understood and validated through transparent evidence: logic analyzer traces, binary disassembly, register maps, and reproducible proof-of-concepts.

## Active Workbench Focus Areas

### 1. Firmware Reverse Engineering & Binary Inspection

Dumping flash chips over UART and SPI, analyzing partition tables, mapping entropy with Binwalk, and decompiling binaries in Ghidra. I focus on identifying hardcoded secrets, unprotected debug interfaces, and authentication bypasses in embedded firmware.

### 2. Physical Hardware Attack Surfaces

Probing physical interfaces (UART, SPI, I²C, JTAG) with logic analyzers and oscilloscopes. Capturing bus traffic to inspect how hardware devices communicate with peripherals and sensors before security boundaries are established in software.

### 3. Bare-Metal Systems & Custom Firmware

Writing register-level bare-metal C for 8-bit and 32-bit microcontrollers (such as the Silicon Labs C8051F340 and ESP32). Building custom firmware for security tools like the ESP32 Marauder, integrating NRF24L01 transceivers and custom OLED interfaces.

### 4. Responsible Disclosure Workflows

Conducting systematic vulnerability research across web portals, APIs, and connected systems. Documenting issues with CVSS v3.1 scoring and working directly with developers and administrators to remediate flaws (such as the university ERP IDOR disclosure).

---

## Following Along

Technical deep-dives, hardware teardowns, and exploit writeups will be published here as projects conclude. In the meantime, all active code, experimental scripts, and schematics are maintained publicly on [GitHub](https://github.com/AlcesOzdst).
