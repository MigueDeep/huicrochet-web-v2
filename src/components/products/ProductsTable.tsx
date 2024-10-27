import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Tooltip,
  Chip,
  Pagination,
  ButtonGroup,
} from "@nextui-org/react";
import Avatar from "@mui/material/Avatar"; // Importación de Avatar
import { useMemo, useState } from "react";
import ColorCircle from "../common/ColorCircle";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const columns = [
  { key: "image", label: "Imagen" },
  { key: "name", label: "NOMBRE" },
  { key: "category", label: "Categoría" },
  { key: "price", label: "Precio" },
  { key: "stock", label: "Stock total" },
  { key: "colors", label: "Colores" },
  { key: "status", label: "Estado" },
  { key: "actions", label: "Acciones" },
];

const rows = [
  {
    id: 1,
    image: "/pajaro.jpg",
    name: "Snoopy",
    category: "Jugetes",
    price: 230.0,
    stock: 67,
    colors: ["pink", "blue", "green"],
    status: 1,
    onEdit: () => console.log("Edit product 1"),
    onDelete: () => console.log("Delete product 1"),
  },
  {
    id: 2,
    image: "/perro.jpeg",
    name: "Snoopy",
    category: "Jugetes",
    price: 230.0,
    stock: 67,
    colors: ["pink", "blue", "green"],
    status: 1,
    onEdit: () => console.log("Edit product 2"),
    onDelete: () => console.log("Delete product 1"),
  },
  {
    id: 3,
    image: "/sueterazul.jpg",
    name: "Snoopy",
    category: "Jugetes",
    price: 230.0,
    stock: 67,
    colors: ["pink", "blue", "green"],
    status: 1,
    onEdit: () => console.log("Edit product 3"),
    onDelete: () => console.log("Delete product 1"),
  },
  {
    id: 4,
    image: "/sueterazul.jpg",
    name: "Snoopy",
    category: "Jugetes",
    price: 230.0,
    stock: 67,
    colors: ["pink", "blue", "green"],
    status: 1,
    onEdit: () => console.log("Edit product 4"),
    onDelete: () => console.log("Delete product 1"),
  },
  {
    id: 5,
    image: "/perro.jpeg",
    name: "Snoopy",
    category: "Jugetes",
    price: 230.0,
    stock: 67,
    colors: ["pink", "blue", "green"],
    status: 90,
    onEdit: () => console.log("Edit product 5"),
    onDelete: () => console.log("Delete product 1"),
  },
  {
    id: 6,
    image: "/pajaro.jpg",
    name: "Snoopy",
    category: "Jugetes",
    price: 230.0,
    stock: 67,
    colors: ["pink", "blue", "green"],
    status: 0,
    onEdit: () => console.log("Edit product 6"),
    onDelete: () => console.log("Delete product 1"),
  },
];

const rowsPerPage = 5; // Filas por página

export const ProductsTable = () => {
  const [page, setPage] = useState(1);

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return rows.slice(start, end);
  }, [page]);
  return (
    <>
      <>
        <Table
          aria-label="Example table with dynamic content"
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
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.key === "image" ? (
                      <Avatar alt={item.name} src={item.image} />
                    ) : column.key === "colors" ? (
                      item.colors.map((color, index) => (
                        <div className="d-flex gap-2">
                          <ColorCircle key={index} color={color} />
                        </div>
                      ))
                    ) : column.key === "status" ? (
                      <Chip
                        color={item.status === 1 ? "success" : "danger"}
                        variant="flat"
                      >
                        {item.status === 1 ? "Disponible" : "No disponible"}
                      </Chip>
                    ) : column.key === "actions" ? (
                      <ButtonGroup>
                        <Tooltip content="Editar">
                          <IconButton onClick={item.onEdit}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Eliminar">
                          <IconButton onClick={item.onDelete}>
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Tooltip>
                      </ButtonGroup>
                    ) : (
                      getKeyValue(item, column.key)
                    )}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>
    </>
  );
};
