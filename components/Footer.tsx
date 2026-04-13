import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-[#4a5568]">&copy; {new Date().getFullYear()} Roboway Technologies</p>
          <div className="flex items-center gap-5">
            <Link href="https://www.linkedin.com/company/robowaylabs" className="text-[#4a5568] transition-all hover:text-[#60a5fa] hover:scale-110" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedin size={18} /></Link>
            <Link href="#" className="text-[#4a5568] transition-all hover:text-[#60a5fa] hover:scale-110" aria-label="GitHub"><FaGithub size={18} /></Link>
            <Link href="#" className="text-[#4a5568] transition-all hover:text-[#60a5fa] hover:scale-110" aria-label="Facebook"><FaFacebook size={18} /></Link>
          </div>
          <div className="text-sm text-[#4a5568]">
            <nav className="flex gap-5">
              <Link href="#about" className="transition-colors hover:text-white">About</Link>
              <Link href="#services" className="transition-colors hover:text-white">Services</Link>
              <Link href="#projects" className="transition-colors hover:text-white">Projects</Link>
              <Link href="#contact" className="transition-colors hover:text-white">Contact</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
