import { useState, useEffect } from "react";
import location from "../../assets/images/location.png";
import LocationPicker from "@/Dashboard/locationPicker";

function Location() {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [locationLabel, setLocationLabel] = useState(null);
  const [geoMessage, setGeoMessage] = useState("");
  const [locatingUser, setLocatingUser] = useState(null);

  console.log(locatingUser);
  console.log(locationLabel);

  useEffect(() => {
    if (locatingUser !== null) {
      document.body.style.cursor = locatingUser ? "" : "progress";
    }
  }, [locatingUser]);

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoMessage("Location not supported on this browser");
      return console.log(geoMessage);
    }

    setGeoMessage("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
        const label = await reverseGeocode(lat, lng);
        setLocationLabel(label);
        setLocatingUser(true);
      },
      (error) => {
        console.log(error);
        setLocatingUser(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocatingUser(true);
          setGeoMessage(
            "Location is blocked. Please allow it in your browser settings, or choose your area manually.",
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocatingUser(true);
          setGeoMessage(
            "We could not detect your location. Please choose your area manually.",
          );
        } else if (error.code === error.TIMEOUT) {
          setLocatingUser(true);
          setGeoMessage(
            "Getting your location took too long. Try again or choose your area manually.",
          );
        }
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 5 * 60 * 1000 },
    );
  };

  const reverseGeocode = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    );
    const data = await res.json();
    return data.address.village;
  };

  return (
    <>
      <div className=" flex justify-center tracking-wide">
        <div className="bg-mber-800 flex">
          <div
            className="ml-2 flex items-center justify-center bgmber-400 cursor-pointer"
            onClick={useMyLocation}
          >
            <img src={location} className="w-5 h-5" alt="" />
            {console.log("geo message" + geoMessage)}
            <div className="font-[Satoshi-Variable] font-medium text-[16px] mx-2">
              {locationLabel ? locationLabel : "My location"}
            </div>
          </div>
          <div className="cursor-pointer ">
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
      </div>
    </>
  );
}

export default Location;
