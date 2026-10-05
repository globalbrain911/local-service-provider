function MoreDetail() {
  return (
    <>
      <div className="flex flex-col  sm:flex-row justify-between items-center ">
        <div className="text-3xl text-center font-[Satoshi-BlackItalic]">
          Malinda Saloon
        </div>
        <div class="max-w-40 flex justify-between items-center  bg-green-700 shadow-lg shadow-green-700/50  text-white px-3 py-2 rounded-2xl">
          <div>Open</div>
          <div className="ml-3 bg-white rounded-full w-3 h-3"></div>
        </div>
        <div class="hidden max-w-40 flex justify-between items-center  bg-red-700 shadow-lg shadow-red-700/50  text-white px-3 py-2 rounded-2xl">
          <div>Close</div>
          <div className="ml-3 bg-white rounded-full w-3 h-3"></div>
        </div>
      </div>
      <div className="mt-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum,
        inventore? Ab, voluptates. Cupiditate ab fuga iure, excepturi molestias
        atque necessitatibus?
      </div>
      <div className="md:flex w-full">
        <div className="flex mt-4 overflow-auto w-full">
          <div className="flex border  rounded-xl min-w-65">
            <div className="p-4 w-full">
              <div className="flex justify-between text-lg font-bold">
                <div>Day</div>
                <div>Opening hours</div>
              </div>
              <div className="flex justify-between">
                <div>Sunday</div>
                <div>5.00 am - 7.00 pm</div>
              </div>
              <div className="flex justify-between">
                <div>Monday</div> <div>5.00 am - 7.00 pm</div>
              </div>
              <div className="flex justify-between">
                <div>Tuesday</div> <div>5.00 am - 7.00 pm</div>
              </div>
              <div className="flex justify-between bg-gray-300">
                <div>Wednesday</div> <div>5.00 am - 7.00 pm</div>
              </div>
              <div className="flex justify-between">
                <div>Thursday</div> <div>5.00 am - 7.00 pm</div>
              </div>
              <div className="flex justify-between">
                <div>Friday</div> <div>5.00 am - 7.00 pm</div>
              </div>
              <div className="flex justify-between">
                <div>Saturday</div> <div>Closed</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 w-full">
          <div className="text-xl font-bold my-2">Packages</div>
          <div className="border p-2 rounded-lg">
            <div className="flex justify-between bg-gray-700 text-white">
              <div>Name</div>
              <div>Price(LKR)</div>
            </div>
            <div className="">
              <div className="text-center bg-gray-300">Men </div>
            </div>
            <div className="flex justify-between">
              <div>Shade</div>
              <div>750.00</div>
            </div>
            <div className="flex justify-between">
              <div>Beard trim</div>
              <div>500.00</div>
            </div>
            <div className="flex justify-between">
              <div>Box cut</div>
              <div>600.00</div>
            </div>
            <div>
              <div className="text-center bg-gray-300">Women</div>
            </div>
            <div className="flex justify-between">
              <div>Nail</div>
              <div>1000.00</div>
            </div>
            <div className="flex justify-between">
              <div>Eye brows</div>
              <div>500.00</div>
            </div>
            <div className="flex justify-between">
              <div>Make up</div>
              <div>400.00</div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}

export default MoreDetail;
