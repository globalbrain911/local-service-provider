import { useState, useEffect } from "react";
import { supabase } from "./assets/supabase-client";
import HeaderLow from "./Dashboard/headerLow";
import Home from "./Dashboard/Home";
import Security from "./Dashboard/secuirty";
import PrivacyAndData from "./Dashboard/privacy_n_data";
import clsx from "clsx";
import SellerForm from "./Dashboard/sellerDashboard/sellerForm";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [state, setState] = useState(0);
  const [providerStatus, setProviderStatus] = useState("loading");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = "/Login";
      } else {
        setUser(session.user);
        const load = async () => {
          const { data } = await supabase
            .from("service_providers")
            .select("provider_status")
            .eq("user_id", session.user.id)
            .maybeSingle();
          if (!data) {
            setProviderStatus("none");
          } else {
            setProviderStatus(data.provider_status);
          }
        };
        load();
      }
    });
  }, []);

  const sellerItemLabel = () => {
    switch (providerStatus) {
      case "none":
        return "Become a Seller";
      default:
        return "Seller Dashboard";
    }
  };

  const items = ["Home", "Security", "Privacy & Data", sellerItemLabel()];

  if (!user) return console.log("Loading...");

  return (
    <>
      <div className="mt-18">
        <HeaderLow />
        <div className="sm:flex">
          <div className="sm:min-w-45 flex flex-col text-lg ">
            <div className="min-h-15 sm:h-50  text-sm sm:text-lg sm:flex grid grid-cols-4 w-full sm:flex-col">
              {items.map((item, index) => (
                <div
                  onClick={() => {
                    setState(index);
                  }}
                  className={clsx(
                    "cursor-pointer relative flex justify-center sm:justify-normal items-center h-full",
                    {
                      " text-gray-600": index === 3,
                      "bg-zinc-200": state === index && index !== 3,
                      "": state === index && index === 3,
                    },
                  )}
                >
                  <div
                    className={clsx({
                      "sm:bg-black sm:w-1 absolute bottom-0 sm:h-full bg-black h-1 w-full":
                        state === index,
                    })}
                  ></div>
                  <div className="sm:ml-5 flex text-center items-center">
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
              <SellerForm user={user} providerStatus={providerStatus} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
