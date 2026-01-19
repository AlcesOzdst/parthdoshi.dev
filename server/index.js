// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware (Allows your frontend to talk to this backend)
app.use(cors());
app.use(express.json());

// Mock Database (We will replace this with MongoDB later)
const projects = [
    {
        id: 1,
        title: "World Peace Dome",
        tech: "Field Research • Videography",
        date: "OCT 2025",
        description: "Group project for MITWPU focusing on immersive field research."
    },
    {
        id: 2,
        title: "DSP Signals Analysis",
        tech: "Python • Matplotlib • Z-Transform",
        date: "NOV 2025",
        description: "Visualizing signal decomposition using Python libraries."
    },
    {
        id: 3,
        title: "Sequence Detector",
        tech: "Digital Logic • Mealy Machine",
        date: "DEC 2025",
        description: "Designing state machines for sequence detection in Verilog."
    }
];

// Test Route
app.get('/', (req, res) => {
    res.send('<h1>Parth Doshi API is Alive! 🚀</h1>');
});

// GET endpoint to fetch projects
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// GET endpoint with a 1-second delay to simulate real internet
app.get('/api/projects', (req, res) => {
    setTimeout(() => {
        res.json(projects);
    }, 1000); // 1000ms = 1 second delay
});