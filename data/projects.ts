export type ProjectTeamMember = {
  name: string;
  role?: string;
  image?: string;
  socials?: { linkedin?: string; github?: string; twitter?: string };
};

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  videoUrl?: string;
  coverImage: string; // path in public/
  gallery?: string[];
  techDetails?: string[]; // bullet points
  team?: ProjectTeamMember[];
  tags: string[];
  features?: { title: string; description: string; icon?: string }[];
  specsHardware?: { label: string; value: string }[];
  specsSoftware?: { label: string; value: string }[];
  useCases?: { title: string; description: string; icon?: string }[];
  actionGallery?: { title: string; image: string }[];
  upgrades?: { title: string; description: string; icon?: string }[];
};

export const projects: Project[] = [
  {
    slug: "pixi-humanoid-bot",
    title: "Pixi Humanoid Bot",
    subtitle: "Humanoid robot",
    description:
      "Next‑generation humanoid with facial and speech recognition, onboard CNN‑based vision, expressive interaction, and safe control.",
    coverImage: "/images/shark_tank_team.jpg",
    gallery: [
      "/images/pixi-humanoid.svg",
      "/images/underwater-rov.svg",
    ],
    techDetails: [
      "Real‑time face recognition and speech pipeline on edge compute",
      "ROS2 based control with whole‑body motion primitives",
      "CNN object detection with quantized runtime",
    ],
    team: [
      {
        name: "Md Arifin Ahmed Rafi",
        role: "Robotics Engineer",
        image: "/images/avatar-1.svg",
        socials: { linkedin: "#", github: "#" },
      },
      {
        name: "Ratul Hasan",
        role: "3D and Mechanical Designer",
        image: "/images/avatar-2.svg",
        socials: { linkedin: "#" },
      },
      {
        name: "Sihab Sahariar",
        role: "Robotics Engineer",
        image: "/images/avatar-2.svg",
        socials: { linkedin: "#" },
      },
      {
        name: "Md. Mahabub Ul Haque",
        role: "Electrical and Electronics Engineer",
        image: "/images/avatar-2.svg",
        socials: { linkedin: "#" },
      },
    ],
    tags: ["Humanoid", "Face Recognition", "Speech", "CNN"],
    features: [
      { title: "Advanced AI Navigation", description: "Sophisticated AI for complex environments with optimal routing.", icon: "Route" },
      { title: "Multi‑Environment Adaptability", description: "Operates seamlessly across homes, industries, and institutions.", icon: "Sparkles" },
      { title: "Human‑Bot Interaction", description: "Natural language, expressive behavior, and safe collaboration.", icon: "UserRound" },
      { title: "Modular Design", description: "Upgrades, maintenance, and extended lifespan via modularity.", icon: "Boxes" },
    ],
    specsHardware: [
      { label: "Processor", value: "ARM Cortex‑A78 Quad‑Core" },
      { label: "Sensors", value: "LiDAR, Ultrasonics, RGB‑D, Force Torque" },
      { label: "Actuators", value: "24‑DOF High‑Precision Servomotors" },
      { label: "Power", value: "48V Li‑ion, 6‑hour operation" },
      { label: "Materials", value: "Aerospace‑grade Aluminum, CFRP" },
      { label: "Dimensions", value: "150cm × 60cm × 40cm" },
    ],
    specsSoftware: [
      { label: "OS", value: "Custom Linux (RobOS)" },
      { label: "AI Frameworks", value: "TensorFlow, PyTorch, ROS2" },
      { label: "Comms", value: "Wi‑Fi 6, BT 5.3, 5G optional" },
      { label: "API", value: "gRPC, REST, ROS2" },
      { label: "Security", value: "Encrypted comms, secure boot" },
      { label: "Learning", value: "RL, few‑shot, online adaptation" },
    ],
    useCases: [
      { title: "Elderly Care Assistance", description: "Vital sign monitoring, reminders, and daily task support.", icon: "HeartPulse" },
      { title: "Industrial Automation", description: "Repetitive and hazardous task automation for efficiency.", icon: "Factory" },
      { title: "Educational Support", description: "Interactive lessons demonstrating robotics and AI concepts.", icon: "GraduationCap" },
    ],
    actionGallery: [
      { title: "", image: "/images/pixi_handshake.jpg" },
      { title: "", image: "/images/487807483_2925078901036614_949228799301634419_n.jpg" },
      { title: "", image: "/images/pixi1.jpg" },
    ],
    upgrades: [
      { title: "Enhanced Dexterity", description: "Advanced manipulators for delicate handling and fine tasks.", icon: "Hand" },
      { title: "Advanced Emotional Recognition", description: "Deeper affect recognition for empathetic interactions.", icon: "SmilePlus" },
    ],
  },
  {
    slug: "auv-autonomous-underwater-vehicle",
    title: "AUV - Autonomous Underwater Vehicle",
    subtitle: "YOLO‑based perception",
    description:
      "Autonomous path following with traffic sign detection using YOLO and embedded compute.",
    coverImage: "/images/underwater_1.jpg",
    gallery: [
      "/images/autonomous-rc.svg",
      "/images/pixi-humanoid.svg",
    ],
    techDetails: [
      "YOLOv5s traffic sign detection tuned for microcontrollers",
      "Pure pursuit path tracking with PID velocity control",
      "Onboard telemetry and logging",
    ],
    team: [
      { name: "M. Hasan", role: "Embedded Engineer", image: "/images/avatar-3.svg" },
    ],
    tags: ["YOLO", "Autonomy", "Embedded AI"],
  },
  {
    slug: "underwater-rov",
    title: "Underwater ROV",
    subtitle: "Pixhawk‑controlled",
    description:
      "ROV with 8 thrusters, Pixhawk flight controller, stabilized control, and video telemetry.",
    coverImage: "/images/underwater-rov.svg",
    gallery: [
      "/images/underwater-rov.svg",
    ],
    techDetails: [
      "Pixhawk‑based depth hold and attitude stabilization",
      "Tethered HD video telemetry and recording",
      "Fail‑safe leak detection and buoyancy control",
    ],
    team: [
      { name: "N. Karim", role: "Mechatronics" },
    ],
    tags: ["ROV", "Pixhawk", "Telemetry"],
  },
  {
    slug: "library-automation-robot",
    title: "Library Automation Robot",
    description:
      "Autonomous shelf scanning and item retrieval system for inventory and logistics in libraries.",
    coverImage: "/images/library-bot.svg",
    gallery: [
      "/images/library-bot.svg",
    ],
    techDetails: [
      "LiDAR‑assisted aisle navigation",
      "Barcode/RFID inventory mapping",
      "Task scheduling and route optimization",
    ],
    team: [
      { name: "R. Islam", role: "Systems" },
    ],
    tags: ["Automation", "Navigation", "Perception"],
  },
];


