# Project Omnis: AI Threat Prediction
Source: https://www.parthdoshi.me/projects/project-omnis
Date: 2025-08-20
Author: Parth Doshi (https://www.parthdoshi.me/#person)

---
permissions: "drwxrwxr-x"
size: "8.1K"
name: "project_omnis"
desc: "AI platform using Isolation Forests & Autoencoders to flag anomalous access patterns in server logs."
---
# Project Omnis: AI Threat Prediction

Developed as a submission for the Smart India Hackathon (SIH) 2025. Project Omnis is an AI-driven platform that ingests raw server logs and predicts vulnerability exploitation paths.

## The Machine Learning Model

We trained an anomaly detection model using Isolation Forests and Autoencoders on standard Apache/Nginx logs combined with OSSEC alerts.

- **Feature Engineering**: Extracted IP geolocation, request frequency, user-agent entropy, and payload signatures.
- **Inference Speed**: The model evaluates new log entries in < 5ms.

## Dashboard & Visualization

The frontend is a dark, terminal-inspired React application that visualizes threat vectors on a global map and provides actionable mitigation commands.

## Verified Outcome

Omnis flags anomalous access patterns that may indicate lateral movement, trained on Apache/Nginx logs combined with OSSEC alerts.
