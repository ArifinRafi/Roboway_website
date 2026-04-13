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
    title: "Pixi",
    subtitle: "Next-Gen Humanoid Robot",
    description:
      "Pixi is Roboway's next-generation humanoid robot — featuring real-time facial recognition, natural speech interaction, CNN-based vision, and ROS2 whole-body control. Built for care, industry, and education.",
    coverImage: "/images/piximain.jpg",
    gallery: [
      "/images/pixi1.jpg",
      "/images/pixiv1.jpg",
      "/images/pixi_handshake.jpg",
      "/images/pixi_hand.jpg",
      "/images/pixi_control.jpg",
    ],
    techDetails: [
      "Real-time face and speech recognition pipeline on edge compute",
      "ROS2-based whole-body motion control with 24-DOF servomotors",
      "Quantized CNN object detection for low-latency perception",
      "Expressive behavior engine for natural human-robot interaction",
      "Modular hardware architecture for rapid upgrades and maintenance",
    ],
    team: [
      { name: "Md Arifin Ahmed Rafi", role: "Robotics Engineer", image: "/images/arifin_rafi.jpg", socials: { linkedin: "#", github: "#" } },
      { name: "Ratul Hasan", role: "3D & Mechanical Designer", image: "/images/avatar-2.svg", socials: { linkedin: "#" } },
      { name: "Sihab Sahariar", role: "Robotics Engineer", image: "/images/avatar-2.svg", socials: { linkedin: "#" } },
      { name: "Md. Mahabub Ul Haque", role: "Electrical & Electronics Engineer", image: "/images/avatar-2.svg", socials: { linkedin: "#" } },
    ],
    tags: ["Humanoid", "Face Recognition", "Speech AI", "ROS2", "CNN Vision", "Edge AI"],
    features: [
      { title: "Face & Speech Recognition", description: "Real-time facial identification and natural language speech pipeline running fully on edge compute — no cloud dependency.", icon: "UserRound" },
      { title: "CNN Object Detection", description: "Quantized CNN model for fast, accurate object detection and scene understanding in diverse environments.", icon: "Eye" },
      { title: "ROS2 Motion Control", description: "Whole-body motion primitives via ROS2 with 24 high-precision servo DOFs for fluid, human-like movement.", icon: "Route" },
      { title: "Expressive Interaction", description: "Behavior engine produces natural, context-aware expressions and responses for safe human-robot collaboration.", icon: "Sparkles" },
      { title: "Modular Architecture", description: "Swappable hardware modules for rapid upgrades, simplified maintenance, and extended operational lifespan.", icon: "Boxes" },
      { title: "Multi-Environment Ready", description: "Operates seamlessly across homes, hospitals, industrial floors, and educational institutions.", icon: "Building2" },
    ],
    specsHardware: [
      { label: "Processor", value: "ARM Cortex-A78 Quad-Core" },
      { label: "Sensors", value: "LiDAR, Ultrasonics, RGB-D, Force-Torque" },
      { label: "Actuators", value: "24-DOF High-Precision Servomotors" },
      { label: "Power", value: "48V Li-ion · 6-hour runtime" },
      { label: "Materials", value: "Aerospace-grade Aluminium + CFRP" },
      { label: "Dimensions", value: "150cm × 60cm × 40cm" },
    ],
    specsSoftware: [
      { label: "OS", value: "Custom Linux (RobOS)" },
      { label: "AI Frameworks", value: "TensorFlow, PyTorch, ROS2" },
      { label: "Connectivity", value: "Wi-Fi 6, BT 5.3, 5G optional" },
      { label: "API", value: "gRPC, REST, ROS2 topics" },
      { label: "Security", value: "Encrypted comms, secure boot" },
      { label: "Learning", value: "RL, few-shot, online adaptation" },
    ],
    useCases: [
      { title: "Elderly Care", description: "Vital sign monitoring, medication reminders, fall detection, and companionship for elderly and disabled individuals.", icon: "HeartPulse" },
      { title: "Industrial Automation", description: "Autonomous operation in repetitive, hazardous, or precision manufacturing environments.", icon: "Factory" },
      { title: "Education & Research", description: "Interactive demonstrations of AI and robotics concepts for universities, labs, and STEM outreach.", icon: "GraduationCap" },
      { title: "Retail & Hospitality", description: "Customer-facing assistance, wayfinding, and service automation in commercial environments.", icon: "Store" },
    ],
    actionGallery: [
      { title: "Handshake Interaction", image: "/images/pixi_handshake.jpg" },
      { title: "Hand Detail", image: "/images/pixi_hand.jpg" },
      { title: "Control Interface", image: "/images/pixi_control.jpg" },
      { title: "Full View", image: "/images/pixi1.jpg" },
      { title: "Side Profile", image: "/images/pixiv1.jpg" },
    ],
  },
  {
    slug: "tanvin-vtol-drone",
    title: "Tanvin Mini 1.0",
    subtitle: "VTOL Surveillance Drone",
    description:
      "Advanced VTOL drone with pusher motor for multi-agency surveillance and monitoring. Named in memory of Martyr Jahiduzzaman Tanvin.",
    videoUrl: "https://youtu.be/YWxIL7rYQ10",
    coverImage: "/images/tanvin1.jpeg",
    gallery: [
      "/images/tanvin1.jpeg",
      "/images/tanvin2.jpeg",
      "/images/tanvin3.jpeg",
      "/images/tanvin4.jpeg",
      "/images/tanvin5.jpeg",
    ],
    techDetails: [
      "VTOL with pusher motor for endurance and versatility",
      "GPS-based autonomous navigation with auto-pilot",
      "Real-time flight telemetry and video transmission up to 10 km",
      "On-board AI processing with Jetson Nano 8GB",
      "PX4 firmware with encrypted MAVLink protocol",
    ],
    team: [
      {
        name: "Md Arifin Ahmed Rafi",
        role: "Project Lead",
        image: "/images/arifin_rafi.jpg",
        socials: { linkedin: "#", github: "#" },
      },
    ],
    tags: ["VTOL", "Surveillance", "AI", "Computer Vision", "PX4"],
    features: [
      { title: "VTOL Capability", description: "Vertical take-off and landing with pusher motor for extended range and endurance.", icon: "Plane" },
      { title: "AI Computer Vision", description: "On-board YOLO and SSD MobileNet models for real-time object detection and ANPR.", icon: "Eye" },
      { title: "Multi-Agency Applications", description: "Designed for military, civilian, disaster response, and law enforcement operations.", icon: "Shield" },
      { title: "Autonomous Navigation", description: "GPS-based autonomous flight with auto-pilot takeoff, landing, and mission planning.", icon: "Navigation" },
    ],
    specsHardware: [
      { label: "Type", value: "VTOL Drone with Pusher Motor" },
      { label: "Range", value: "10 km data transmission" },
      { label: "Payload", value: "5 KG external capacity" },
      { label: "Power", value: "12,000 mAh Li-Po Battery" },
      { label: "Camera", value: "20 MP, 10X Optical Zoom" },
      { label: "Computer", value: "Jetson Nano 8GB" },
      { label: "Body", value: "PLA / Carbon Fiber" },
      { label: "Charging", value: "B6 Li-Po, 70 min charge time" },
    ],
    specsSoftware: [
      { label: "GUI", value: "BengalX Flight Operations UI" },
      { label: "Firmware", value: "PX4 with encrypted MAVLink" },
      { label: "OS", value: "Ubuntu 20.04" },
      { label: "AI/ML", value: "YOLO Tiny, SSD MobileNet" },
      { label: "ANPR", value: "Bengali plate detection (98.5% precision)" },
      { label: "Navigation", value: "GPS autonomous with auto-pilot" },
    ],
    useCases: [
      { title: "Border Surveillance", description: "Army and coast guard operations for border monitoring and anti-terror reconnaissance.", icon: "Shield" },
      { title: "Disaster Response", description: "Flood mapping, rescue coordination, and real-time situational awareness.", icon: "AlertTriangle" },
      { title: "Wildlife Monitoring", description: "Forest department operations: wildlife tracking, fire detection, illegal logging surveillance.", icon: "TreePine" },
      { title: "Traffic & Law Enforcement", description: "Urban surveillance, traffic monitoring, crowd control, and vehicle plate recognition.", icon: "Car" },
    ],
    actionGallery: [
      { title: "In Flight", image: "/images/tanvin1.jpeg" },
      { title: "Structural Design", image: "/images/tanvin2.jpeg" },
      { title: "Field Deployment", image: "/images/tanvin3.jpeg" },
      { title: "Ground Operations", image: "/images/tanvin4.jpeg" },
      { title: "Mission Ready", image: "/images/tanvin5.jpeg" },
    ],
  },
  {
    slug: "detectx-surveillance-system",
    title: "DetectX",
    subtitle: "CCTV-Based Vehicle Number Plate & Hazard Detection System",
    description:
      "AI-Powered Surveillance Ecosystem for High-Security Government, Corporate, and Smart City Infrastructure. Transforms passive CCTV networks into proactive intelligence platforms.",
    videoUrl: "https://www.youtube.com/watch?v=93YRrJedH74",
    coverImage: "/images/detectx1.png",
    gallery: [
      "/images/detectx1.png",
      "/images/detectx2.png",
      "/images/detectx3.jpeg",
      "/images/detectx4.jpeg",
      "/images/detectx5.jpeg",
    ],
    tags: ["ANPR", "Computer Vision", "Edge AI", "Surveillance", "Jetson Nano", "Smart City"],
    features: [
      { title: "Localized ANPR", description: "98% accuracy on Bengali number plates in diverse lighting. Proprietary algorithms trained on Bangladeshi fonts and plate formats.", icon: "Car" },
      { title: "Fire & Smoke Detection", description: "Visual smoke and flame detection triggers alarms before heat sensors activate, drastically reducing property damage.", icon: "Flame" },
      { title: "Weapon Sensing", description: "Detects firearms and local weapons (knives, machetes). Specialized for Bangladesh's specific security threat profiles.", icon: "Shield" },
      { title: "Instant Alerts", description: "Zero-latency siren triggering and mobile push notifications for immediate on-ground intervention.", icon: "Bell" },
      { title: "Evidence Vault", description: "Automated archiving of vehicle images, timestamps, and hazard snapshots with searchable metadata.", icon: "Database" },
      { title: "Continuous Learning", description: "Self-improving AI models that adapt to environmental changes and new weapon shapes over time.", icon: "Brain" },
    ],
    specsHardware: [
      { label: "Edge Device", value: "NVIDIA Jetson Nano" },
      { label: "Integration", value: "Plug-and-play CCTV" },
      { label: "Connectivity", value: "IP Camera streams" },
      { label: "Power", value: "Low power, edge-based" },
      { label: "ANPR Accuracy", value: "98% Bengali plates" },
      { label: "Cloud Dependency", value: "None (Privacy First)" },
    ],
    specsSoftware: [
      { label: "Detection Models", value: "Custom ANPR + YOLO" },
      { label: "Languages", value: "Bengali script optimized" },
      { label: "Alert System", value: "SMS, push, local siren" },
      { label: "Platform", value: "Detector V1 + Enterprise" },
      { label: "Streams (Enterprise)", value: "1000+ camera support" },
      { label: "Revenue Model", value: "SaaS Hybrid" },
    ],
    useCases: [
      { title: "Border & Traffic Enforcement", description: "Real-time ANPR for law enforcement, traffic monitoring, and blacklisted vehicle flagging.", icon: "Car" },
      { title: "Industrial Fire Prevention", description: "Visual flame and smoke detection for factories, warehouses, and high-risk industrial premises.", icon: "Flame" },
      { title: "Smart City Surveillance", description: "City-scale centralized monitoring for police, municipal government, and public safety agencies.", icon: "Building2" },
      { title: "Parking Automation", description: "Seamless entry/exit with LPR, OTP payment gateway, and occupancy management.", icon: "ParkingSquare" },
    ],
    team: [
      {
        name: "Md Arifin Ahmed Rafi",
        role: "Project Lead",
        image: "/images/arifin_rafi.jpg",
        socials: { linkedin: "#", github: "#" },
      },
    ],
  },
  {
    slug: "aquabot-auv",
    title: "Aquabot",
    subtitle: "Autonomous Underwater Vehicle — Prototype",
    description:
      "Aquabot is a prototype autonomous underwater vehicle built for exploration, defense, and emergency response. Powered by Raspberry Pi 5B with AI accelerator and Pixhawk 4 flight controller.",
    videoUrl: "https://youtu.be/2obeKBDe9_Y",
    coverImage: "/images/aquabot1.jpeg",
    gallery: [
      "/images/aquabot1.jpeg",
      "/images/aquabot2.jpg",
    ],
    techDetails: [
      "Raspberry Pi 5B + AI accelerator for on-board computer vision inference",
      "Pixhawk 4 flight controller with depth hold and attitude stabilization",
      "Bar100 depth/pressure sensor for precise depth measurement",
      "YOLOv8 object detection for underwater obstacle and target identification",
      "Real-time HD video telemetry over tethered communication",
      "Modular thruster configuration for 6-DOF maneuvering",
    ],
    team: [
      {
        name: "Md Arifin Ahmed Rafi",
        role: "Project Lead",
        image: "/images/arifin_rafi.jpg",
        socials: { linkedin: "#", github: "#" },
      },
    ],
    tags: ["AUV", "Computer Vision", "Raspberry Pi 5", "Pixhawk 4", "Underwater", "Defense"],
    features: [
      { title: "On-Board AI Vision", description: "Raspberry Pi 5B paired with a dedicated AI accelerator runs YOLOv8 inference fully on the edge — no surface processing required.", icon: "Eye" },
      { title: "Pixhawk 4 Control", description: "Industry-grade Pixhawk 4 flight controller handles depth hold, attitude stabilization, and full 6-DOF maneuvering autonomously.", icon: "Navigation" },
      { title: "Depth Sensing", description: "Bar100 pressure/depth sensor provides millimetre-accurate depth measurements across operating range up to 100m.", icon: "Gauge" },
      { title: "Tethered HD Telemetry", description: "Real-time HD video feed and sensor telemetry streamed to surface operator via high-speed tether cable.", icon: "Wifi" },
      { title: "Modular Thruster Array", description: "Configurable multi-thruster layout enables agile 6-DOF movement — forward, lateral, vertical, and rotational control.", icon: "Settings" },
      { title: "Multi-Mission Ready", description: "Switchable mission profiles for underwater exploration, defense reconnaissance, and river accident response operations.", icon: "Shield" },
    ],
    specsHardware: [
      { label: "Onboard Computer", value: "Raspberry Pi 5B (8GB)" },
      { label: "AI Accelerator", value: "Edge AI co-processor" },
      { label: "Flight Controller", value: "Pixhawk 4" },
      { label: "Depth Sensor", value: "Bar100 (0–100m)" },
      { label: "Camera", value: "HD wide-angle + IR" },
      { label: "Thrusters", value: "6-DOF configuration" },
      { label: "Communication", value: "Tethered high-speed link" },
      { label: "Frame", value: "Acrylic + aluminium chassis" },
    ],
    specsSoftware: [
      { label: "Vision Model", value: "YOLOv8 (custom-trained)" },
      { label: "Control Stack", value: "ArduSub / PX4 Underwater" },
      { label: "OS", value: "Ubuntu 22.04 (RPi 5)" },
      { label: "Comms Protocol", value: "MAVLink over tether" },
      { label: "Telemetry UI", value: "QGroundControl + custom" },
      { label: "Data Logging", value: "On-board SD + cloud sync" },
    ],
    useCases: [
      { title: "Underwater Exploration", description: "Seabed mapping, reef survey, and underwater structure inspection in rivers, lakes, and coastal zones.", icon: "Globe" },
      { title: "Defense & Reconnaissance", description: "Covert underwater surveillance, port security monitoring, and naval reconnaissance operations.", icon: "Shield" },
      { title: "River Accident Response", description: "Rapid deployment for drowning rescue support, sunken vehicle location, and flood disaster assessment.", icon: "AlertTriangle" },
      { title: "Pipeline & Infrastructure", description: "Inspection of underwater pipelines, bridge foundations, and dam structures with HD visual data.", icon: "Activity" },
    ],
  },
];


