import { supabase } from "./../../assets/supabase-client";
import { useEffect, useState } from "react";

function ExploreServices() {
  async function getServices() {
    const { data, error } = await supabase.from("services_main_page").select();
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
      <div className="my-4 flex justify-center">
        <div className="max-w-7xl w-full">
          <div className="px-6 lg:px-16">
            <div
              className="lg:my-10  my-5
             text-3xl lg:text-4xl font-[Satoshi-Bold] tracking-tigh"
            >
              Explore what you can do with LSF
            </div>
            <div className="">
              <div className="text-[10px] grid grid-cols-3 lg:grid-cols-3 lg:text-2xl sm:grid-cols-2">
                {services.map((service) => (
                  <div className="bg-gray-100 text-center my-2 mr-2 p-2 rounded-2xl ">
                    <div className="flex flex-col-reverse sm:flex-row">
                      <div className="text-lg sm:pl-3">
                        <div className="flex sm:justify-start justify-center tracking-tight mb-3 text-[12px]">
                          {service.service_name}
                        </div>
                        <div className="sm:text-start text-[15px] tracking-wide hidden sm:block ">
                          Lorem ipsum dolor sit adipisicing elit. Earum nam quo
                          eaque.
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <img
                          src={service.service_logo}
                          alt=""
                          className="object-contain aspect-square max-h-30 sm:w-70"
                        />
                      </div>
                    </div>
                  </div>
                ))}{" "}
                {services.map((service) => (
                  <div className="bg-gray-100 text-center  my-2 mr-2  p-2 rounded-2xl">
                    <div className="flex flex-col-reverse sm:flex-row">
                      <div className="text-lg sm:pl-3">
                        <div className="flex sm:justify-start justify-center tracking-tight mb-3 text-[12px]">
                          {service.service_name}
                        </div>
                        <div className="sm:text-start text-[15px] tracking-wide hidden sm:block ">
                          Lorem ipsum dolor sit adipisicing elit. Earum nam quo
                          eaque.
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <img
                          src={service.service_logo}
                          alt=""
                          className="object-contain aspect-square max-h-30 sm:w-70"
                        />
                      </div>
                    </div>
                  </div>
                ))}{" "}
                {services.map((service) => (
                  <div className="bg-gray-100 text-center p-2  my-2 mr-2 rounded-2xl">
                    <div className="flex flex-col-reverse sm:flex-row">
                      <div className="text-lg sm:pl-3">
                        <div className="flex sm:justify-start justify-center tracking-tight mb-3 text-[12px]">
                          {service.service_name}
                        </div>
                        <div className="sm:text-start text-[15px] tracking-wide hidden sm:block ">
                          Lorem ipsum dolor sit adipisicing elit. Earum nam quo
                          eaque.
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <img
                          src={service.service_logo}
                          alt=""
                          className="object-contain aspect-square max-h-30 sm:w-70"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExploreServices;
