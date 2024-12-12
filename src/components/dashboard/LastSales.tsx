import React, { useEffect, useState } from "react";
import LastSaleProduct from "./LastSaleProduct";
import { DashboardService } from "../../service/DashboardService";
import { IOrder } from "../../interfaces/IOrder"; // Ajusta el path si es necesario
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";

export const LastSales = () => {
  const [lastSales, setLastSales] = useState<IOrder[]>([]);
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
    return (
      <Box sx={{ width: "100%", height: 1000 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
          backgroundColor: "#fef8f8",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h4 style={{ color: "#ff6b6b", marginBottom: "10px" }}>
          {error || "No hay órdenes disponibles"}
        </h4>
        <p style={{ color: "#6b6b6b", textAlign: "center" }}>
          Parece que no hay ordenes recientes aún. ¡Intenta nuevamente más
          tarde!
        </p>
      </Box>
    );
  }

  return (
    <div className="card" style={styles.card}>
      <h4 className="text-center title">Últimas ventas</h4>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        {lastSales.map((order) => {
          const firstProduct = order.orderDetails.products[0]; 
          const product = firstProduct.item.product;
          const color = firstProduct.item.color;

          return (
            <LastSaleProduct
              key={order.id}
              imageUrl={`http://34.203.104.87:8080/${firstProduct.item.images[0].imageUri
                .split("/")
                .pop()}`}
              productName={product.productName}
              date={new Date(order.orderDate).toLocaleDateString()}
              customerName={order.orderDetails.user.fullName}
              location={`${order.orderDetails.shippingAddress.city}, ${order.orderDetails.shippingAddress.state}`}
              email={order.orderDetails.user.email}
              quantity={firstProduct.quantity}
              color={color.colorCod}
              status={order.orderState}
              amount={order.totalPrice}
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
