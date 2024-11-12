import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Lottie from "lottie-react";
import animationData from "../../utils/animation.json";
import "../../styles/products/products.css";
import EditProductBaseModal from "./EditProductBaseModal";
import { ProductCommentsModal } from "./ProductCommentsModal";
import { Category, Datum } from "../../interfaces/products/ProductsIterface";
import { ProductServices } from "../../service/ProductService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DoneIcon from "@mui/icons-material/Done";
const columns = [
  { key: "name", label: "Producto" },
  { key: "description", label: "Descripción" },
  { key: "price", label: "Precio" },
  { key: "category", label: "Categoría" },
  { key: "status", label: "Estado" },
  { key: "actions", label: "Acciones" },
];

export const ProductsBase = () => {
  const [products, setProducts] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await ProductServices.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setIsLoading(false); // Desactiva la carga una vez que los datos se obtienen
    }
  };

  const toggleProductStatus = async (product: Datum) => {
    try {
      const newState = !product.state;
      await ProductServices.changeStatus(product.id, newState);
      setIsLoading(true);
      fetchProducts();
      toast.success("Estado del producto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el estado de la categoría:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onAddProduct = () => {
    navigate("/products/base/create");
  };

  const onOpenEditModal = () => setOpenEditModal(true);
  const onCloseEditModal = () => setOpenEditModal(false);

  const onOpenCommentsModal = () => setOpenCommentsModal(true);
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
        <div className="flex justify-center items-center h-64">
          <Lottie
            animationData={animationData}
            style={{ width: 200, height: 200 }}
            loop={true}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <Table
            color={"secondary"}
            aria-label="Example static collection table"
          >
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.productName}</TableCell>
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
                        <IconButton onClick={onOpenCommentsModal}>
                          <ModeCommentOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Editar">
                        <IconButton onClick={onOpenEditModal}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Eliminar">
                        <IconButton
                          onClick={() => toggleProductStatus(product)}
                        >
                          {product.state ? <DeleteOutlineIcon /> : <DoneIcon />}
                        </IconButton>
                      </Tooltip>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <EditProductBaseModal
        isOpen={openEditModal}
        onOpenChange={onCloseEditModal}
      />
      <ProductCommentsModal
        isOpen={openCommentsModal}
        onOpenChange={onCloseCommentsModal}
      />
    </>
  );
};
