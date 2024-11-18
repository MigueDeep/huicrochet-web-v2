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
import Avatar from "@mui/material/Avatar";
import { useEffect, useMemo, useState } from "react";
import ColorCircle from "../../common/ColorCircle";
import { IconButton, InputAdornment, Switch, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Datum } from "../../../interfaces/Items/ItemsInterface";
import { ItemsService } from "../../../service/ItemsService";
import Lottie from "lottie-react";
import animationData from "../../../utils/animation.json";

const label = { inputProps: { "aria-label": "Switch demo" } };

const columns = [
  { key: "image", label: "Imagen" },
  { key: "name", label: "Nombre" },
  { key: "category", label: "Categoría" },
  { key: "description", label: "Cartegoria" },
  { key: "price", label: "Precio" },
  { key: "stock", label: "Stock " },
  { key: "colors", label: "Color" },
  { key: "status", label: "Estado" },
  { key: "actions", label: "Acciones" },
];

const rowsPerPage = 10;

export const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const pages = Math.ceil(products.length / rowsPerPage);
  const navigate = useNavigate();

  const onEdit = async (id: string) => {
    navigate(`/products/edit/${id}`);
  };

  const onDelete = async (item: Datum) => {
    setIsLoading(true);
    try {
      const newState = !item.state;
      await ItemsService.chngeStatus(item.id, newState);
      setProducts([]);
      await fetchProducts();
    } catch (error) {
      console.error("Error al cambiar el estado del ítem");
    } finally {
      setIsLoading(false);
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
          emptyContent={"No hay productos para mostrar"}
        >
          {(item) => (
            <TableRow key={item.id}>
              {columns.map((column) => {
                let cellContent;

                switch (column.key) {
                  case "image":
                    cellContent = (
                      <Avatar
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
                    const activeCategory = item.product?.categories.find(
                      (category) => category.state
                    );
                    cellContent = activeCategory
                      ? activeCategory.name
                      : "Sin categoría activa";
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
                            onChange={() => onDelete(item)}
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
    </>
  );
};
