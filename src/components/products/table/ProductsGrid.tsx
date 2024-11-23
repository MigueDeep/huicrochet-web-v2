import { useState, useEffect, useMemo } from "react";
import { ProductCardGrid } from "../ProductCardGrid";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ItemsService } from "../../../service/ItemsService";
import { Datum } from "../../../interfaces/Items/ItemsInterface";
import Lottie from "lottie-react";
import animationData from "../../../utils/animation.json";
import { useNavigate } from "react-router-dom";

export const ProductsGrid = () => {
  const [products, setProducts] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.product?.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);
  const onEdit = async (id: string) => {
    navigate(`/products/edit/${id}`);
  };

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
          label="Búsqueda"
          placeholder="Ingresa el nombre del producto"
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

      {/* Productos o animación de carga */}
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
        ) : filteredProducts.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              color: "#6c757d",
              fontSize: "1.5rem",
            }}
          >
            <p>✨ Nada que mostrar... ✨</p>
            <p style={{ fontSize: "1rem" }}>
              Intenta ajustar tu búsqueda o agrega nuevos productos.
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="mb-4 col-12 col-sm-6 col-md-3">
              <ProductCardGrid
                image={
                  product.images && product.images.length > 0
                    ? `http://localhost:8080/${product.images[0].imageUri
                        .split("/")
                        .pop()}`
                    : `../../../public/logo.png`
                }
                title={product.product?.productName || "Sin nombre"}
                description={product.product?.description || "Sin descripción"}
                category={
                  product.product?.categories
                    .map((cat) => cat.name)
                    .join(", ") || "Sin categorías"
                }
                quantity={product.stock}
                price={product.product?.price || 0}
                colors={[product.color.colorCod]}
                status={product.product?.state ? 1 : 0}
                onEdit={() => onEdit(product.id)}
                onChangeStatus={() => console.log("Cambiar estado")}
                onView={() => console.log("Ver detalles")}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};
