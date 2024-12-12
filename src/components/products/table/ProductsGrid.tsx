import { useState, useEffect, useMemo } from "react";
import { ProductCardGrid } from "../ProductCardGrid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
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
  const [open, setOpen] = useState(false); // Estado del Dialog
  const [productToToggle, setProductToToggle] = useState<Datum | null>(null); // Producto seleccionado para desactivar/activar

  const handleClickOpen = (product: Datum) => {
    setProductToToggle(product); // Guardar el producto
    setOpen(true); // Abrir el Dialog
  };

  const handleClose = () => {
    setOpen(false); // Cerrar el Dialog
    setProductToToggle(null); // Limpiar el producto seleccionado
  };
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
const onDelete = async () => {
  if (!productToToggle) return;

  try {
    const newState = !productToToggle.state;

    // Actualizar el estado local
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productToToggle.id
          ? { ...product, state: newState }
          : product
      )
    );

    // Llamar al servicio para persistir el cambio
    await ItemsService.chngeStatus(productToToggle.id, newState);
  } catch (error) {
    console.error("Error al cambiar el estado del producto:", error);

    // Si hay error, revertir el estado local
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productToToggle.id
          ? { ...product, state: !productToToggle.state }
          : product
      )
    );
  } finally {
    handleClose(); // Cerrar el diálogo
  }
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
                    ? `http://34.203.104.87:8080/${product.images[0].imageUri
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
                status={product.state ? 1 : 0} // Usar el estado actualizado
                onEdit={() => onEdit(product.id)}
                onChangeStatus={() => handleClickOpen(product)}
              />
            </div>
          ))
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar acción"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas{" "}
            {productToToggle?.state ? "desactivar" : "activar"} el item{" "}
            <strong>{productToToggle?.product?.productName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={onDelete} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
