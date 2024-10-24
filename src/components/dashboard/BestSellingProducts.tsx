import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CardProductVertical from "./CardProductVertical";
import "../../styles/dashboard/dashboard.css"; // Import the CSS file
import { card } from "@nextui-org/react";

export const BestSellingProducts = () => {
  return (
    <>
      <div style={styles.card}>
        <h4 className="text-center title">Productos más vendidos</h4>
        <p className="text-secondary">Selecciona el rango de fechas</p>
        <div className="date-picker-container">
          <DatePicker label="Fecha de inicio" className="date-picker" />
          <DatePicker label="Fecha fecha de fin" className="date-picker" />
        </div>
        <CardProductVertical
          image="/snoopyAzul.jpg"
          title="Snoopy"
          description="El perro más fabuloso"
          price="$240.00"
          rating={4}
        />
        <CardProductVertical
          image="/snoopyAzul.jpg"
          title="Snoopy"
          description="El perro más fabuloso"
          price="$240.00"
          rating={4}
        />
      </div>
    </>
  );
};

const styles = {
  card: {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 18,
    border: "none",
    padding: 20,
    display: "inline-block",
    margin: 10,
    width: "90%",
  },
};
