import { useEffect, useState, useMemo } from "react";
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
  Pagination,
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
import { ProductCommentsModal } from "./ProductCommentsModal";
import { Category, Datum } from "../../interfaces/products/ProductsIterface";
import { ProductServices } from "../../service/ProductService";
import { useNavigate } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
const columns = [
  { key: "name", label: "Producto" },
  { key: "description", label: "Descripción" },
  { key: "price", label: "Precio" },
  { key: "category", label: "Categoría" },
  { key: "status", label: "Estado" },
  { key: "actions", label: "Acciones" },
];
const rowsPerPage = 10;

export const ProductsBase = () => {
  const [products, setProducts] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const pages = Math.ceil(products.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return products.slice(start, end);
  }, [page, products]);

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
  const toggleProductStatus = async (product: Datum) => {
    try {
      const newState = !product.state;
      await ProductServices.changeStatus(product.id, newState);
      setIsLoading(true);
      fetchProducts();
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
            <TableBody items={items}>
              {items.map((product) => (
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
                        <IconButton onClick={() => editProduct(product.id)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Desactivar">
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

      <ProductCommentsModal
        isOpen={openCommentsModal}
        onOpenChange={onCloseCommentsModal}
      />
    </>
  );
};
