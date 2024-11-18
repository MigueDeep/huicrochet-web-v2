import { ProductCardBase } from "../ProductCardBase";
import { useEffect, useMemo, useState } from "react";
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

export const ProductBaseGrid = ({ onSelectProduct }: ProductBaseGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

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
          label="Búsqueda"
          placeholder="Ingresa el nombre del producto base"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
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
      ) : filteredProducts.length > 0 ? (
        <div className="product-base-grid">
          {filteredProducts.map((product) => (
          
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
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#666",
            fontSize: "1.2rem",
            padding: "2rem 0",
          }}
        >
          <p style={{ margin: 0, textAlign: "center" }}>
            ✨ No encontramos productos ✨
          </p>
          <p style={{ margin: 0, textAlign: "center" }}>
            Prueba con otro término o agrega nuevos productos 🌟
          </p>
        </div>
      )}
    </div>
  );
};
