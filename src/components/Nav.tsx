import { useLayoutEffect, useState } from "react";
import { HistoryIcon, HomeIcon } from "../assets/icons/icons";
import { Link } from "react-router-dom";

export default function Nav() {
  const [activeNav, setActiveNav] = useState(0);
  useLayoutEffect(() => {
    if (window.location.pathname == "/History") {
      setActiveNav(1);
    }
  }, []);

  return (
    <nav className="bg-black h-[70px]">
      <div className="container relative flex justify-center gap-3 h-full items-center mobile:px-5 mobile:justify-end">
        <div className="absolute left-2 text-white text-[20px] poppins-extrabold tracking-widest mobile:text-[16px] mobile:left-4">
          <Link to={"/Home"}>Gallery App </Link>
        </div>
        <Link to={"/Home"}>
          <li
            onClick={() => setActiveNav(0)}
            className={`transition-colors h-[45px] p-3 aspect-square list-none cursor-pointer flex items-center justify-center rounded-xl ${
              activeNav == 0 ? "bg-white" : ""
            }`}
          >
            <HomeIcon
              className={`transition-colors h-full aspect-square ${
                activeNav == 0 ? "[&>path]:fill-black" : "[&>path]:fill-white"
              } `}
            />
          </li>
        </Link>
        <Link to={"/History"}>
          <li
            onClick={() => setActiveNav(1)}
            className={`transition-colors h-[45px] p-3 aspect-square list-none cursor-pointer flex items-center justify-center rounded-xl ${
              activeNav == 1 ? "bg-white" : ""
            }`}
          >
            <HistoryIcon
              className={`transition-colors h-full aspect-square ${
                activeNav == 1
                  ? "[&>g>path]:fill-black"
                  : "[&>g>path]:fill-white"
              } `}
            />
          </li>
        </Link>
      </div>
    </nav>
  );
}
