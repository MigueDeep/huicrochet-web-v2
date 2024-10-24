import React from "react";
import { CardIncomes } from "./CardIncomes";

const Incomes = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "16px", // Ajusta el valor según la separación deseada
        width: "100%", // Asegura que el contenedor abarque el 100% del ancho
      }}
    >
      <CardIncomes
        title="Ingresos diarios"
        money={33}
        data={[2, 5.5, 2, 8.5, 1.5, 5]}
      />
      <CardIncomes
        title="Ingresos semanales"
        money={210}
        data={[2, 5.5, 2, 8.5, 1.5, 5]}
      />
      <CardIncomes
        title="Ingresos mensuales"
        money={900}
        data={[2, 5.5, 2, 8.5, 1.5, 5]}
      />
      <CardIncomes
        title="Ingresos anuales"
        money={12000}
        data={[2, 5.5, 2, 8.5, 1.5, 5]}
      />
    </div>
  );
};

export default Incomes;
