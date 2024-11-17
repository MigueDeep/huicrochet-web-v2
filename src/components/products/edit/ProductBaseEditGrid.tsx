import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Importar useParams
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../../../styles/products/products.css";
import Lottie from "lottie-react";
import animationData from "../../../utils/animation.json";
import { ProductServices } from "../../../service/ProductService";
import { Datum } from "../../../interfaces/products/ProductsIterface";
import { ProductCardEditBase } from "../ProductCardEditBase";
import { ItemsService } from "../../../service/ItemsService";
import { IItem } from "../../../interfaces/Items/ItemById";

export const ProductBaseEditGrid = () => {
  const [item, setItem] = useState<IItem | null>(null);
  const [products, setProducts] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

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

  const fetchProductById = async (id: string) => {
    try {
      const itemData = await ItemsService.getById(id);
      setItem(itemData);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  return (
    <div className="col-12">
      <div className="col-6">
        <TextField
          label="Búsqueda"
          placeholder="Ingresa el nombre del producto base"
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
            loop
          />
        </div>
      ) : (
        <div className="product-base-grid">
          {products.map((product) => (
            <ProductCardEditBase
              key={product.id}
              title={product.productName}
              isSelected={item?.data.product?.id === product.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
