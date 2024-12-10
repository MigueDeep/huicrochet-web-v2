import React from "react";
import { Chip } from "@nextui-org/react";
import ColorCircle from "../common/ColorCircle";

interface LastSaleProductProps {
  imageUrl: string;
  productName: string;
  date: string;
  customerName: string;
  location: string;
  email: string;
  quantity: number;
  color: string;
  status: string;
  amount: number;
}

const LastSaleProduct: React.FC<LastSaleProductProps> = ({
  imageUrl,
  productName,
  date,
  customerName,
  location,
  email,
  quantity,
  color,
  status,
  amount,
}) => {
  const traduceStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pendiente";
      case "PROCESSED":
        return "Procesado";
      case "SHIPPED":
        return "Enviado";
      case "DELIVERED":
        return "Entregado";
      default:
        return status;
    }
  };

  const renderColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "PROCESSED":
        return "primary";
      case "SHIPPED":
        return "secondary";
      case "DELIVERED":
        return "success";
      default:
        return "danger";
    }
  };

  return (
    <div style={styles.card}>
      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.imageCell}>
              <img src={imageUrl} alt="imagen" style={styles.img} />
            </td>
            <td style={styles.detailsCell}>
              <div style={styles.productInfo}>
                <div className="text-semibold">{productName}</div>
                <div className="text-pink">{date}</div>
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={styles.additionalInfo}
              >
                <td style={styles.td}>
                  <p className="text-wine">{customerName}</p>
                </td>
                <td style={styles.td}>
                  <p className="text-pink">{location}</p>
                </td>
                <td style={styles.td}>
                  <p className="text-pink">{email}</p>
                </td>
                <td style={styles.td}>
                  <div className="d-flex align-items-center">
                    <ColorCircle color={color} />
                  </div>
                </td>
                <td style={styles.td}>
                  <p className="text-pink">{quantity}</p>
                </td>
                <td style={styles.td}>
                  <Chip variant="flat" color={renderColor(status)}>
                    {traduceStatus(status)}
                  </Chip>
                </td>
                <td style={styles.td}>
                  <p className="text-success">+ ${amount}</p>
                </td>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LastSaleProduct;

const styles = {
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    padding: "16px",
    boxSizing: "border-box" as const,
    borderRadius: "8px",
    marginBottom: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    tableLayout: "fixed" as "fixed", // Fuerza tamaños consistentes
  },
  imageCell: {
    width: "100px",
    padding: "8px",
    verticalAlign: "top",
  },

  img: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    objectFit: "cover" as const,
  },
  detailsCell: {
    padding: "8px 16px",
    verticalAlign: "top",
    textAlign: "left" as const,
    wordWrap: "break-word" as const, // Permite dividir palabras largas
    overflowWrap: "anywhere" as const, // Opcional para mayor compatibilidad
  },
  productInfo: {
    marginBottom: "12px",
  },
  additionalInfo: {
    display: "grid", // Cambiar a grid para control consistente
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "8px", // Reduce espacio para mayor uniformidad
    alignItems: "center",
  },
  td: {
    width: "520px",
    textAlign: "center" as const,
  },
};
