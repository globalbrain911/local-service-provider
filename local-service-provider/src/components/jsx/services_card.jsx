import google_map from "../../assets/svg/google_map.svg";
import whatsapp from "../../assets/svg/whatsapp.svg";
import call from "../../assets/svg/call.svg";

function ServiceCard() {
  return (
    <>
      <div className="">
        <div className="w-full h-50 shadow-lg bg-white rounded-xl relative">
          <div className="px-5">
            <div className="absolute right-0 p-4">
              <span class="relative flex size-3">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75"></span>
                <span class="relative inline-flex size-3 rounded-full bg-lime-500"></span>
              </span>
            </div>
            <div className="overflow-auto">
              <div
                className="
             mt-3 text-lg  items-center gap-4 truncate flex"
              >
                <div>Keells</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="">
                <div className="relative  items-center">
                  <div className="font-serif ">SHOP</div>
                  <div className="whitespace-nowrap overflow-x-auto scrollbar-none text-sm tracking-tight font-sarif text-[#1D1D1F] text-center">
                    [Food city] [Supermarket] [Foodcity] [Supermarket] [Food
                    city] [Supermarket] [Foodcity] [Supermarket]
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full px-5 pb-3">
            <div className="font-serif">Language - Sinhala/Tamil/Englsih</div>
            <div className="flex justify-between pb-1">
              <div className="text-sm font-serif flex">
                Call me &nbsp;- &nbsp;{" "}
                <div className="font-sans"> 0718005489</div>{" "}
              </div>
              <div className="flex gap-2">
                <img src={call} alt="" width={20} height={20} />
                <img src={whatsapp} alt="" width={25} height={25} />
              </div>
            </div>
            <div className="text-sm flex justify-between ">
              <div className="flex items-center gap-3  font-serif">
                <img src={google_map} alt="" width={13} height={13} />
                Kadawatha
              </div>
              <div className="font-serif">Distance - 2km away</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceCard;
