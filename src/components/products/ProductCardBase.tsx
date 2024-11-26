import { HiloIConBlack } from "../../utils/icons";
import "../../styles/products/products.css";
interface ProductCardBaseProps {
  title: string;
  onSelect: () => void;
  isSelected: boolean;
  isDisabled: boolean;
}

export const ProductCardBase = ({
  title,
  onSelect,
  isSelected,
  isDisabled,
}: ProductCardBaseProps) => {
  return (
    <div
      className={`product-card ${isSelected ? "selected" : ""} ${
        isDisabled ? "disabled" : ""
      }`}
      onClick={!isDisabled ? onSelect : undefined}
    >
      <div className="text-center">
        <div className="d-flex align-items-center justify-center">
          <HiloIConBlack />
        </div>
        <p className="text-semibold text-pink">{title}</p>
        {isDisabled && <p className="text-disabled">Producto no disponible</p>}
      </div>
    </div>
  );
};
