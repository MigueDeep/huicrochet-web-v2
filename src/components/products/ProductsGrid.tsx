import { useState, useEffect } from "react";
import { ProductCardGrid } from "./ProductCardGrid";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ItemsService } from "../../service/ItemsService";
import { Datum } from "../../interfaces/Items/ItemsInterface";
import Lottie from "lottie-react";
import animationData from "../../utils/animation.json";

export const ProductsGrid = () => {
  const [products, setProducts] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await ItemsService.getAll();
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="col-6 mb-2">
        <TextField
          label="Busqueda"
          placeholder="Ingresa el nombre del producto"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="row text-center">
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
            }}
          >
            <Lottie
              animationData={animationData}
              style={{ width: 150, height: 150 }}
              loop={true}
            />
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="mb-4 col-12 col-sm-6 col-md-3">
              <ProductCardGrid
                image={
                  `http://localhost:8080/${product.images[0].imageUri
                    .split("/")
                    .pop()}` || "/default.webp"
                }
                title={product.product?.productName || "Sin nombre"}
                description={product.product?.description || "Sin descripción"}
                category={
                  product.product?.categories[0]?.name || "Sin categoría"
                }
                quantity={product.stock}
                price={product.product?.price || 0}
                colors={[product.color.colorCod]}
                status={product.product?.state ? 1 : 0}
                onEdit={() => console.log(`Edit product ${product.id}`)}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};
