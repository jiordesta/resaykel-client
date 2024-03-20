import React, { useEffect } from "react";

export default function CustomModal({ children, show, setShow }) {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);
  if (show) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 p-4 z-40 flex flex-col justify-center items-center">
        <div className="w-full relative lg:w-1/4 flex flex-col gap-2 bg-white border border-color1 p-2 rounded-lg drop-shadow-lg">
          <img
            src="/icons/close-modal.svg"
            className="absolute -right-4 -top-4 z-50"
            width={35}
            alt=""
            onClick={() => setShow(false)}
          />
          {children}
        </div>
      </div>
    );
  } else {
    return;
  }
}
