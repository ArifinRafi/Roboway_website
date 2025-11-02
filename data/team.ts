export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  image: string;
  summary?: string;
  socials?: { linkedin?: string; github?: string; twitter?: string };
  education?: string[];
  expertise?: string[];
};

export const team: TeamMember[] = [
  {
    slug: "md-arifin-ahmed-rafi",
    name: "Md Arifin Ahmed Rafi",
    title: "Founder & CEO",
    image: "/images/arifin_rafi.jpg",
    summary:
      "Leads vision and product at Roboway Technologies across robotics, AI, and autonomy.",
    socials: { linkedin: "#" },
    education: ["BSc in Computer Science, Brac University"],
    expertise: ["Robotics", "Product", "Strategy"],
  },
  {
    slug: "Md-Mahbub-Ul-Haque",
    name: "Md Mahbub Ul Haque",
    title: "Chief Operaating Officer and Electrical and Electronics Lead",
    image: "/images/mahbub.jpg",
    summary: "Oversees applied AI and research programs.",
    socials: { linkedin: "#", github: "#" },
    education: ["MSc in Robotics and Mechatronics, University of Dhaka"],
    expertise: ["PCB", "Electronics", "MLOps"],
  },
  {
    slug: "Shorowar-Hossain",
    name: "Shorowar Hossain",
    title: "R & D Lead and Robotics Engineer",
    image: "/images/shorowar.jpg",
    summary: "Leads systems engineering and platform architecture.",
    socials: { linkedin: "#" },
    education: ["BSc in Computer Science and Engineering, United International University, Dhaka"],
    expertise: ["Embedded Systems", "Controls", "Systems"],
  },
];


