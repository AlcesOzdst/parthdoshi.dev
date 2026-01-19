/**
 * Project Data Source
 * Contains details for all projects including modal and full page content.
 */
const projectsData = [
    {
        id: 'project-one',
        title: 'ProjectOne',
        tagline: 'Innovation at its finest',
        image: 'assets/project1.jpg', // Placeholder
        brief: 'ProjectOne is a pioneering solution designed to revolutionize the way users interact with digital interfaces. By leveraging advanced AI algorithms and intuitive design patterns, it bridges the gap between complexity and usability.',
        roles: ['UI/UX Design', 'Frontend Development', 'System Architecture'],
        deliverables: ['Web Application', 'Mobile App', 'Design System'],
        theme: 'warm'
    },
    {
        id: 'nexus',
        title: 'Nexus',
        tagline: 'Connecting possibilities',
        image: 'assets/project2.jpg',
        brief: 'Nexus serves as a central hub for decentralized data management. It allows organizations to securely share and verify information across borders without compromising privacy or speed.',
        roles: ['Backend Engineering', 'Cryptography', 'API Design'],
        deliverables: ['Core API', 'Documentation', 'SDKs'],
        theme: 'dark'
    },
    {
        id: 'orbit',
        title: 'Orbit',
        tagline: 'Beyond boundaries',
        image: 'assets/project3.jpg',
        brief: 'Orbit is an astronomical data visualization tool used by researchers to map celestial bodies in real-time. It processes petabytes of data to render high-fidelity 3D models of the universe.',
        roles: ['Data Visualization', 'WebGL Shader Programming', 'Performance Optimization'],
        deliverables: ['Interactive Dashboard', '3D Engine', 'Research Paper'],
        theme: 'blue'
    },
    {
        id: 'pulse',
        title: 'Pulse',
        tagline: 'Feel the rhythm',
        image: 'assets/project4.jpg',
        brief: 'Pulse is a next-generation music streaming platform that adapts to the listener\'s biometric data. It curates playlists based on heart rate and mood detection.',
        roles: ['Mobile Development', 'Integration', 'Algorithm Design'],
        deliverables: ['iOS App', 'WatchOS App', 'curation Engine'],
        theme: 'teal'
    },
    {
        id: 'prism',
        title: 'Prism',
        tagline: 'A spectrum of ideas',
        image: 'assets/project5.jpg',
        brief: 'Prism is a collaborative design tool that enables teams to explore color theory and accessibility in real-time. It ensures all digital products meet global inclusion standards.',
        roles: ['Product Design', 'Accessibility Auditing', 'React Development'],
        deliverables: ['SaaS Platform', 'Browser Extension', 'Community Hub'],
        theme: 'purple'
    },
    {
        id: 'ember',
        title: 'Ember',
        tagline: 'Igniting creativity',
        image: 'assets/project6.jpg',
        brief: 'Ember is a content creation suite for digital artists. It provides procedural generation tools that spark inspiration and accelerate the concept art workflow.',
        roles: ['Tool Development', 'C++ / Wasm', 'UX Research'],
        deliverables: ['Desktop Application', 'Plugin Ecosystem', 'Tutorial Series'],
        theme: 'coral'
    }
];

// Export for module usage or global access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectsData;
} else {
    window.projectsData = projectsData;
}
