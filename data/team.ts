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
    image: "/images/avatar-1.svg",
    summary:
      "Leads vision and product at Roboway Technologies across robotics, AI, and autonomy.",
    socials: { linkedin: "#" },
    education: ["BSc, Engineering"],
    expertise: ["Robotics", "Product", "Strategy"],
  },
  {
    slug: "sumaiya-akter",
    name: "Sumaiya Akter",
    title: "Chief AI Officer",
    image: "/images/avatar-2.svg",
    summary: "Oversees applied AI and research programs.",
    socials: { linkedin: "#", github: "#" },
    education: ["MSc, Computer Science"],
    expertise: ["Computer Vision", "Deep Learning", "MLOps"],
  },
  {
    slug: "nadim-karim",
    name: "Nadim Karim",
    title: "Chief Technology Officer",
    image: "/images/avatar-3.svg",
    summary: "Leads systems engineering and platform architecture.",
    socials: { linkedin: "#" },
    education: ["BSc, EEE"],
    expertise: ["Embedded Systems", "Controls", "Systems"],
  },
];


