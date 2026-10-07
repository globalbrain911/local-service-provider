import { useState } from "react";
import magnifying_glass from "../../assets/images/magnifying_glass.png";
import Location from "./location";
import mainimage from "../../assets/images/main_page_image.jpg";
import { Link } from "react-router-dom";
//import search from "../../assets/images/search.png";

function ServicesBar() {
  const [inputValue, setInputVlaue] = useState("");
  const [hasBeenSelected, setHasBeenSelected] = useState(false);
  return (
    <>
      <div className="flex justify-center ">
        <div className="max-w-7xl w-full grid lg:grid-cols-2">
          <div className="my-3 lg:pl-10 bg-ambe-500 flex justify-start items-center">
            <div className="">
              <div className="bg-amber-40 flex justify-between items-center px-5">
                <Location />
              </div>
              <form action="">
                <div className=" grid-cols-2">
                  <div class="px-6 ">
                    <div className="my-5">
                      <div className="text-4xl font-[Satoshi-Bold] tracking-tighter">
                        Search any service with LSF
                      </div>
                    </div>
                    <div className="">
                      <div class="relative flex justify-center max-w-100">
                        <input
                          id="service"
                          value={inputValue}
                          onChange={(e) => setInputVlaue(e.target.value)}
                          onFocus={() => setHasBeenSelected(true)}
                          class="
            text-lg w-full peer bg-gray-100 shadow-md placeholder:text-slate-400 text-slate-700
            rounded-md px-5 pt-6.5 pb-3.5 max-h-15 
            transition duration-300 ease
            selection:border-2 selection:border-black
            "
                        />
                        <label
                          for="service"
                          class={`absolute cursor-text text-gray-500 bg-transparent transition-all transform origin-left px-3 
                ${hasBeenSelected ? "top-0 left-3 text-s text-gray-500 scale-80 " : " font-normal left-3 top-4 text-lg "}
                  `}
                        >
                          Service
                        </label>
                        <div className="absolute w-8 h-8 right-4 top-3">
                          <a href="">
                            <img src={magnifying_glass} alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <input
                        className="bg-black text-white mt-4 px-7 rounded-lg h-12"
                        type="submit"
                        value="See services"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-center hidden lg:block p-8">
            <img className="object-contain" src={mainimage} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesBar;
