import { useEffect, useState } from "react";
import HeaderLow from "../headerLow";
import Select from "react-select";
import { supabase } from "../../assets/supabase-client";
import LocationPicker from "../locationPicker";
import clsx from "clsx";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { StatusBadge } from "@/components/animations/StatusBadge";

function SellerForm({ user, providerStatus }) {
  const [allServices, setAllServices] = useState([]);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [geoMessage, setGeoMessage] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(
    user.user_metadata.avatar_url,
  );
  const [nic, setNIC] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [providerType, setProviderType] = useState("service");
  const [businessName, setBusinessName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [message, setMessage] = useState("");
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

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("provider_services")
        .select("service_id, services(id, name)")
        .eq("provider_id", user.id);

      console.log("saved services:", data, error);
      if (data) {
        const preSelected = data.map((row) => ({
          value: row.services.id,
          label: row.services.name,
        }));
        setSelectedServices(preSelected);
      }
    };
    load();
  }, [user.id]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("service_providers")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setNIC(data.nic ?? "");
        setProviderType(data.provider_type ?? "");
        setBusinessName(data.business_name ?? "");
        setMobile(data.mobile_number ?? "");
        setProfileImageUrl(
          data.profile_image_url ?? user.user_metadata.avatar_url,
        );
        setWhatsappNumber(data.whatsapp_number ?? "");
        setLatitude(data.latitude ?? null);
        setLongitude(data.longitude ?? null);
        setLocationLabel(data.location_label ?? "");
      }
      console.log(data);
    };
    load();
  }, [user.id]);

  const handleSubmit = async () => {
    const { error: providerError } = await supabase
      .from("service_providers")
      .upsert({
        user_id: user.id,
        nic: nic,
        whatsapp_number: whatsappNumber,
        mobile_number: mobile,
        profile_image_url: profileImageUrl,
        latitude: latitude,
        longitude: longitude,
        location_label: locationLabel,
        provider_type: providerType,
        business_name: businessName,
      });
    if (providerError) {
      setMessage(providerError.message);
      return console.log(message);
    }
    await supabase
      .from("provider_services")
      .delete()
      .eq("provider_id", user.id);
    const rows = selectedServices.map((s) => ({
      provider_id: user.id,
      service_id: s.value, // from react-select's {value, label} shape
    }));
    const { error: servicesError } = await supabase
      .from("provider_services")
      .insert(rows);

    setMessage(
      servicesError ? servicesError.message : "Application submitted!",
    );
  };

  return (
    <>
      <HeaderLow />
      <div className="max-w-200 pl-5 pt-10 mt-5">
        <div className="text-3xl font-bold flex flex-col sm:flex-row justify-between pr-5">
          Hello,{user.user_metadata.full_name}
          <StatusBadge status={providerStatus} />
        </div>
        <div className="pr-5 mt-5">
          <div className="flex justify-between gap-1 my-5">
            <div
              className="grid grid-cols-2 
             border-2
            text-lg rounded-4xl
            "
            >
              <div
                className={`${providerType === "service" ? "px-6 py-3 rounded-4xl flex justify-center bg-black text-white" : "px-6 py-3 rounded-4xl flex justify-center"}`}
                onClick={() => setProviderType("service")}
              >
                <label htmlFor="Service">Service</label>
              </div>
              <div
                className={`${providerType === "shop" ? "px-6 py-3 rounded-4xl flex justify-center bg-black text-white" : "px-6 py-3 rounded-4xl flex justify-center"}`}
                onClick={() => setProviderType("shop")}
              >
                <label htmlFor="Shop">Shop</label>
              </div>
            </div>
          </div>
          {providerType === "service" ? (
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
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Note:- All the below data should belongs to shop owner
              </div>
            </>
          )}
          <div className="my-3">
            <input
              className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
              type="text"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNIC(e.target.value)}
            />
          </div>
          <div>
            <Select
              isMulti
              options={allServices}
              value={selectedServices}
              onChange={setSelectedServices}
              placeholder="Select the services you offer..."
            />
          </div>
          <div>
            <div className="py-3 flex flex-col sm:flex-row gap-2 my-2">
              <div className=" w-full">
                <label htmlFor="mobile_number">Mobile number</label>
                <input
                  id="mobile_number"
                  className="border-none bg-slate-200 w-full p-3 px-4 rounded-lg selection:border-black selection:border-2"
                  type="number"
                  placeholder="Mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="whatsapp_number">Whatsapp number</label>
                <input
                  id="whatsapp_number"
                  className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                  type="number"
                  placeholder="Whatsapp number"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                />
              </div>
            </div>
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
              onClick={() => handleSubmit()}
              className="text-lg cursor-pointer rounded-lg bg-black text-white w-full p-3 flex justify-center items-center"
            >
              Update
            </div>
            <div className="my-4 text-center text-green-700">{message}</div>
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
