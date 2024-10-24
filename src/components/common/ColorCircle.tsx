import React from "react";

interface ColorCircleProps {
  color: string;
}

const ColorCircle: React.FC<ColorCircleProps> = ({ color }) => {
  return <div style={{ ...styles.circle, backgroundColor: color }}></div>;
};

const styles = {
  circle: {
    width: 20,
    height: 20,
    borderRadius: "50%",
  },
};

export default ColorCircle;
