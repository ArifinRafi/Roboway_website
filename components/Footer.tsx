import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Roboway Technologies</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-zinc-400 hover:text-white" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-white" aria-label="GitHub">
              <FaGithub size={18} />
            </Link>
            <Link href="#" className="text-zinc-400 hover:text-white" aria-label="Facebook">
              <FaFacebook size={18} />
            </Link>
          </div>
          <div className="text-sm text-zinc-400">
            <nav className="flex gap-5">
              <Link href="#about" className="hover:text-white">About</Link>
              <Link href="#services" className="hover:text-white">Services</Link>
              <Link href="#projects" className="hover:text-white">Projects</Link>
              <Link href="#contact" className="hover:text-white">Contact</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}


