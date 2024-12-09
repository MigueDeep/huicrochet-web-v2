import React from "react";
import { useNetwork } from "../../context/NetworkProvider";
import { Box, Typography, Alert, AlertTitle } from "@mui/material";

const OfflineAlert: React.FC = () => {
  const { isOffline } = useNetwork();

  if (!isOffline) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20, // Posición desde la parte inferior
        right: 20, // Posición desde la parte izquierda
        width: "auto",
        zIndex: 1200,
        backgroundColor: "#b5b5b5",
        textAlign: "center",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Alert severity="warning" sx={{ alignItems: "center" }}>
        <AlertTitle>Sin Conexión</AlertTitle>
        Actualmente estás desconectado de Internet. Algunas funciones pueden no estar disponibles.
      </Alert>
    </Box>
  );
};

export default OfflineAlert;
