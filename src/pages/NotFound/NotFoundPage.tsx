import { Button } from "@mui/material";
import { CSSProperties } from "react";

export const NotFoundPage = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div style={styles.container}>
        <div style={{ ...styles.circle, ...styles.bottomLeftCircle }}></div>
        <div style={{ ...styles.circle, ...styles.middleRightCircle }}></div>
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
    position: "relative",
    backgroundColor: "#f0f0f0",
  },
  img: {
    maxWidth: "100%",
    height: "auto",
  },
  circle: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    border: "50px solid #402F2F",
  },
  bottomLeftCircle: {
    bottom: 0,
    left: 0,
    transform: "translate(-50%, 50%)",
  },
  middleRightCircle: {
    top: "50%",
    right: 0,
    transform: "translate(50%, -50%)",
  },
};
