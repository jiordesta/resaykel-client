import React, { useState } from "react";

export default function Image({ image, style }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className={style}>
      <img
        src={`${imgLoaded ? image : "/icons/img-loader.svg"}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onLoad={() => setImgLoaded(true)}
      />
    </div>
  );
}
