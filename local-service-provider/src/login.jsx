import Google from "./assets/images/logo/google.png";
import { Link } from "react-router-dom";

function Login() {
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
      <div className="flex justify-center items-center p-4 w-screen h-screen pt-10">
        <div className="w-full sm:w-87.5">
          <div className="text-3xl">Log in with your phone</div>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                placeholder="Enter phone number or email"
                className="bg-gray-100 w-full selected:border-2 rounded-lg px-3 py-3"
              />
            </div>
            <div className="my-3 bg-black text-white w-full selected:border-2 rounded-lg p-3 text-center">
              Continue
            </div>
            <div className="my-3 flex items-center">
              <hr className="grow" />
              <span className="mx-2">or</span> <hr className="grow" />
            </div>
            <div className="p-3 w-full text-center bg-taupe-200 rounded-lg">
              <div className="flex justify-center">
                <div className="w-5">
                  <img className="object-contain" src={Google} alt="" />
                </div>
                <div className="ml-2 text-[17px]">Continue with Google</div>
              </div>
            </div>
            <div className="my-3 bg-black text-white w-full selected:border-2 rounded-lg p-3 text-center">
              <Link to="/Signin"> Sign in</Link>
            </div>
            <div className="mt-5 text-gray-700 text-sm tracking-wide">
              If you haven't registered yet, you can create a new account with
              Sign in option.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
