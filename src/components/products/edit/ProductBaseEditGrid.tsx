import { ProductCardBase } from "../ProductCardBase";
import { useEffect, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../../../styles/products/products.css";

import Lottie from "lottie-react";
import animationData from "../../../utils/animation.json";
import { ProductServices } from "../../../service/ProductService";
import { Datum } from "../../../interfaces/products/ProductsIterface";

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
}

interface ProductBaseGridProps {
  onSelectProduct: (product: Product | null) => void;
}

export const ProductBaseEditGrid = ({
  onSelectProduct,
}: ProductBaseGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await ProductServices.getAllActive();
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelectProduct = (product: Product) => {
    const newSelection =
      selectedProduct?.title === product.title ? null : product;
    setSelectedProduct(newSelection);
    onSelectProduct(newSelection);
  };

  return (
    <div className="col-12">
      <div className="col-6">
        <TextField
          label="Busqueda"
          placeholder="Ingresa el nombre del poducto base "
          variant="outlined"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            animationData={animationData}
            style={{ width: 150, height: 150 }}
            loop={true}
          />
        </div>
      ) : (
        <div className="product-base-grid">
          {products.map((product) => (
            <ProductCardBase
              key={product.id}
              title={product.productName}
              onSelect={() =>
                handleSelectProduct({
                  id: product.id,
                  title: product.productName,
                  category: product.categories[0].name,
                  price: product.price,
                  description: product.description,
                })
              }
              isSelected={selectedProduct?.title === product.productName}
            />
          ))}
        </div>
      )}
    </div>
  );
};
