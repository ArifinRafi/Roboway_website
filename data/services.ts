export type Service = {
  title: string;
  description: string;
  icon: string; // lucide icon name
};

export const services: Service[] = [
  {
    title: "Robotics & Automation",
    description:
      "Designing and deploying advanced robotic systems for manufacturing, logistics, and specialized industrial applications.",
    icon: "Bot",
  },
  {
    title: "Artificial Intelligence",
    description:
      "Developing intelligent AI solutions, ML models, and deep learning algorithms for analytics, prediction, and automation.",
    icon: "BrainCircuit",
  },
  {
    title: "IoT & Embedded Systems",
    description:
      "Creating interconnected devices and robust embedded systems for smart environments and real‑time processing.",
    icon: "Cpu",
  },
  {
    title: "Drone & Aerial Systems",
    description:
      "Innovating high‑performance drones and aerial robotics for surveillance, delivery, mapping, and agriculture.",
    icon: "Plane",
  },
];


