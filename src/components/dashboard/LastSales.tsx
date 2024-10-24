import React from "react";
import LastSaleProduct from "./LastSaleProduct";

export const LastSales = () => {
  return (
    <>
      <div className="card" style={styles.card}>
        <h4 className="text-center title">Ultimas ventas</h4>
        <div className="d-flex justify-content-center align-items-center">
          <LastSaleProduct
            imageUrl="/pajaro.jpg"
            productName="Producto 1"
            date="12/06/2024"
            customerName="Betjader Ortiz Delgado"
            location="Santa maria ahucatitllan"
            email="betjaderxd@gmail.com"
            quantity={2}
            color="#F294A5"
            status="Entregado"
            amount={1200}
          />
        </div>
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
    width: "99%",
  },

  visits: {
    marginLeft: "auto",
  },
};
