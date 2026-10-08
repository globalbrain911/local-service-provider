import { useEffect, useState } from "react";
import HeaderLow from "../headerLow";
import Select from "react-select";
import { supabase } from "../../assets/supabase-client";
import LocationPicker from "../locationPicker";
import clsx from "clsx";
import { StatusBadge } from "@/components/animations/StatusBadge";
import InputField from "@/components/jsx/inputField";
import { RippleButton } from "@/components/ui/ripple-button";
import PopUpMessage from "@/components/jsx/PopUpMessage";

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
  const [showPopup, setShowPopup] = useState(false);

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
        <div className="text-3xl font-bold flex flex-col sm:flex-row justify-between gap-3  items-center pr-5">
          Hello,{user.user_metadata.full_name}
          <StatusBadge status={providerStatus} />
        </div>
        <div className="pr-5 mt-5">
          <div className="border my-5 relative flex rounded-4xl shadow-md bg-white p-1">
            <div
              className={clsx(
                "absolute top-1 bottom-1 w-1/2 rounded-4xl bg-black transition-transform duration-300 ease-in-out",
                providerType === "shop" ? "translate-x-full" : "translate-x-0",
              )}
            />

            <button
              type="button"
              onClick={() => setProviderType("service")}
              className={clsx(
                "relative z-10 w-1/2 px-6 py-3 transition-colors duration-300 cursor-pointer",
                providerType === "service" ? "text-white" : "text-black",
              )}
            >
              Service
            </button>

            <button
              type="button"
              onClick={() => setProviderType("shop")}
              className={clsx(
                "relative z-10 w-1/2 px-6 py-3 transition-colors duration-300 cursor-pointer",
                providerType === "shop" ? "text-white" : "text-black",
              )}
            >
              Shop
            </button>
          </div>
          {providerType === "service" ? (
            ""
          ) : (
            <>
              <div className="py-2">
                <InputField
                  label="Shop Name"
                  id="shopName"
                  type="text"
                  value={businessName}
                  input={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div className="text-sm text-gray-600">
                Note:- All the below data should belongs to shop owner
              </div>
            </>
          )}
          <div className="my-3">
            <InputField
              type="text"
              label="NIC"
              id="nic"
              value={nic}
              input={nic}
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
                <InputField
                  type="number"
                  label="Mobile Number"
                  id="mobileNumber"
                  value={mobile}
                  input={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="w-full">
                <InputField
                  type="number"
                  label="Whatsapp Number"
                  id="whatsappNumber"
                  value={whatsappNumber}
                  input={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="">
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
          </div>
          <div className="my-4">
            Note:-
            <br />
            To be eligibale to become a seller you have to fill all the details
            in this form. After review from our team we will publish you as a
            seller.
            <br />
            Thank you
          </div>
          <div className="my-3 mb-10">
            <div>
              <RippleButton
                onClick={() => setShowPopup(true)}
                textColor="text-white"
                className="w-full p-4 bg-blue-700 hover:bg-blue-600"
              >
                Submit
              </RippleButton>
              <PopUpMessage
                title="Confirm"
                content={
                  message
                    ? message
                    : "Are you sure you want to submit your information?"
                }
                buttonContent="Submit"
                open={showPopup}
                onHandleUpdate={handleSubmit}
                onClose={() => setShowPopup(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerForm;
