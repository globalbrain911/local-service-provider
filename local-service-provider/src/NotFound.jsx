import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-4xl">Page Not Found</h1>
        <Link to={"/"}>
          <button className="text-lg bg-gray-300 p-2 px-5 rounded-3xl mt-4 hover:bg-gray-400">
            Go back home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
