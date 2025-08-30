import React from "react";
import { Github } from "lucide-react";

function Footer({ customStyle }) {
  return (
    <footer
      className={`group fixed bottom-0 w-full bg-cyan-950 text-white shadow-inner ${customStyle}`}
    >
      <a
        href="https://github.com/ravikanttarare95/todo-app-frontend.git"
        target="_blank"
        className="py-4 px-6 flex items-center justify-center space-x-3 cursor-pointer group-hover:text-cyan-200 duration-300"
      >
        <Github className="w-5 h-5 group-hover:scale-110 duration-300" />
        <span className="text-sm font-medium">View this project on GitHub</span>
      </a>
    </footer>
  );
}

export default Footer;
