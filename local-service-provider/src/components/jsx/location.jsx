import { useState } from "react";
import location from "../../assets/images/location.png";
import location_pin from "../../assets/images/location-pin.png";
import down_arrow from "../../assets/images/down-arrow.png";

function Location() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Location");

  const locations = [
    "Gampaha",
    "Kadawatha",
    "Colombo",
    "Mahara",
    "Kadawatha",
    "Colombo",
    "Mahara",
    "Kadawatha",
    "Colombo",
    "Mahara",
    "Kadawatha",
    "Colombo",
    "Mahara",
    "Kadawatha",
    "Colombo",
    "Mahara",
    "Kadawatha",
    "Colombo",
    "Mahara",
    "Kadawatha",
    "Colombo",
    "Mahara",
    "Kadawatha",
    "Colombo",
    "Mahara",
    "Kadawatha",
    "Colombo",
    "Mahara",
  ];
  function chooseCategory(location) {
    setSelected(location);
    setIsOpen(false);
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 justify-center items-center">
          <div className="justify-center">
            <div className="flex w-45 my-2 mt-3 rounded-4xl bg-gray-100">
              <span className="absolute ml-5 mt-3 w-6 h-6">
                <img src={location} alt="" />
              </span>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full items-center justify-between  px-13 py-3 text-left  text-black"
              >
                {selected}
              </button>
              <span
                onClick={() => setIsOpen(!isOpen)}
                className="absolute mt-4 ml-36 w-4 h-4"
              >
                <img src={down_arrow} alt="" />
              </span>
              {isOpen && (
                <ul className="absolute z-10 p-2 pr-0 mt-12 w-55 h-50 overflow-auto rounded-2xl border-transparent bg-white shadow-xl shadow-">
                  {locations.map((location) => (
                    <li
                      key={location}
                      onClick={() => chooseCategory(location)}
                      className="cursor-pointer pl-7 py-3 text-black hover:bg-gray-100"
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="text-center"> or</div>
          <div className="my-2 pl-2 flex items-center justify-center">
            <img src={location_pin} className="w-5 h-5" alt="" />
            <div className="mx-2 font-[Satoshi-Variable] font-medium underline">
              My current location
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Location;
