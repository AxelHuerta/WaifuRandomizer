import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";

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
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          WaifuRandomizer
        </Link>
      </div>
      <div className="flex-none">
        <Link to="/favoritos">
          <button className="btn btn-square btn-ghost text-xl">
            <MdFavorite />
          </button>
        </Link>
      </div>
    </div>
  );
}
