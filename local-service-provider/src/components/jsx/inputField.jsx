import clsx from "clsx";
import { useState } from "react";

function InputField({ label, id, type, input = "", ...props }) {
  const [click, setClick] = useState(false);

  return (
    <>
      <div class="relative">
        <div className="relative">
          <input
            onBlur={() => setClick(true)}
            id={id}
            type={type}
            placeholder=" "
            className={clsx(
              "peer focus:border block w-full appearance-none rounded-2xl border border-black  px-5 pt-6 pb-2 text-lg text-black focus:border-blue-500 focus:outline-none focus:ring-0",
              {
                "bg-red-50 focus:bg-white border-red-600": click && !input,
              },
            )}
            {...props}
          />
          <label
            htmlFor={id}
            className={clsx(
              "font-light absolute inset-s-5 top-4 z-10 origin-left -translate-y-3 scale-75 transform text-lg text-black duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-black",
              {
                "peer-focus:text-red-600 text-red-600": click && !input,
              },
            )}
          >
            {label}
          </label>
        </div>
        {click && !input ? (
          <div className="text-xs pl-2 pt-3 text-red-600 tracking-wide font-thin flex items-center gap-1">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 8V12"
                  stroke="#db1414"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M12 16.0195V16"
                  stroke="#db1414"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#db1414"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></circle>{" "}
              </g>
            </svg>{" "}
            Enter your {label}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default InputField;
