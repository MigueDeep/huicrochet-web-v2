import { HiloIConBlack } from "../../utils/icons";
import "../../styles/products/products.css";
interface ProductCardBaseProps {
  title: string;
  isSelected: boolean;
}

export const ProductCardEditBase = ({
  title,
  isSelected,
}: ProductCardBaseProps) => {
  return (
    <div
      className={`product-card ${isSelected ? "selected" : ""}`}
     
    >
      <div className="text-center">
        <div className="d-flex align-items-center justify-center">
          <HiloIConBlack />
        </div>
        <p className="text-semibold text-pink">{title}</p>
      </div>
    </div>
  );
};
