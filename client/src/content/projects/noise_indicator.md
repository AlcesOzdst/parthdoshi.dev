---
permissions: "-rw-r--r--"
size: "680B"
name: "noise_indicator.sim"
desc: "Analog circuit using electret mic, op-amp amplifier & voltage comparators to drive a 5-band LED volume meter. Simulated in NI Multisim."
---
# Noise Level Indicator (Clap Switch Evolution)

A circuit design project that detects and amplifies ambient sound levels, using basic analog electronic components to drive LED indicators that respond to varying sound intensities.

## Circuit Design

- **Sensor**: Electret condenser microphone for sound capture
- **Amplification**: Op-amp based signal conditioning circuit
- **Output**: Multi-level LED array with threshold comparators
- **Simulation**: Full circuit validated in NI Multisim

## How It Works

The microphone converts sound waves into electrical signals. An op-amp amplifies the weak mic output, and a series of voltage comparators trigger different LEDs based on the amplitude. Higher noise levels light up more LEDs, creating a visual volume meter.

- **Threshold Calibration**: Resistor divider networks set the trigger points for each LED level.
- **Hysteresis**: Schmitt trigger configuration prevents LED flickering at boundary conditions.

## Verified Outcome

Successfully demonstrated real-time sound level visualization with 5 distinct intensity bands. Documented workflow, component specifications, and future improvement scope including digital readout integration.
