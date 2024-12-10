import { useEffect, useState, useMemo } from "react";
import {
  Button,
  ButtonGroup,
  InputAdornment,
  TextField,
  IconButton,
  Switch,
} from "@mui/material";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Chip,
} from "@nextui-org/react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Lottie from "lottie-react";
import animationData from "../../../utils/animation.json";
import "../../../styles/products/products.css";
import { ProductCommentsModal } from "../ProductCommentsModal";
import { Category, Datum } from "../../../interfaces/products/ProductsIterface";
import { ProductServices } from "../../../service/ProductService";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ReviewService } from "../../../service/ReviewService";
import { Datum as ReviewDatum } from "../../../interfaces/IReview";

const label = { inputProps: { "aria-label": "Switch demo" } };

const columns = [
  { key: "name", label: "PRODUCTO" },
  { key: "description", label: "DESCRIPCIÓN" },
  { key: "price", label: "PRECIO" },
  { key: "category", label: "CATEGORÍA" },
  { key: "status", label: "ESTADO" },
  { key: "actions", label: "ACCIONES" },
];

const rowsPerPage = 10;

export const ProductsBase = () => {
  const [products, setProducts] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const pages = Math.ceil(products.length / rowsPerPage);
  const [open, setOpen] = useState(false); // Estado del Dialog
  const [productToToggle, setProductToToggle] = useState<Datum | null>(null); // Producto seleccionado para desactivar/activar

  const handleClickOpen = (product: Datum) => {
    setProductToToggle(product); // Guardar el producto
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProductToToggle(null);
  };
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
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
      const response = await ProductServices.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const editProduct = async (id: string) => {
    navigate(`/products/base/edit/${id}`);
  };
  const toggleProductStatus = async () => {
    if (!productToToggle) return; // Validación
    try {
      const newState = !productToToggle.state;
      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === productToToggle.id ? { ...prod, state: newState } : prod
        )
      );
      handleClose();
      await ProductServices.changeStatus(productToToggle.id, newState);
    } catch (error) {
      console.error("Error al actualizar el estado del producto:", error);
      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === productToToggle.id
            ? { ...prod, state: productToToggle.state }
            : prod
        )
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onAddProduct = () => {
    navigate("/products/base/create");
  };
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [comments, setComments] = useState<ReviewDatum[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  const fetchComments = async (productId: string) => {
    try {
      setIsCommentsLoading(true);
      const response = await ReviewService.getReviewsByProduct(productId);
      setComments(response.data);
    } catch (error) {
      console.error("Error al cargar comentarios:", error);
      setComments([]);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  const onOpenCommentsModal = (productId: string) => {
    setSelectedProductId(productId);
    fetchComments(productId);
    setOpenCommentsModal(true);
  };
  const onCloseCommentsModal = () => setOpenCommentsModal(false);

  return (
    <>
      <div className="text-end mb-4">
        <Button
          startIcon={<AddIcon />}
          onClick={onAddProduct}
          variant="contained"
          color="primary"
        >
          Añadir nuevo
        </Button>
      </div>
      <div className="col-6 mb-2">
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

      <div className="flex flex-col gap-3">
        <Table
          color={"secondary"}
          layout="fixed"
          aria-label="Example static collection table"
          bottomContent={
            <div
              className="
          flex w-full justify-center mt-4 pb-4 border-b border-gray-200
          "
            >
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
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
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
            {items.map((product) => (
              <TableRow key={product.id}>
                <TableCell
                  style={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.productName}
                </TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  {product.categories
                    .map((category: Category) => category.name)
                    .join(", ")}
                </TableCell>
                <TableCell>
                  <Chip
                    variant="flat"
                    color={product.state ? "success" : "danger"}
                  >
                    {product.state ? "Activo" : "Inactivo"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Tooltip content="Ver comentarios">
                      <IconButton
                        onClick={() => onOpenCommentsModal(product.id)}
                      >
                        <ModeCommentOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Editar">
                      <IconButton onClick={() => editProduct(product.id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content={product.state ? "Desactivar" : "Activar"}>
                      <Switch
                        {...label}
                        checked={product.state}
                        onClick={() => handleClickOpen(product)}
                      />
                    </Tooltip>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ProductCommentsModal
        isOpen={openCommentsModal}
        onOpenChange={onCloseCommentsModal}
        comments={comments}
        isLoading={isCommentsLoading}
      />

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
            {productToToggle?.state ? "desactivar" : "activar"} el producto{" "}
            {productToToggle?.productName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={toggleProductStatus} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
