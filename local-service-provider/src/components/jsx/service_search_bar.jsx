import { useState } from "react";
import magnifying_glass from "../../assets/images/magnifying_glass.png";
//import search from "../../assets/images/search.png";

function ServicesBar() {
  const [inputValue, setInputVlaue] = useState("");
  const handleBlur = () => {
    setInputVlaue("");
  };
  return (
    <>
      <form action="" className="my-3">
        <div class="px-6">
          <div class="relative flex justify-center ">
            <input
              id="service"
              value={inputValue}
              onChange={(e) => setInputVlaue(e.target.value)}
              onBlur={handleBlur}
              class="
            text-lg
            w-screen peer bg-gray-100 placeholder:text-slate-400 text-slate-700
            rounded-md px-5 pt-6.5 pb-3.5 max-h-15 
            transition duration-300 ease
            selection:border-2 selection:border-black
            "
            />
            <label
              for="service"
              class="absolute cursor-text text-gray-500 font-normal bg-transparent px-3 left-3 top-4 text-lg transition-all 
          transform origin-left peer-focus:top-0
          peer-focus:left-3 peer-focus:text-s peer-focus:text-gray-500 peer-focus:scale-80 peer-focus:"
            >
              Service
            </label>
            <div className="absolute w-8 h-8 right-4 top-3">
              <a href="">
                <img src={magnifying_glass} alt="" />
              </a>
            </div>
          </div>
          <input
            className="bg-black text-white mt-4 px-7 rounded-lg h-12"
            type="submit"
            value="See services"
          />
        </div>
      </form>
    </>
  );
}

export default ServicesBar;
