---
permissions: "drwxr-xr-x"
size: "4.2K"
name: "suricata_ids"
desc: "Deployed Suricata on a Raspberry Pi 5 as an edge IDS node, with custom rules tuned for a home-lab network."
---
# Suricata IDS Deployment on ARM Architecture

Traditional Intrusion Detection Systems (IDS) are heavy and resource-intensive. This project demonstrates deploying Suricata on a Raspberry Pi 5 to create a formidable, edge-computing security node.

## Architecture & Setup

The system is configured to monitor all traffic traversing the local gateway. We compiled Suricata from source to optimize for the ARM64 architecture, disabling unnecessary modules to preserve RAM.

- **Hardware**: Raspberry Pi 5 (8GB RAM)
- **OS**: Debian Bookworm
- **Software**: Suricata 7.0, ELK Stack for log aggregation


## Custom Rulesets

We didn't just use Emerging Threats (ET) open rules. I wrote custom PCRE (Perl Compatible Regular Expressions) to detect anomalous IoT telemetry specific to my local network, catching unencrypted MQTT packets instantly.

## Verified Outcome

The node monitored live gateway traffic on the home lab and flagged the simulated attacks its rules were tuned for.
