import React from "react";

interface ColorCircleProps {
  color: string;
  onSelect: (color: string) => void;
  isSelected: boolean;
  tamaño?: "small" | "medium" | "large";
}

const ColorCircle: React.FC<ColorCircleProps> = ({
  color,
  onSelect,
  isSelected,
  tamaño = "medium",
}) => {
  const baseSize = tamaño === "small" ? 20 : tamaño === "medium" ? 30 : 40;
  const size = isSelected ? baseSize * 1.2 : baseSize;

  return (
    <div
      onClick={() => onSelect(color)}
      style={{
        ...styles.circle,
        backgroundColor: color,
        border: isSelected ? "2px solid pink" : "",
        width: size,
        height: size,
      }}
    ></div>
  );
};

const styles = {
  circle: {
    borderRadius: "50%",
    cursor: "pointer",
    display: "inline-block",
    maxWidth: "100%", // Responsividad
    maxHeight: "100%", // Responsividad
    transition: "width 0.2s ease, height 0.2s ease", // Animación para que el cambio de tamaño sea suave
  },
};

export default ColorCircle;
