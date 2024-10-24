import { BorderColor } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

export const NotFoundPage = () => {
  return (
    <div>
      <h1>¡Oops! Hilo perdido...</h1>
      <p>Parece que la página que buscas se ha enredado en algún lugar.</p>
      <p>
        Mientras la desatamos, ¿por qué no echas un vistazo a nuestras hermosas
        colecciones de crochet?
      </p>
      <Button variant="contained">Regresar </Button>
      <div style={styles.eclipse as React.CSSProperties}></div>
      <div style={styles.eclipse as React.CSSProperties}></div>
      <img src="404.png" alt="404" />
    </div>
  );
};

const styles = {
  eclipse: {
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "40px solid #402F2F",
  },
};
