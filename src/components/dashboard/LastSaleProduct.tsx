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
  return (
    <div style={styles.card}>
      <div className="d-flex" style={styles.container}>
        <div style={styles.imageContainer}>
          <img src={imageUrl} alt="imagen" style={styles.img} />
        </div>
        <div style={styles.details}>
          <div style={styles.productInfo}>
            <div className="text-semibold">{productName}</div>
            <div className="text-pink">{date}</div>
          </div>
          <div
            className="d-flex justify-content-between align-items-center"
            style={styles.additionalInfo}
          >
            <p className="text-wine">{customerName}</p>
            <p className="text-pink">{location}</p>
            <p className="text-pink">{email}</p>
            <div className="d-flex align-items-center">
              <ColorCircle color={color} />
            </div>
            <p className="text-pink">{quantity}</p>
            <Chip variant="flat" color="success">
              {status}
            </Chip>
            <p className="text-success">+ ${amount}</p>
          </div>
        </div>
      </div>
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
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  imageContainer: {
    flex: "0 0 100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    objectFit: "cover" as const,
  },
  details: {
    flex: "1",
    paddingLeft: "16px",
  },
  productInfo: {
    marginBottom: "12px",
  },
  additionalInfo: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "16px",
  },
};
