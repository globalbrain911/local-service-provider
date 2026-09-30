import Google from "./assets/images/logo/google.png";
import { Link } from "react-router-dom";
import { supabase } from "./assets/supabase-client";
import HeaderLow from "./Dashboard/headerLow";
import { useEffect, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLoginWithPassword = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        window.location.href = "/Dashboard";
      } else {
        setChecking(false);
      }
    });
  }, []);
  if (checking) return null;

  const handleLoginWithOAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/dashboard",
      },
    });
    if (error) console.error("Login error:", error.message);
  };
  return (
    <>
      <HeaderLow />
      <div className="flex justify-center items-center p-4 w-screen h-screen pt-10">
        <div className="w-full sm:w-87.5">
          <div className="text-3xl">Log in with your email</div>
          <div className="">
            <div className="my-3">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="bg-gray-100 w-full selected:border-2 rounded-lg px-3 py-3"
              />
            </div>
            <div className="my-3">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="bg-gray-100 w-full selected:border-2 rounded-lg px-3 py-3"
              />
            </div>
            <div
              onClick={handleLoginWithPassword}
              className="cursor-pointer my-3 bg-black text-white w-full selected:border-2 rounded-lg p-3 text-center"
            >
              Log In
            </div>
            <p>{message}</p>
            <div className="my-3 flex items-center">
              <hr className="grow" />
              <span className="mx-2">or</span> <hr className="grow" />
            </div>
            <div
              onClick={handleLoginWithOAuth}
              className="p-3 w-full text-center bg-taupe-200 rounded-lg cursor-pointer"
            >
              <div className="flex justify-center">
                <div className="w-5">
                  <img className="object-contain" src={Google} alt="" />
                </div>
                <div className="ml-2 text-[17px]">Continue with Google</div>
              </div>
            </div>
            <Link to="/Signup">
              <div className="my-3 bg-black text-white w-full selected:border-2 rounded-lg p-3 text-center">
                Sign up
              </div>
            </Link>
            <div className="mt-5 text-gray-700 text-sm tracking-wide">
              If you haven't registered yet, you can create a new account with
              Sign up option.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
