import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LineChart } from "@mui/x-charts";

export const ViewsDateStats = () => {
  return (
    <>
      <div className="card" style={styles.card}>
        <div
          className="header text-wine text-semibold d-flex ml-2"
          style={styles.header}
        >
          Vistas por rangos de fecha
        </div>
        <p className="text-secondary">Selecciona el rango de fechas</p>
        <div
          className="date-picker-container mb-2"
          style={styles.datePickerContainer}
        >
          <DatePicker label="Fecha de inicio" />
          <DatePicker label="Fecha fecha de fin" />
        </div>
        <p className="text-semibold text-center">140 vistas</p>
        <div className="d-flex justify-content-center">
          <LineChart
            series={[
              {
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                color: "#823038",
              },
            ]}
            width={500}
            height={300}
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
    margin: 10,
  },
  header: {
    display: "flex",
    justifyContent: "center",
  },
  datePickerContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px", // Add gap between DatePickers
  },
};
