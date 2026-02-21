---
permissions: "-rwxr-xr-x"
size: "845B"
date: "Jan 22 11:30"
name: "thermal_response.cpp"
desc: "IoT hardware automation for fire detection. <2s response time."
---
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
