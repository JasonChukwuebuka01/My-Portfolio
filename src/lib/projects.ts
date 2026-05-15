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
    title: "Crypto Analytic Dashboard",
    description: "Real-time monitoring system for Cryptocurrency using WebSockets and high-frequency data streaming.",
    tags: ["Vue", "TypeScript", "Chart.js"],
    liveLink: "https://analytics-dashboard-zeta-three.vercel.app/",
    githubLink: "https://github.com/JasonChukwuebuka01/analytics-dashboard",
    image: "/projects/vortex.png"
  },
  {
    id: 2,
    title: "Invoice-Manager",
    description: "A full-stack financial orchestration tool featuring a robust CRUD engine, automated status state machines, and real-time form validation. Engineered with a persistent data layer and global theme synchronization for seamless enterprise-grade invoice management.",
    tags: ["React", "Typescript", "Tailwind"],
    liveLink: "https://invoice-manager-mu.vercel.app/",
    githubLink: "https://github.com/JasonChukwuebuka01/invoice",
    image: "/projects/invoice-manager.png"
  },
  {
    id: 3,
    title: "DeSpeed-clone",
    description: "A Decentralized web application built as an airdrop clone of an existing distribution platform",
    tags: ["Next js", "Typescript", "Tailwind"],
    liveLink: "https://myairdrop-dashboard.vercel.app/dashboard",
    githubLink: "https://github.com/JasonChukwuebuka01/Airdrop-Dashboard",
    image: "/projects/despeed.png"
  }
];