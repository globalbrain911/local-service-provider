import Hamburger from "./hamburger";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="fixed flex justify-center top-0 left-0 right-0 z-999 bg-black p-4">
        <div className="max-w-350 w-full">
          <div className="flex items-center justify-between pr-2">
            <div className=" text-white p-1 px-2 flex items-center justify-start">
              <Link className="text-2xl" to={"/"}>
                LSF
              </Link>
              <div className={`${"lg:text-[15px] ml-4 hidden lg:block"}`}>
                <Link className="mx-3">Home</Link>
                <Link className="mx-3">About Us</Link>
                <Link className="mx-3">Services</Link>
                <Link className="mx-3">Contact</Link>
              </div>
            </div>
            <div className="text-sm flex items-center pr-2">
              <div className="text-white mr-4">Log in</div>
              <div className="bg-white p-2 px-3 rounded-4xl ml-1">Sign up</div>
              <div className={`${"lg:hidden"}`}>
                <Hamburger />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
