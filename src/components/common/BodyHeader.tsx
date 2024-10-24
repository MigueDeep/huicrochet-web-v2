import { Avatar } from "@mui/material";
import React from "react";

const BodyHeader = () => {
  return (
    <>
      <div style={styles.header as React.CSSProperties}>
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          className="w-20 h-20 text-large"
          style={styles.avatar}
        />
      </div>
    </>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    zIndex: 1,
    position: "sticky",
    top: 0,
  },
  avatar: {
    marginLeft: "auto", // Empuja el avatar al extremo derecho
  },
};

export default BodyHeader;
