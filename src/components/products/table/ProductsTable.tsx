import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
  Pagination,
  ButtonGroup,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import ColorCircle from "../../common/ColorCircle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Datum } from "../../../interfaces/Items/ItemsInterface";
import { ItemsService } from "../../../service/ItemsService";
import Lottie from "lottie-react";
import animationData from "../../../utils/animation.json";
import { HoverableAvatar } from "../../common/HoverableAvatar";

const columns = [
  { key: "image", label: "IMAGEN" },
  { key: "name", label: "NOMBRE" },
  { key: "category", label: "CATEGORÍA" },
  { key: "description", label: "DESCRIPCIÓN" },
  { key: "price", label: "PRECIO" },
  { key: "stock", label: "STOCK" },
  { key: "colors", label: "COLOR" },
  { key: "status", label: "ESTADO" },
  { key: "actions", label: "ACCIONES" },
];

const rowsPerPage = 10;

export const ProductsTable = () => {
  const [page, setPage] = useState(1);
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

  const pages = Math.ceil(products.length / rowsPerPage);
  const navigate = useNavigate();

  const onEdit = async (id: string) => {
    navigate(`/products/edit/${id}`);
  };

  const onDelete = async () => {
    if (!productToToggle) return;
    try {
      const newState = !productToToggle.state;
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productToToggle.id
            ? { ...product, state: newState }
            : product
        )
      );
      handleClose();
      await ItemsService.chngeStatus(productToToggle.id, newState);
    } catch (error) {
      console.error("Error al cambiar el estado del producto:", error);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productToToggle.id
            ? { ...product, state: !productToToggle.state }
            : product
        )
      );
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.product?.productName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  const items = useMemo(() => {
    if (isLoading) return [];
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredProducts.slice(start, end);
  }, [page, filteredProducts, isLoading]);

  const fetchProducts = async () => {
    try {
      const response = await ItemsService.getAll();
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
      <Table
        aria-label="Tabla de productos con búsqueda"
        bottomContent={
          <div className="flex w-full justify-center mt-4 pb-4 border-b border-gray-200">
            <Pagination
              loop
              showControls
              color="success"
              initialPage={1}
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          isLoading={isLoading}
          loadingContent={
            <div style={{ height: "100px", width: "100px" }}>
              <Lottie animationData={animationData} width={50} height={50} />
            </div>
          }
          emptyContent={"✨ No hay productos para mostrar...✨"}
        >
          {(item) => (
            <TableRow key={item.id}>
              {columns.map((column) => {
                let cellContent;

                switch (column.key) {
                  case "image":
                    cellContent = (
                      <HoverableAvatar
                        alt={item.product?.productName || "Producto sin nombre"}
                        src={
                          item.images && item.images.length > 0
                            ? `http://localhost:8080/${item.images[0].imageUri
                                .split("/")
                                .pop()}`
                            : "/default.webp"
                        }
                      />
                    );
                    break;
                  case "name":
                    cellContent = item.product
                      ? item.product.productName
                      : "Producto sin nombre";
                    break;
                  case "category":
                    cellContent =
                      item.product?.categories &&
                      item.product.categories.length > 0
                        ? item.product.categories
                            .map((category) => category.name)
                            .join(", ")
                        : "Sin categorías";
                    break;

                  case "description":
                    cellContent =
                      item.product?.description ?? "Descripción no disponible";
                    break;
                  case "price":
                    cellContent = `$${
                      item.product?.price.toFixed(2) ?? "0.00"
                    }`;
                    break;
                  case "stock":
                    cellContent = item.stock;
                    break;
                  case "colors":
                    cellContent = <ColorCircle color={item.color.colorCod} />;
                    break;
                  case "status":
                    cellContent = (
                      <Chip
                        color={item.state ? "success" : "danger"}
                        variant="flat"
                      >
                        {item.state ? "Disponible" : "No disponible"}
                      </Chip>
                    );
                    break;
                  case "actions":
                    cellContent = (
                      <ButtonGroup>
                        <Tooltip content="Editar">
                          <IconButton onClick={() => onEdit(item.id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Ver">
                          <IconButton>
                            <RemoveRedEyeOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          content={item.state ? "Desactivar" : "Activar"}
                        >
                          <Switch
                            checked={item.state}
                            onClick={() => handleClickOpen(item)}
                          />
                        </Tooltip>
                      </ButtonGroup>
                    );
                    break;
                  default:
                    cellContent = null;
                }

                return <TableCell key={column.key}>{cellContent}</TableCell>;
              })}
            </TableRow>
          )}
        </TableBody>
      </Table>
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
