// import carpenter from "../../assets/images/Services/pngfind.com-bob-the-builder-png-3166017.png";
// import plumber from "../../assets/images/Services/plumber.png";
// import studio from "../../assets/images/Services/studio.png";
// import electrician from "../../assets/images/Services/electrician.png";
// import gardening from "../../assets/images/Services/gardening.png";
// import supermarket from "../../assets/images/Services/supermarket.png";
import { supabase } from "./../../assets/supabase-client";
import { useEffect, useState } from "react";

function ExploreServices() {
  async function getServices() {
    const { data, error } = await supabase.from("services").select();
    if (error) {
      console.log(error);
      return;
    }
    setServices(data);
  }
  const [services, setServices] = useState([]);
  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <div className=" my-4">
        <div className="flex justify-center w-full w-max-150 px-6 text-3xl font-[Satoshi-Bold] tracking-tigh">
          Explore what you can do with LSF
        </div>
        <div className="flex justify-center">
          <div className="text-[10px] grid grid-cols-3 sm:grid-cols-3 sm:text-2xl md:grid-cols-4 max-w-250">
            {services.map((service) => (
              <div className="aspect-square  bg-gray-100 text-center m-2 p-2 rounded-2xl">
                <div className="flex justify-center">
                  <img
                    src={service.service_logo}
                    alt=""
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div className="text-center">{service.service_name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ExploreServices;
