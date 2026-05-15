export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  liveLink: string;
  githubLink: string;
  image: string; 
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Industrial Telemetry Dashboard",
    description: "Real-time monitoring system for factory automation using WebSockets and high-frequency data streaming.",
    tags: ["SvelteKit", "TypeScript", "D3.js"],
    liveLink: "#",
    githubLink: "#",
    image: "/images/project1.jpg" 
  },
  {
    id: 2,
    title: "Automated Billing Engine",
    description: "A production-grade invoice generator with dynamic PDF rendering and automated tax calculations.",
    tags: ["Node.js", "PostgreSQL", "Tailwind"],
    liveLink: "#",
    githubLink: "#",
    image: "/images/project2.jpg"
  },
  {
    id: 3,
    title: "Logic Controller Interface",
    description: "A web-based interface for interacting with hardware PLC modules via secure API gateways.",
    tags: ["React", "Express", "MQTT"],
    liveLink: "#",
    githubLink: "#",
    image: "/images/project3.jpg"
  }
];