import { useState } from "react";
import Avatar from "@mui/material/Avatar";

export const HoverableAvatar = ({ src, alt }: { src: string; alt: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        zIndex: isHovered ? 1000 : "auto",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar
        alt={alt}
        src={src}
        style={{
          width: "50px",
          height: "50px",
          transition: "transform 0.3s ease",
          transform: isHovered ? "scale(2.2)" : "scale(1)",
          zIndex: isHovered ? 1000 : "auto",
        }}
      />
    </div>
  );
};
