import { useState, useEffect } from "react";
import { supabase } from "../assets/supabase-client";
import InputField from "@/components/jsx/inputField";
import LocationPicker from "./locationPicker";
import { RippleButton } from "@/components/ui/ripple-button";
import PopUpMessage from "@/components/jsx/PopUpMessage";

function Home({ user }) {
  const [firsName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(user.user_metadata.avatar_url);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [locationLabel, setLocationLabel] = useState("");
  const [geoMessage, setGeoMessage] = useState("");
  const [locatingUser, setLocatingUser] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

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
      <div className="max-w-200 px-5 md:px-10 pt-10">
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
        <div className=" mb-10">
          <div className="grid grid-cols-2 gap-1 py-3">
            <div className="">
              <InputField
                label="First Name"
                id="firstName"
                type="text"
                value={firsName}
                input={firsName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="">
              <InputField
                label="Last Name"
                id="lastName"
                type="text"
                value={lastName}
                input={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="py-3">
            <InputField
              label="Mobile Number"
              id="mobileNumber"
              type="number"
              value={mobile}
              input={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="">
            <InputField
              label="Location"
              id="locationLabel"
              value={locationLabel}
              input={locationLabel}
              onChange={(e) => setMobile(e.target.value)}
              disabled
            />
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
          <div className="grid grid-cols-2 my-3 gap-2 items-stretch w-full h-15 ">
            <RippleButton onClick={useMyLocation}>Locate me</RippleButton>
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
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            suscipit esse fugiat corporis, ratione quia, magni vero veniam animi
            laboriosam itaque sapiente saepe sequi soluta? Beatae quasi odio
            sint eligendi?
          </div>
          <div className="mt-3 grid sm:grid-cols-2 gap-1">
            <div>
              <RippleButton
                onClick={() => setShowPopup(true)}
                textColor="text-white"
                className="w-full p-4 bg-blue-700 hover:bg-blue-600"
              >
                Update
              </RippleButton>
              <PopUpMessage
                title="Confirm"
                content={
                  message
                    ? message
                    : "Are you sure you want to change your information?"
                }
                buttonContent="Submit Changes"
                open={showPopup}
                onHandleUpdate={handleUpdate}
                onClose={() => setShowPopup(false)}
              />
            </div>
            <RippleButton
              textColor="text-white"
              className="w-full p-4 bg-red-700  hover:bg-red-600"
              onClick={handleLogout}
            >
              Sign out
            </RippleButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
