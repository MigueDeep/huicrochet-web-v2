import React from "react";
import { UsersIcon } from "../../utils/icons";
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
      <div
        className="body d-flex justify-content-center align-items-center mb-4"
        style={styles.container}
      >
        <img src={imageUrl} alt="imagen" style={styles.img} />
        <div className="ml-2 d-flex flex-column m-4">
          <div className="text-semibold">{productName}</div>
          <div className="text-pink">{date}</div>
        </div>
        <div className="d-flex justify-content-center align-items-start gap-4 m-4">
          <p className="text-pink mr-3">{customerName}</p>
          <p className="text-pink mr-3">{location}</p>
          <p className="text-pink mr-3">{email}</p>
          <ColorCircle color={color} />

          <p className="text-pink mr-3">{quantity}</p>
          <Chip className="mr-3" variant="flat" color="success">
            {status}
          </Chip>
          <p className="text-success mr-3">+ ${amount}</p>
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
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    boxSizing: "border-box" as const,
  },
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
};
