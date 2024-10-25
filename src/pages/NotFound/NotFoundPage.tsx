import { Button } from "@mui/material";
import { CSSProperties } from "react";

export const NotFoundPage = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div style={styles.container}>
        <div className="row">
          <div
            className="col d-flex flex-column align-items-start justify-content-center"
            style={{ height: "100vh" }}
          >
            <h1 className="title" style={{ fontSize: "45px" }}>
              ¡Oops! Hilo perdido...
            </h1>
            <p>
              Parece que la página que buscas se ha enredado en algún lugar.
            </p>
            <p>
              Mientras la desatamos, ¿por qué no echas un vistazo a nuestras
              hermosas colecciones de crochet?
            </p>
            <Button onClick={goBack} variant="contained">
              Regresar
            </Button>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <img
              src="404.png"
              alt="404"
              className="img-fluid"
              style={styles.img}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    overflow: "hidden",
  },
  img: {
    maxWidth: "100%",
    height: "auto",
  },
};
