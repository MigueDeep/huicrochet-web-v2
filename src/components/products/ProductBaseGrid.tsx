import { ProductCardBase } from "./ProductCardBase";
import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../../styles/products/products.css";

export interface Product {
  title: string;
  category: string;
  price: number;
  description: string;
}

interface ProductBaseGridProps {
  onSelectProduct: (product: Product | null) => void;
}

export const ProductBaseGrid = ({ onSelectProduct }: ProductBaseGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      title: "Producto base 1",
      category: "Categoría 1",
      price: 100,
      description: "Descripción del producto base 1",
    },
    {
      title: "Producto base 2",
      category: "Categoría 2",
      price: 200,
      description: "Descripción del producto base 2",
    },
  ];

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
      <div className="product-base-grid">
        {products.map((product) => (
          <ProductCardBase
            key={product.title}
            title={product.title}
            onSelect={() => handleSelectProduct(product)}
            isSelected={selectedProduct?.title === product.title}
          />
        ))}
      </div>
    </div>
  );
};
