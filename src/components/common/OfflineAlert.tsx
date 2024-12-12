import React, { useEffect, useState } from "react";
import { useNetwork } from "../../context/NetworkProvider";
import { Box, Alert, AlertTitle, Fade } from "@mui/material";

const OfflineAlert: React.FC = () => {
  const { isOffline } = useNetwork();
  const [showAlert, setShowAlert] = useState(isOffline);

  useEffect(() => {
    if (isOffline) {
      setShowAlert(true); // Mostrar alerta al perder conexión
    } else {
      const timeout = setTimeout(() => setShowAlert(false), 300); // Esconder alerta con un pequeño retraso
      return () => clearTimeout(timeout); // Limpiar el timeout si el componente se desmonta
    }
  }, [isOffline]);

  if (!showAlert) return null;

  return (
    <Fade in={isOffline} timeout={300}>
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
    </Fade>
  );
};

export default OfflineAlert;
