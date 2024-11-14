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
  Spinner,
} from "@nextui-org/react";
import Avatar from "@mui/material/Avatar";
import { useEffect, useMemo, useState } from "react";
import ColorCircle from "../common/ColorCircle";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Datum } from "../../interfaces/Items/ItemsInterface";
import { ItemsService } from "../../service/ItemsService";

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

const rowsPerPage = 5;

export const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Datum[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const pages = Math.ceil(products.length / rowsPerPage);
  const navigate = useNavigate();
  const onEdit = () => {
    navigate(`/products/edit`);
  };

  const onDelete = () => {
    console.log("Eliminar");
  };

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return products.slice(start, end);
  }, [page, products]);
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
          label="Busqueda"
          placeholder="Ingresa el nombre del producto"
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
      <Table
        aria-label="Example table with dynamic content"
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
          loadingContent={<Spinner label="Loading..." />}
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
                        color={item.product?.state ? "success" : "danger"}
                        variant="flat"
                      >
                        {item.product?.state ? "Disponible" : "No disponible"}
                      </Chip>
                    );
                    break;
                  case "actions":
                    cellContent = (
                      <ButtonGroup>
                        <Tooltip content="Editar">
                          <IconButton onClick={onEdit}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Ver">
                          <IconButton>
                            <RemoveRedEyeOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Desactivar">
                          <IconButton onClick={onDelete}>
                            <DeleteOutlineIcon />
                          </IconButton>
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
