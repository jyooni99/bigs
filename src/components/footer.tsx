import { Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-zinc-800">
      <div className="flex justify-between gap-3 max-w-4xl px-6 lg:px-0 mx-auto">
        <p>&copy; 2026 BigsBoard. All rights reserved.</p>
        <Link
          href="https://github.com/jyooni99/bigs"
          target="_blank"
          className="inline-block"
        >
          <Github className="w-5 h-5 hover-violet" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
