import React, { useState } from "react";

export default function ExpandableText({ limit, text }) {
  const [expand, setExpand] = useState(false);
  const displayText = expand ? text : `${text.slice(0, limit)}`;

  return (
    <p className="text-xl relative h-full">
      {displayText}
      <span className="absolute inset-0 bottom-0 h-full flex justify-center items-end">
        {!expand && (
          <button
            className="bg-black bg-opacity-5 text-color1 backdrop-blur-sm w-full underline"
            onClick={() => {
              setExpand(true);
            }}
          >
            read more
          </button>
        )}
      </span>
    </p>
  );
}
