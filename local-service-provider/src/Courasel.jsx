import { useState } from "react";

function Courasel() {
  const images = [
    "https://images.pexels.com/photos/17112932/pexels-photo-17112932.jpeg",
    "https://images.pexels.com/photos/30469973/pexels-photo-30469973.jpeg",
    "https://images.pexels.com/photos/12252924/pexels-photo-12252924.jpeg",
    "https://images.pexels.com/photos/30469973/pexels-photo-30469973.jpeg",
    "https://images.pexels.com/photos/12252924/pexels-photo-12252924.jpeg",
  ];
  const [selected, setSelected] = useState(0);
  return (
    <>
      <div className="w-full my-3">
        <div className="w-full">
          <div className="bg-black w-full h-70 sm:h-90 md:h-130 lg:h-160 flex justify-center">
            <img src={images[selected]} className="object-fill" alt="" />
          </div>
          <div className="w-full">
            <div className="flex overflow-auto  gap-2 my-2 md:gap-3">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="h-20 md:h-40 flex-none bg-amber-100"
                >
                  <img
                    onClick={() => setSelected(index)}
                    src={image}
                    className="object-fill w-full h-full cursor-pointer"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Courasel;
