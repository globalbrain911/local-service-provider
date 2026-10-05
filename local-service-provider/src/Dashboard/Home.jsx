import { useState, useEffect } from "react";
import { supabase } from "../assets/supabase-client";
//import { data } from "react-router-dom";
import LocationPicker from "./locationPicker";

function Home({ user }) {
  const [firsName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(user.user_metadata.avatar_url);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [geoMessage, setGeoMessage] = useState("");
  const [locatingUser, setLocatingUser] = useState(false);
  const [locationLabel, setLocationLabel] = useState("");

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      window.location.href = "/login";
    }
  };

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
        setAvatarUrl(user.user_metadata.avatar_url);
        setLatitude(data.home_latitude ?? null);
        setLongitude(data.home_longitude ?? null);
        setLocationLabel(data.home_location_label ?? "");
      } else {
        const full = user.user_metadata.full_name ?? "";
        const [first, ...rest] = full.split(" ");
        setFirstName(first ?? "");
        setLastName(rest.join(""));
      }
    };
    load();
  }, [user.id]);

  const handleUpdate = async () => {
    const { error } = await supabase.from("profiles").upsert(
      {
        user_id: user.id,
        first_name: firsName,
        last_name: lastName,
        mobile: mobile,
        avatar_url: avatarUrl,
        home_latitude: latitude,
        home_longitude: longitude,
        home_location_label: locationLabel,
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
                type="number"
                placeholder={mobile ? mobile : "Mobile number"}
              />
            </div>
          </div>
          <div className="">
            <div className="pr-1 py-1">
              <div className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2">
                {locationLabel ? locationLabel : "Select where you live..."}
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
          <div className="grid grid-cols-2 py-3 gap-2 w-full h-15">
            <div
              onClick={useMyLocation}
              className="cursor-pointer rounded-2xl hover:bg-slate-300 bg-slate-200 w-full flex justify-center items-center"
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
          <div className="pr-3 pt-5">
            <div
              onClick={handleUpdate}
              className="text-lg cursor-pointer rounded-lg bg-black text-white w-full p-3 flex justify-center items-center"
            >
              Update
            </div>
            <div className="my-4 text-center text-green-700">
              <p>{message}</p>
            </div>
          </div>
          <div className="pr-3">
            <div
              onClick={handleLogout}
              className="text-lg cursor-pointer rounded-lg bg-red-600 border-2 selection:border-black text-white w-full p-3 flex justify-center items-center"
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
