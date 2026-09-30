import image from "../assets/images/image.png";

function PrivacyAndData() {
  return (
    <>
      <div className="max-w-200 pl-10 pt-10">
        <div className="text-3xl font-bold">Privacy & Data</div>
        <div className="my-5 flex justify-center">
          <div className="w-25 my-2">
            <img src={image} className="rounded-full" alt="" />
          </div>
        </div>
        <div className="pr-5">
          <div className="">
            <div className="text-lg">Name</div>
            <div className="grid grid-cols-2">
              <div className="pr-1 py-3">
                <input
                  className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                  type="text"
                  placeholder="Ramika"
                />
              </div>
              <div className="pl-1 py-3">
                <input
                  className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                  type="text"
                  placeholder="Randiv"
                />
              </div>
            </div>
          </div>
          <div>
            <div>Phone number</div>
            <div className="py-3">
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="text"
                placeholder="0714452832"
              />
            </div>
          </div>
          <div>
            <div>Email</div>
            <div className="py-3">
              <input
                className="border-none bg-slate-200 p-3 px-4 w-full rounded-lg selection:border-black selection:border-2"
                type="text"
                placeholder="ramikaabeysinghe@gmail.com"
              />
            </div>
          </div>
          <div className="pr-3 py-3">
            <div className="text-lg cursor-pointer rounded-lg bg-black text-white w-full p-3 flex justify-center items-center">
              Update
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyAndData;
