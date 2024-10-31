import { Button } from "@mui/material";

export const SelectProductBase = () => {
  return (
    <>
      <div className="d-flex">
        <div className="flex-grow-1">
          <h5 className="text-2xl ">Productos base</h5>
        </div>
        <div className="flex justify-end">
          <Button variant="contained">Añadir producto</Button>
        </div>
      </div>
    </>
  );
};
