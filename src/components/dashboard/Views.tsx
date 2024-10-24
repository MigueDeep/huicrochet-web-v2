import { card } from "@nextui-org/react";
import CardStats from "./CardStats";

const Views = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "16px", // Ajusta el valor según la separación deseada
        width: "100%", // Asegura que el contenedor abarque el 100% del ancho
      }}
    >
      <CardStats
        title="Visitas diarias"
        visits={33}
        data={[2, 5.5, 2, 8.5, 1.5, 5]}
      />
      <CardStats
        title="Visitas semanales"
        visits={210}
        data={[2, 5.5, 2, 8.5, 1.5, 5]}
      />
      <CardStats
        title="Visitas mensuales"
        visits={900}
        data={[2, 5.5, 2, 8.5, 1.5, 5]}
      />
      <CardStats
        title="Visitas anuales"
        visits={12000}
        data={[2, 5.5, 2, 8.5, 1.5, 5]}
      />
    </div>
  );
};

export default Views;
