import pin from "../../assets/images/pin.png";

function ServiceCard() {
  const services = [
    "Malinda Saloon",
    "Sigiri hardware shop",
    "Keells",
    "Baker",
    "Thareen Baker",
    "Sigiri hardware shop",
    "Malinda Saloon",
    "Sigiri hardware shop",
    "Malinda Saloon",
    "Sigiri hardware shop",
    "Malinda Saloon",
    "Sigiri hardware shop",
    "Malinda Saloon",
    "Sigiri hardware shop",
  ];
  return (
    <>
      <div className="flex justify-center ">
        <div className="w-360 m-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {services.map((service) => (
            <div className="my-2 px-5 py-4 rounded-4xl bg-gray-100 ">
              <div className="">
                <div className="text-2xl">{service}</div>
                <div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum eum quaerat culpa quisquam dolorem
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex justify-center items-center px-4 rounded-4xl bg-gray-300">
                    <div>Location</div>
                    <span>
                      <img className="w-5 h-5 ml-2" src={pin} alt="" />
                    </span>
                  </div>
                  <div className="px-3 py-2 rounded-4xl bg-black text-white">
                    <a href=""> Call now</a>
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
