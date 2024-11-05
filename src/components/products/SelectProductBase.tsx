import { Button } from "@mui/material";
import { Card, CardBody, Divider } from "@nextui-org/react";
import { ProductosIconBlack } from "../../utils/icons";

export const SelectProductBase = () => {
  return (
    <>
      <div className="d-flex">
        <div className="flex-grow-1">
          <h5 className="text-2xl ">Productos base</h5>
        </div>
        <div className="flex justify-end">
          <Button variant="contained">Añadir producto base</Button>
        </div>
      </div>

      <div className="d-flex gap-2  mb-0">
        <Card className="max-w-[400px]">
          <CardBody className="flex gap-1">
            <div className="flex flex-col">
              <div className="flex items-center justify-center gap-1">
                <ProductosIconBlack />
                <p className="align-self-center">Producto</p>
              </div>
              <p className="text-small text-default-500">Juegetes</p>
              <p className="text-small text-pink text-default-500">240$</p>
              <Divider className="mt-0" />
              <p>Descripccion</p>
            </div>
            <Button variant="contained" color="secondary">
              Seleccionar
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
