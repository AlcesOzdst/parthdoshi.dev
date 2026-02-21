---
permissions: "drwxrwxr-x"
size: "8.1K"
date: "Dec 18 16:45"
name: "project_omnis"
desc: "AI-driven threat prediction platform (SIH 2025 Finalist)."
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

Omnis reached the finals of SIH 2025 by demonstrating a 94% true-positive rate in predicting lateral movement during a live red-team exercise.
