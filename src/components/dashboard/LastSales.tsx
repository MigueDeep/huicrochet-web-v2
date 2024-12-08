import React, { useEffect, useState } from "react";
import LastSaleProduct from "./LastSaleProduct";
import { DashboardService } from "../../service/DashboardService";
import { IOrder } from "../../interfaces/IOrder"; // Ajusta el path si es necesario

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
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="card" style={styles.card}>
      <h4 className="text-center title">Últimas ventas</h4>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        {lastSales.map((order) => {
          const firstProduct = order.orderDetails.products[0]; // Primer producto en la orden
          const product = firstProduct.item.product;
          const color = firstProduct.item.color;

          return (
            <LastSaleProduct
              key={order.id}
              imageUrl={`http://localhost:8080/${firstProduct.item.images[0].imageUri
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
