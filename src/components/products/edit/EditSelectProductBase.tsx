import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ProductBaseEditGrid } from "./ProductBaseEditGrid";



export const EditSelectProductBase = () => {
  const navigate = useNavigate();

  const onCreateProduct = () => {
    navigate("/products/base/create");
  };

  return (
    <>
      <div className="d-flex">
        <div className="flex-grow-1">
          <h5 className="text-2xl">Productos base</h5>
        </div>
        <div className="flex justify-end">
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={onCreateProduct}
          >
            Añadir producto base
          </Button>
        </div>
      </div>
      <ProductBaseEditGrid
       
      />
    </>
  );
};