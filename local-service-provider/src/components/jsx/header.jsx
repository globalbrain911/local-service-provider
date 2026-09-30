import Hamburger from "./hamburger";
import { useEffect, useState } from "react";
import { supabase } from "../../assets/supabase-client";
import { Link } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setChecking(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (checking) return null;

  return (
    <>
      <header className="fixed flex justify-center top-0 left-0 right-0 z-999 bg-black py-4 md:p-4">
        <div className="max-w-7xl w-full">
          <div className="flex items-center justify-between">
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
            <div className="text-sm flex bgamber-400 items-center">
              {user ? (
                <>
                  <div className="bg-white p-2 px-3 rounded-4xl ml-1">
                    <Link to="/Dashboard"> Go to Dashboard</Link>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <div className="text-white mr-4">Log in</div>
                  </Link>
                  <Link to="/Signup">
                    <div className="bg-white p-2 px-3 rounded-4xl ml-1">
                      Sign up
                    </div>
                  </Link>
                </>
              )}
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
