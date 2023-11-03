import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`navbar fixed z-10 ${
        isScrolled ? "bg-[rgba(0,0,0,.5)]" : ""
      } transition delay-50 duration-300 backdrop-blur`}
    >
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">WaifuRandomizer</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost text-xl">
          <MdFavorite />
        </button>
      </div>
    </div>
  );
}
