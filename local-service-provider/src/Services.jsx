import Header from "./components/jsx/header";
import ServiceCard from "./components/jsx/services_card";
import Footer from "./components/jsx/footer";
import SearchField from "./components/jsx/SearchField";
import { useState } from "react";

function Services() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className=" pt-20 flex flex-col min-h-screen">
        <Header />
        <div className="w-full flex justify-center">
          <div className="my-5 w-full max-w-7xl ">
            <div className="md:flex justify-center relative w-full">
              <div className="">
                <SearchField value={selected} onChange={setSelected} />
              </div>
              <div className="flex md:flex-col flex-row md:absolute justify-center md:gap-0 gap-3 mt-5 md:mt-0 right-10 ">
                <div className="flex items-center gap-2">
                  <div>Close</div>
                  <span class="relative flex size-3">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span class="relative inline-flex size-3 rounded-full bg-red-500"></span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div>Open</div>
                  <span class="relative flex size-3">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75"></span>
                    <span class="relative inline-flex size-3 rounded-full bg-lime-500"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grow flex justify-center bg-[#F9F9F9]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-112.5 px-5 gap-2 w-full sm:max-w-7xl py-10">
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Services;
