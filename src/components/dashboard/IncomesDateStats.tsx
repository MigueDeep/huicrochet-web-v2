import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LineChart } from "@mui/x-charts";
import { Dayjs } from "dayjs";
import { DashboardService } from "../../service/DashboardService";
import { IRevenuesRange } from "../../interfaces/Dashboard/RevuenesInterface";

export const IncomeDateStats = () => {
  const today = dayjs();
  const [startDate, setStartDate] = useState<Dayjs | null>(today);
  const [endDate, setEndDate] = useState<Dayjs | null>(today);
  const [viewStats, setViewStats] = useState<IRevenuesRange | null>({
    data: {
      title: "",
      revenues: 0,
      data: [],
    },
    error: false,
    status: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async (
    formattedStartDate: string,
    formattedEndDate: string
  ) => {
    try {
      const response = await DashboardService.getIncomesStatsInRange(
        formattedStartDate,
        formattedEndDate
      );
      setViewStats(response);
      setError(null);
    } catch (err: any) {
      setError("Error al obtener los datos. Por favor, intenta nuevamente.");
      setViewStats({
        data: {
          title: "",
          revenues: 0,
          data: [],
        },
        error: false,
        status: "",
        message: "",
      });
    }
  };

  useEffect(() => {
    const formattedStartDate = today.subtract(1, "days").format("YYYY-MM-DD");
    const formattedEndDate = today.subtract(1, "days").format("YYYY-MM-DD");
    fetchStats(formattedStartDate, formattedEndDate);
  }, []); // Ejecuta solo una vez al montar el componente

  const handleStartDateChange = (newDate: Dayjs | null) => {
    setStartDate(newDate);
    setEndDate(null);
    setViewStats({
      data: {
        title: "",
        revenues: 0,
        data: [],
      },
      error: false,
      status: "",
      message: "",
    });
    setError(null);
  };

  const handleEndDateChange = (newDate: Dayjs | null) => {
    setEndDate(newDate);

    if (startDate && newDate) {
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedEndDate = newDate.format("YYYY-MM-DD");

      fetchStats(formattedStartDate, formattedEndDate);
    }
    setError(null);
  };

  return (
    <div className="card" style={styles.card}>
      <div
        className="header text-wine text-semibold d-flex ml-2"
        style={styles.header}
      >
        Ingresos por rangos de fecha
      </div>
      <p className="text-secondary">Selecciona el rango de fechas</p>
      <div
        className="date-picker-container mb-2"
        style={styles.datePickerContainer}
      >
        <DatePicker
          label="Fecha de inicio"
          value={startDate}
          onChange={handleStartDateChange}
          maxDate={today}
        />
        <DatePicker
          label="Fecha de fin"
          value={endDate}
          onChange={handleEndDateChange}
          disabled={!startDate}
          minDate={startDate || undefined}
          maxDate={today}
        />
      </div>
      {error && <p className="text-danger text-center">{error}</p>}
      {viewStats && (
        <>
          <p className="text-semibold text-center">
            {viewStats.data.revenues} Pesos
          </p>
          <div className="d-flex justify-content-center">
            <LineChart
              series={[
                {
                  data: viewStats.data.data,
                  color: "#00B69B",
                },
              ]}
              width={500}
              height={300}
            />
          </div>
        </>
      )}
    </div>
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
    gap: "10px",
  },
};
