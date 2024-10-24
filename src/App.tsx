import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F294A5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#823038",
      contrastText: "#fff",
    },
    info: {
      main: "#D989B5",
      contrastText: "#fff",
    },
    warning: {
      main: "#402F2F",
      contrastText: "#fff",
    },
    error: {
      main: "#EF3826",
      contrastText: "#fff",
    },
    success: {
      main: "#00B69B",
      contrastText: "#fff",
    },
    background: {
      default: "#F2F2F2",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <NextUIProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </NextUIProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
