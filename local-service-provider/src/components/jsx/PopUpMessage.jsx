import { createPortal } from "react-dom";
import { useEffect } from "react";

export function PopUpMessage({
  title,
  content,
  buttonContent,
  open,
  onClose,
  onHandleUpdate,
  ...props
}) {
  // close on Escape + lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null; // safe: all hooks are above this line

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose} // click on backdrop closes
    >
      <div
        className="relative w-full max-w-xl rounded-xl bg-white text-gray-700 shadow-xl"
        onClick={(e) => e.stopPropagation()} // clicks inside don't close
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6">
          <div className="flex w-full justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-lg text-2xl text-black hover:bg-gray-900/10 active:bg-gray-900/20"
              aria-label="Close"
            >
              X
            </button>
          </div>
          <div className="text-center px-6">
            <h4 className="text-2xl text-black font-semibold mb-6 mt-4">
              {title}
            </h4>
            <p className="text-[20px] font-normal text-black" {...props}>
              {content}
            </p>
            <button
              onClick={onHandleUpdate}
              type="button"
              className="cursor-pointer mt-8 py-3.5 px-7 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold uppercase shadow-md hover:shadow-lg"
            >
              {buttonContent}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default PopUpMessage;
