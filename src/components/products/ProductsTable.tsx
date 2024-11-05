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
import { useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
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

const rows = [
  {
    id: 1,
    image: "/pajaro.jpg",
    name: "Snoopy",
    category: "Jugetes",
    description: "El mejor pajaro de la historia",
    price: 230.0,
    stock: 67,
    colors: "#AD1457",
    status: 1,
  },
  {
    id: 2,
    image: "/perro.jpeg",
    name: "Snoopy",
    category: "Jugetes",
    price: 230.0,
    description: "El mejor pajaro de la historia",
    stock: 67,
    colors: "pink",
    status: 1,
  },
  {
    id: 3,
    image: "/sueterazul.jpg",
    name: "Snoopy",
    category: "Jugetes",
    description: "El mejor pajaro de la historia",
    price: 230.0,
    stock: 67,
    colors: "blue",
    status: 1,
  },
  {
    id: 4,
    image: "/sueterazul.jpg",
    name: "Snoopy",
    category: "Jugetes",
    description: "El mejor pajaro de la historia",
    price: 230.0,
    stock: 67,
    colors: "green",
    status: 1,
  },
  {
    id: 5,
    image: "/perro.jpeg",
    name: "Snoopy",
    category: "Jugetes",
    description: "El mejor pajaro de la historia",
    price: 230.0,
    stock: 67,
    colors: "yellow",
    status: 90,
  },
  {
    id: 6,
    image: "/pajaro.jpg",
    name: "Snoopy",
    category: "Jugetes",
    description: "El mejor pajaro de la historia",
    price: 230.0,
    stock: 67,
    colors: "red",
    status: 0,
  },
];

const rowsPerPage = 5;

export const ProductsTable = () => {
  const [page, setPage] = useState(1);

  const pages = Math.ceil(rows.length / rowsPerPage);
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
    return rows.slice(start, end);
  }, [page]);

  return (
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
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {columns.map((column) => {
              let cellContent;
              if (column.key === "image") {
                cellContent = <Avatar alt={item.name} src={item.image} />;
              } else if (column.key === "colors") {
                cellContent = <ColorCircle color={item.colors} />;
              } else if (column.key === "status") {
                cellContent = (
                  <Chip
                    color={item.status === 1 ? "success" : "danger"}
                    variant="flat"
                  >
                    {item.status === 1 ? "Disponible" : "No disponible"}
                  </Chip>
                );
              } else if (column.key === "actions") {
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
                    <Tooltip content="Desactivar ">
                      <IconButton onClick={onDelete}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </ButtonGroup>
                );
              } else {
                cellContent = getKeyValue(item, column.key);
              }
              return <TableCell key={column.key}>{cellContent}</TableCell>;
            })}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
