import { Button } from "@mui/material";
import { Product, ProductBaseGrid } from "./ProductBaseGrid";
import AddIcon from '@mui/icons-material/Add';

interface SelectProductBaseProps {
  onSelectProduct: (product: Product | null) => void;
}

export const SelectProductBase = ({
  onSelectProduct,
}: SelectProductBaseProps) => {
  return (
    <>
      <div className="d-flex">
        <div className="flex-grow-1">
          <h5 className="text-2xl">Productos base</h5>
        </div>
        <div className="flex justify-end">
          <Button startIcon={<AddIcon />} variant="contained">
            Añadir producto base
          </Button>
        </div>
      </div>
      <ProductBaseGrid onSelectProduct={onSelectProduct} />
    </>
  );
};
