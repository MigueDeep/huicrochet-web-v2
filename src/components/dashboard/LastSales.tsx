import React, { useEffect, useState } from "react";
import LastSaleProduct from "./LastSaleProduct";
import { DashboardService } from "../../service/DashboardService";
import { Datum } from "../../interfaces/OrderInterfaceStats/ILastOrders";

export const LastSales = () => {
  const [lastSales, setLastSales] = useState<Datum[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchLastSales = async () => {
    setLoading(true);
    try {
      const response = await DashboardService.getLastOrders();
      if (response?.data) {
        setLastSales(response.data);
      } else {
        throw new Error("No se encontraron datos de ventas.");
      }
    } catch (err) {
      setError("Error al cargar las últimas ventas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLastSales();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="card" style={styles.card}>
      <h4 className="text-center title">Últimas ventas</h4>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        {lastSales.map((sale) => {
          const cartItem = sale.shoppingCart.cartItems[0];
          const product = cartItem.item.product;
          const color = cartItem.item.color;

          return (
            <LastSaleProduct
              key={sale.id}
              imageUrl={`http://localhost:8080/${cartItem.item.images[0].imageUri
                .split("/")
                .pop()}`}
              productName={product.productName}
              date={new Date(sale.orderDate).toLocaleDateString()}
              customerName="Nombre del cliente" // Actualiza según los datos si están disponibles
              location="Ubicación" // Actualiza según los datos si están disponibles
              email="Correo" // Actualiza según los datos si están disponibles
              quantity={cartItem.quantity}
              color={color.colorCod}
              status={sale.orderState}
              amount={sale.totalPrice}
            />
          );
        })}
      </div>
    </div>
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
};
