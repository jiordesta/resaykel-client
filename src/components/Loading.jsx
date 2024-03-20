import React from "react";

export default function Loading({ w, h, text }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 cursor-wait z-50">
      <img
        className=""
        width={w}
        height={h}
        src="/icons/loading-animated.svg"
        alt=""
      />
      <h1 className="text-white">{text}</h1>
    </div>
  );
}
