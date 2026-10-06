# Autonomous Thermal Response Array
Source: https://www.parthdoshi.me/projects/thermal-response
Date: 2024-11-05
Author: Parth Doshi (https://www.parthdoshi.me/#person)

---
permissions: "-rwxr-xr-x"
size: "845B"
name: "thermal_response.cpp"
desc: "ESP32-based autonomous fire detection using IR thermal camera (MLX90640) and MQ-2 gas sensor with sub-2s CO2 suppression trigger."
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


## Verified Outcome

Achieved a sub-two-second physical response capability from detection to actuator trigger during controlled burn tests.
