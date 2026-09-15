import { useState } from "react";
import location from "../../assets/images/location.png";

function Location() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Choose city");

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
      <div className="flex justify-center tracking-wide">
        <div className="bg-mber-800 flex">
          <div className="pl-2 flex items-center justify-center bgmber-400">
            <img src={location} className="w-5 h-5" alt="" />
            <div className="font-[Satoshi-Variable] font-medium text-[16px] mx-2">
              Colombo,
            </div>
          </div>
          <div className="bg-mber-300">
            <div className="flex max-w-25 text-[16px]">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full items-center justify-between py-1 text-left underline underline-offset-2 text-black"
              >
                {selected}
              </div>
              {isOpen && (
                <ul className="absolute z-10 -ml-12.5 p-2 pr-0 mt-12 w-50 h-60 overflow-auto rounded-2xl border-transparent bg-white shadow-xl">
                  {locations.map((location) => (
                    <li
                      key={location}
                      onClick={() => chooseCategory(location)}
                      className="cursor-pointer pl-7 py-3 text-[16px]  text-black hover:bg-gray-100"
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Location;
