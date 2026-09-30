import { useEffect, useState } from "react";
import pin from "../../assets/images/pin.png";
import { supabase } from "../../assets/supabase-client";

function ServiceCard() {
  async function fetchServices() {
    const { data, error } = await supabase.from("service_providers").select();
    if (error) {
      console.log(error);
      return;
    }
    setServices(data);
  }

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <div className="flex justify-center ">
        <div className="w-7xl m-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {services.map((service) => (
            <div className="my-2 px-5 py-4 rounded-4xl bg-gray-100 ">
              <div className="">
                <div className="text-2xl text-center text-black rounded-2xl">{service.provider_name}</div>
                <div className="text-lg text-center bg-black text-white ">{service.service}</div>
                <div>
                  {service.description}
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex justify-center items-center px-4 rounded-4xl bg-white">
                    <div>{service.location}</div>
                    <span>
                      <img className="w-5 h-5 ml-2" src={pin} alt="" />
                    </span>
                  </div>
                  <div className="px-3 py-2 rounded-4xl bg-black text-white text-sm">
                    <a href=""> {service.phone_no}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ServiceCard;
