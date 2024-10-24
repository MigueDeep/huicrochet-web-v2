import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
interface CardStatsProps {
  title: string;
  money: number;
  data: number[];
}

export const CardIncomes: React.FC<CardStatsProps> = ({
  title,
  money,
  data,
}) => {
  return (
    <div className="card" style={styles.card}>
      <div className="header d-flex ml-2" style={styles.header}>
        <AttachMoneyIcon className="mx-1" style={{ fontSize: 22 }} />
        <p className="">{title}</p>
        <p style={styles.visits}>{money} pesos</p>
      </div>
      <LineChart
        series={[
          {
            data: data,
            color: "#00B69B",
          },
        ]}
        width={300}
        height={200}
      />
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
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  visits: {
    marginLeft: "auto",
  },
};
