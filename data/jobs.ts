export type Job = {
  slug: string;
  title: string;
  location?: string;
  type?: string; // Full-time, Internship
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
};

export const jobs: Job[] = [
  {
    slug: "robotics-software-engineer",
    title: "Robotics Software Engineer (C++/ROS2)",
    location: "Dhaka / Hybrid",
    type: "Full-time",
    summary:
      "Build reliable autonomy and control software for humanoids, mobile robots, and ROVs.",
    responsibilities: [
      "Develop and maintain ROS2 nodes for motion, perception, and control",
      "Integrate sensors and actuators; write drivers and testing tooling",
      "Collaborate with AI and embedded teams on system integration",
    ],
    requirements: [
      "3+ years C++ (17+) with ROS/ROS2",
      "Solid understanding of kinematics, control, and state estimation",
      "Experience with Linux and realtime constraints",
    ],
    benefits: ["Competitive salary", "Learning budget", "Flexible schedule"],
  },
  {
    slug: "computer-vision-engineer",
    title: "Computer Vision Engineer (Deep Learning)",
    location: "Dhaka / Remote",
    type: "Full-time",
    summary: "Build CV pipelines for detection, tracking, and HRI.",
    responsibilities: [
      "Train and optimize CNN models for edge deployment",
      "Build robust data pipelines and evaluation",
      "Collaborate on MLOps and continuous training",
    ],
    requirements: [
      "Experience with PyTorch/TensorFlow",
      "Model optimization (quantization, pruning)",
      "Strong Python engineering skills",
    ],
  },
  {
    slug: "embedded-systems-intern",
    title: "Embedded Systems Intern (IoT/RTOS)",
    location: "Dhaka / Onsite",
    type: "Internship",
    summary: "Assist in firmware development for sensors, motor control, and connectivity.",
    responsibilities: [
      "Write and debug firmware for MCUs (STM32, ESP32)",
      "Implement communication protocols (SPI, I2C, UART)",
      "Support bring‑up and hardware testing",
    ],
    requirements: [
      "C/C++ fundamentals",
      "Basic electronics and MCU development",
      "Eagerness to learn and build",
    ],
  },
];


