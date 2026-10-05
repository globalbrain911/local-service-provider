import { useEffect, useState } from "react";
import HeaderLow from "../headerLow";
import Select from "react-select";
import { supabase } from "../../assets/supabase-client";
import LocationPicker from "../locationPicker";

function SellerForm({ user }) {
  const [allServices, setAllServices] = useState([]);
  const [service, setService] = useState(true);
  const [selected, setSelected] = useState([]);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [geoMessage, setGeoMessage] = useState("");
  const [locatingUser, setLocatingUser] = useState(false);
  const [locationLabel, setLocationLabel] = useState("");
  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoMessage("Location not supported on this browser");
      return console.log(geoMessage);
    }
    setLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);

        const label = await reverseGeocode(lat, lng);
        setLocationLabel(label);
      },
      (error) => {
        setGeoMessage("Couldn't get your location: " + error.message);
        setLocatingUser(false);
      },
    );
  };
  const reverseGeocode = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    );
    const data = await res.json();
    return data.address.village;
  };

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
      <div className="max-w-200 pl-5 pt-10 mt-5">
        <div className="text-3xl font-bold">
          Hello,{user.user_metadata.full_name}
        </div>
        <div className="pr-5 mt-5">
          <div className="flex justify-center">
            <div
              className="grid grid-cols-2 
             border-2
            text-lg rounded-4xl
            "
            >
              <div
                className={`${service ? "px-6 py-3 rounded-4xl flex justify-center bg-black text-white" : "px-6 py-3 rounded-4xl flex justify-center"}`}
                onClick={() => setService(true)}
              >
                <label htmlFor="Service">Service</label>
              </div>
              <div
                className={`${service ? "px-6 py-3 rounded-4xl flex justify-center" : "px-6 py-3 rounded-4xl flex justify-center bg-black text-white"}`}
                onClick={() => setService(false)}
              >
                <label htmlFor="Shop">Shop</label>
              </div>
            </div>
          </div>
          {service ? (
            ""
          ) : (
            <>
              <div className="">
                <div className="text-lg">Shop Name</div>
                <div className="py-2">
                  <input
                    className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                    type="text"
                    placeholder="Ex:Keells"
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Note:- All the below data should belongs to shop owner
              </div>
            </>
          )}
          <div className="grid grid-cols-2">
            <div className="pr-1 py-3">
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="py-3">
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="pb-3">
            <input
              className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
              type="text"
              placeholder="NIC"
            />
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
          <div className="">
            <input
              className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="">
            <div className="mt-3">
              <div className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2">
                {locationLabel
                  ? "You are from " + locationLabel
                  : "Select where you live..."}
              </div>
            </div>
          </div>
          <div className="cursor-progress">
            {locatingUser ? (
              <>
                <p className="bg-white text-green-700 text-center">
                  Locating...
                </p>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="my-1 grid grid-cols-2 gap-2 w-full text-sm">
            <div
              onClick={useMyLocation}
              className="text-center p-2  sm:p-0 cursor-pointer rounded-2xl hover:bg-slate-300 bg-slate-200 
              w-full flex justify-center items-center"
            >
              Use my current location
            </div>
            <div className="cursor-pointer">
              <LocationPicker
                onSelect={(choice) => {
                  if (choice) {
                    setLatitude(choice.latitude);
                    setLongitude(choice.longitude);
                    setLocationLabel(choice.label);
                    console.log(choice);
                  } else {
                    setLatitude(null);
                    setLongitude(null);
                    setLocationLabel("");
                  }
                }}
              />
            </div>
          </div>
          <div className="pt-3">
            <div
              onClick={handleSubmit}
              className="text-lg cursor-pointer rounded-lg bg-black text-white w-full p-3 flex justify-center items-center"
            >
              Update
            </div>
            <div className="my-4 text-center text-green-700"></div>
          </div>
          <div className="mb-15">
            Note:-
            <br />
            To be eligibale to become a seller you have to fill all the details
            in this form. After review from our team we will publish you as a
            seller.
            <br />
            Thank you
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerForm;
