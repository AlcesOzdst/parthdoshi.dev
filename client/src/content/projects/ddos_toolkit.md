---
permissions: "-rw-r--r--"
size: "1.8M"
date: "Nov 05 09:15"
name: "ddos_toolkit.py"
desc: "Simulation toolkit for volumetric attacks. 10Gbps artificial surges."
---
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
