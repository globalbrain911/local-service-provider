import { useEffect, useState } from "react";
import HeaderLow from "../headerLow";
import Select from "react-select";
import { supabase } from "../../assets/supabase-client";

function SellerForm({ user }) {
  const [allServices, setAllServices] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    supabase
      .from("services")
      .select("id, name")
      .then(({ data, error }) => {
        console.log("services data:", data);
        console.log("services error:", error);
        setAllServices(data.map((s) => ({ value: s.id, label: s.name })));
      });
  }, []);

  const handleSubmit = async () => {
    const rows = selected.map((s) => ({
      provider_id: user.id,
      service_id: s.value,
      title: s.label,
    }));
    const { error } = await supabase.from("provider_packages").insert(rows);
    if (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeaderLow />
      <div className="max-w-200 pl-5 pt-10 mt-15">
        <div className="text-3xl font-bold">Hello, {name}</div>
        <div className="my-5 flex justify-center">
          <div className="w-25 my-2">
            <img src="" className="rounded-full" alt="" />
          </div>
        </div>
        <div className="text-red-800">
          Note: All the following things can be seen by any user.
        </div>
        <div className="pr-5">
          <div className="">
            <div className="text-lg">Shop Name</div>
            <div className="pr-1 py-3">
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="text"
              />
            </div>
          </div>
          <div className="">
            <div className="text-lg">Owner Name</div>
            <div className="pr-1 py-3">
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="text"
              />
            </div>
          </div>
          <div>
            <Select
              className=""
              isMulti
              options={allServices}
              value={selected}
              onChange={setSelected}
              placeholder="Type to search services..."
            />
          </div>
          <div>
            <div>Shop number</div>
            <div className="py-3 flex flex-col sm:flex-row gap-2">
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="number"
                placeholder="Telephone number"
              />
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="number"
                placeholder="Whatsapp number"
              />
            </div>
          </div>
          <div>
            <div>Shop Email</div>
            <div className="py-3">
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="email"
                placeholder="Email"
              />
            </div>
          </div>
          <div>
            <div>Shop Location</div>
            <div className="py-3">
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="email"
                placeholder="Address"
              />
            </div>
            <div>
              <div className="flex  grid-cols-2 gap-2">
                <input
                  className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                  type="number"
                  placeholder="Postal Code"
                />
                <input
                  className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                  type="text"
                  placeholder="City"
                />
              </div>
            </div>
          </div>
          <div className="pr-3 pt-3">
            <div
              onClick={handleSubmit}
              className="text-lg cursor-pointer rounded-lg bg-black text-white w-full p-3 flex justify-center items-center"
            >
              Update
            </div>
            <div className="my-4 text-center text-green-700"></div>
          </div>
          <div className="pr-3">
            <div className="text-lg cursor-pointer rounded-lg bg-red-600 border-2 selection:border-black text-white w-full p-3 flex justify-center items-center">
              Sign out
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerForm;
