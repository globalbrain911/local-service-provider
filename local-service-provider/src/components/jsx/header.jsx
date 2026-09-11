import Hamburger from "./hamburger";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-999">
        <div className="flex items-center justify-between bg-black p-4 pr-2">
          <div className="text-xl text-white p-1 px-2"><Link to={"/"}>LSF</Link></div>
          <div className="text-sm flex items-center pr-2">
            <div className="text-white mr-4">Log in</div>
            <div className="bg-white p-2 px-3 rounded-4xl ml-1">Sign up</div>
            <Hamburger/>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;