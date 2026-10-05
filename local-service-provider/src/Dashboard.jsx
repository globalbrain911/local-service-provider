import { useState, useEffect } from "react";
import { supabase } from "./assets/supabase-client";
import HeaderLow from "./Dashboard/headerLow";
import Home from "./Dashboard/Home";
import Security from "./Dashboard/secuirty";
import PrivacyAndData from "./Dashboard/privacy_n_data";

function Dashboard() {
  const [user, setUser] = useState(null);
  const items = ["Home", "Security", "Privacy & Data"];
  const [state, setState] = useState(0);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = "/Login";
      } else {
        setUser(session.user);
      }
    });
  }, []);

  if (!user) return console.log("Loading...");

  return (
    <>
      <div className="mt-18">
        <HeaderLow />
        <div className="flex">
          <div className="min-w-60 flex flex-col text-lg">
            <div className="h-12">
              {items.map((item, index) => (
                <div
                  className={`${state === index ? "bg-zinc-200 cursor-pointer flex h-full" : " cursor-pointer flex h-full"}`}
                  onClick={() => {
                    setState(index);
                  }}
                >
                  <div
                    className={`${state === index ? "bg-black w-1 absolute h-12" : ""}`}
                  ></div>
                  <div className="ml-5 flex justify-center items-center">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className={`${state === 0 ? "w-full" : "hidden"}`}>
              <Home user={user} />
            </div>
            <div className={`${state === 1 ? "w-full" : "hidden"}`}>
              <Security />
            </div>
            <div className={`${state === 2 ? "w-full" : "hidden"}`}>
              <PrivacyAndData user={user} />
            </div>
            <div className={`${state === 2 ? "w-full" : "hidden"}`}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
