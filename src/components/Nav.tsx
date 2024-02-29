import { useState } from "react";
import { HistoryIcon, HomeIcon } from "../assets/icons/icons";

export default function Nav() {
  const [activeNav, setActiveNav] = useState(0);
  return (
    <nav className="bg-black h-[70px]">
      <div className="container relative flex justify-center gap-3 h-full items-center">
        <div className="absolute left-0 text-white text-[20px] poppins-extrabold tracking-widest">
          Gallery App
        </div>
        <li
          onClick={() => setActiveNav(0)}
          className={`transition-colors h-[50px] p-3 aspect-square list-none cursor-pointer flex items-center justify-center rounded-xl ${
            activeNav == 0 ? "bg-white" : ""
          }`}
        >
          <HomeIcon
            className={`transition-colors h-full aspect-square ${
              activeNav == 0 ? "[&>path]:fill-black" : "[&>path]:fill-white"
            } `}
          />
        </li>
        <li
          onClick={() => setActiveNav(1)}
          className={`transition-colors h-[50px] p-3 aspect-square list-none cursor-pointer flex items-center justify-center rounded-xl ${
            activeNav == 1 ? "bg-white" : ""
          }`}
        >
          <HistoryIcon
            className={`transition-colors h-full aspect-square ${
              activeNav == 1 ? "[&>g>path]:fill-black" : "[&>g>path]:fill-white"
            } `}
          />
        </li>
      </div>
    </nav>
  );
}
