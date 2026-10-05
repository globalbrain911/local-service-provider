import Header from "./components/jsx/header";
import ServiceCard from "./components/jsx/services_card";
import Footer from "./components/jsx/footer";
import MoreDetail from "./components/jsx/More_detail";
import cross from "./assets/images/logo/cross.png";
import { useState } from "react";

function Services() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
      <div className="mt-20">
        <Header />
        <div
          className={`${click ? "fixed w-screen h-screen p-10 flex justify-center -mt-10" : "hidden"}`}
        >
          <div className="shadow-xl bg-white shadow-gray-300 w-full h-full p-3 sm:p-10 sm:pt-0 rounded-2xl overflow-auto max-w-7xl">
            <div className="flex justify-end p-4">
              <img
                onClick={handleClick}
                className="w-4 h-4 cursor-pointer"
                src={cross}
                alt=""
              />
            </div>
            <MoreDetail />
          </div>
        </div>
        <div onClick={handleClick}>
          <ServiceCard />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Services;
