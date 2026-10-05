import { useState, useEffect } from "react";
import { supabase } from "./assets/supabase-client";
import HeaderLow from "./Dashboard/headerLow";
import Home from "./Dashboard/Home";
import Security from "./Dashboard/secuirty";
import PrivacyAndData from "./Dashboard/privacy_n_data";
import SellerForm from "./Dashboard/sellerDashboard/sellerForm";

function Dashboard() {
  const [user, setUser] = useState(null);
  const items = ["Home", "Security", "Privacy & Data", "Become a Seller"];
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
        <div className="sm:flex">
          <div className="sm:min-w-45 flex flex-col text-lg ">
            <div className="h-20 sm:h-50 flex sm:flex-col  overflow-x-auto">
              {items.map((item, index) => (
                <div
                  className={`${state === index ? "bg-zinc-200 cursor-pointer flex h-full p-5 sm:p-0" : " cursor-pointer flex h-full sm:p-0 p-5"}`}
                  onClick={() => {
                    setState(index);
                  }}
                >
                  <div
                    className={`${state === index ? "sm:bg-black sm:w-1 sm:absolute sm:h-12" : ""}`}
                  ></div>
                  <div className="sm:ml-5 flex justify-center items-center">
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
            <div className={`${state === 3 ? "w-full" : "hidden"}`}>
              <SellerForm user={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
