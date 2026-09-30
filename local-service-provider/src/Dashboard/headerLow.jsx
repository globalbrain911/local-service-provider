import { Link } from "react-router-dom";

function HeaderLow() {
  return (
    <>
      <header className="fixed flex justify-center items-center top-0 left-0 right-0 z-999 bg-black py-4 md:p-4">
        <div className="w-full lg:pl-10">
          <div className="flex items-center justify-between">
            <div className=" text-white p-1 px-2 flex items-center justify-start">
              <Link className="text-2xl" to={"/"}>
                LSF
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeaderLow;
