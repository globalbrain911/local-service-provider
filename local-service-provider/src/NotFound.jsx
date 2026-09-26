import { Link } from "react-router-dom";
import Header from "./components/jsx/header";
import Footer from "./components/jsx/footer";

const NotFoundPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="">
          <Header />
        </div>
        <div className="flex-1 py-20">
          <div className="flex justify-center">
            <div>
              <h1 className="text-2xl lg:text-4xl">Page Not Found</h1>
              <div></div>
              <div className="flex justify-center items-center max-w-60 lg:text-2xl text-white rounded-lg bg-black p-3 py-4 mt-4 hover:bg-gray-400">
                <Link to={"/"}> Go back to home </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
