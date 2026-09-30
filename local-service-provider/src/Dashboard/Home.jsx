import { useState, useEffect } from "react";
import { supabase } from "../assets/supabase-client";

function Home({ user }) {
  const [firsName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setFirstName(data.first_name ?? "");
        setLastName(data.last_name ?? "");
        setMobile(data.mobile ?? "");
      } else {
        const full = user.user_metadata.full_name ?? "";
        const [first, ...rest] = full.split(" ");
        setFirstName(first ?? "");
        setLastName(rest.join(""));
      }
    };
    load();
  });

  const handleUpdate = async () => {
    const { error } = await supabase.from("profiles").upsert(
      {
        user_id: user.id,
        first_name: firsName,
        last_name: lastName,
        mobile: mobile,
      },
      { onConflict: "user_id" },
    );
    setMessage(error ? error.message : "Saved!");
  };

  return (
    <>
      <div className="max-w-200 pl-10 pt-10">
        <div className="text-3xl font-bold">
          Hello, {user.user_metadata.name}
        </div>
        <div className="my-5 flex justify-center">
          <div className="w-25 my-2">
            <img
              src={user.user_metadata.avatar_url}
              className="rounded-full"
              alt=""
            />
          </div>
        </div>
        <div className="pr-5">
          <div className="">
            <div className="text-lg">Name</div>
            <div className="grid grid-cols-2">
              <div className="pr-1 py-3">
                <input
                  value={firsName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                  type="text"
                  placeholder={firsName ? firsName : "First Name"}
                />
              </div>
              <div className="pl-1 py-3">
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                  type="text"
                  placeholder={lastName ? lastName : "Last Name"}
                />
              </div>
            </div>
          </div>
          <div>
            <div>Phone number</div>
            <div className="py-3">
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="text"
                placeholder={mobile ? mobile : ""}
              />
            </div>
          </div>
          <div>
            <div>Email</div>
            <div className="py-3">
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="text"
                placeholder={user.user_metadata.email}
              />
            </div>
          </div>
          <div className="pr-3 py-3">
            <div
              onClick={handleUpdate}
              className="text-lg cursor-pointer rounded-lg bg-black text-white w-full p-3 flex justify-center items-center"
            >
              Update
            </div>
            <div className="my-5 text-center text-green-700">
              <p>{message}</p>
            </div>
          </div>
          <div className="pr-3">
            <div
              onClick={handleLogout}
              className="text-lg cursor-pointer rounded-lg bg-red-400 border-2 selection:border-black text-white w-full p-3 flex justify-center items-center"
            >
              Sign out
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
