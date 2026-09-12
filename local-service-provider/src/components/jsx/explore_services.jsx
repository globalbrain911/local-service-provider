function ExploreServices() {
  const services = [
    [
      "plumbing",
      "https://i.pinimg.com/1200x/b8/60/0b/b8600b10db76e6939e1c478067642ae7.jpg",
    ],
    [
      "carpenter",
      "https://i.pinimg.com/1200x/b8/60/0b/b8600b10db76e6939e1c478067642ae7.jpg",
    ],
    [
      "communication",
      "https://i.pinimg.com/1200x/b8/60/0b/b8600b10db76e6939e1c478067642ae7.jpg",
    ],
    [
      "Electitians",
      "https://i.pinimg.com/1200x/b8/60/0b/b8600b10db76e6939e1c478067642ae7.jpg",
    ],
    [
      "gardening",
      "https://i.pinimg.com/1200x/b8/60/0b/b8600b10db76e6939e1c478067642ae7.jpg",
    ],
    [
      "food city",
      "https://i.pinimg.com/1200x/b8/60/0b/b8600b10db76e6939e1c478067642ae7.jpg",
    ],
  ];
  return (
    <>
      <div className=" my-4">
        <div className="flex justify-center w-full w-150 px-6 text-3xl font-[Satoshi-Bold] tracking-tigh">
          Explore what you can do with LSF
        </div>
        <div className="flex justify-center">
          <div className="text-[10px] grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 max-w-250">
            {services.map((service) => (
              <div className="aspect-square  bg-gray-100 text-center m-2 p-2 rounded-2xl">
                <div className="flex justify-center">
                  <img
                    src={service[1]}
                    alt=""
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div className="text-center">{service[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ExploreServices;
