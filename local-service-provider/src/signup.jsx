import Google from "./assets/images/logo/google.png";
import HeaderLow from "./Dashboard/headerLow";
import { useState } from "react";
import { supabase } from "./assets/supabase-client";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email to confirm your account!");
    }
  };
  const handleSignUpWithOAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://localhost:5173/dashboard",
      },
    });
    if (error) console.error("Login error:", error.message);
  };

  return (
    <>
      <HeaderLow />
      <div className="flex justify-center items-center p-4 w-screen h-screen">
        <div className="w-full sm:w-87.5">
          <div className="text-3xl">
            <div>Sign up</div>
          </div>
          <div className="">
            <div className="my-3">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 w-full selected:border-2 rounded-lg px-3 py-3"
              />
            </div>
            <div className="my-3">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 w-full selected:border-2 rounded-lg px-3 py-3"
              />
            </div>
            <div
              onClick={handleSignUp}
              className="cursor-pointer my-3 bg-black text-white w-full selected:border-2 rounded-lg p-3 text-center"
            >
              Sign Up
            </div>
            <p>{message}</p>
            <div className="my-3 flex items-center">
              <hr className="grow" />
              <span className="mx-2">or</span> <hr className="grow" />
            </div>
            <div className="p-3 w-full text-center bg-taupe-200 rounded-lg">
              <div
                className="flex justify-center"
                onClick={handleSignUpWithOAuth}
              >
                <div className="w-5">
                  <img className="object-contain" src={Google} alt="" />
                </div>
                <div className="ml-2 text-[17px]">Continue with Google</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;
