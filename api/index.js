const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database
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

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Parth Doshi API is Alive! 🚀</h1>');
});

app.get('/api/projects', (req, res) => {
    // We removed the delay for production so it loads instantly!
    res.json(projects);
});

// THE SMART PART:
// If running locally (node index.js), listen on port 5000.
// If running on Vercel, don't listen (Vercel handles it), just export.
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running locally on http://localhost:${PORT}`);
    });
}

module.exports = app;