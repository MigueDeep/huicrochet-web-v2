import { Button, ButtonGroup, InputAdornment, TextField } from "@mui/material";
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
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../../styles/products/products.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CreateProductBaseModal from "./CreateProductBaseModal";
import EditProductBaseModal from "./EditProductBaseModal";
import { useState } from "react";
import { ProductCommentsModal } from "./ProductCommentsModal";

const columns = [
  { key: "name", label: "Producto" },
  { key: "description", label: "Descripcción" },
  { key: "price", label: "Precio" },
  { key: "category", label: "Categoría" },
  { key: "status", label: "Estado" },
  { key: "actions", label: "Acciones" },
];

const rows = [
  {
    id: 1,
    name: "Snoopy",
    description: "Perro de juguete",
    price: 230.0,
    category: "Juguetes",
    status: 1,
  },
  {
    id: 2,
    name: "Snoopy",
    description: "Perro de juguete",
    price: 230.0,
    category: "Juguetes",
    status: 1,
  },
  {
    id: 3,
    name: "Snoopy",
    description: "Perro de juguete",
    price: 230.0,
    category: "Juguetes",
    status: 0,
  },
];

export const ProductsBase = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);

  const onOpenCreateModal = () => setOpenCreateModal(true);
  const onCloseCreateModal = () => setOpenCreateModal(false);

  const onOpenEditModal = () => setOpenEditModal(true);
  const onCloseEditModal = () => setOpenEditModal(false);

  const onOpenCommentsModal = () => setOpenCommentsModal(true);
  const onCloseCommentsModal = () => setOpenCommentsModal(false);

  return (
    <>
      <div className="text-end mb-4">
        <Button onClick={onOpenCreateModal} variant="contained" color="primary">
          Añadir nuevo
        </Button>
      </div>
      <div className="col-6 mb-2">
        <TextField
          label="Búsqueda"
          placeholder="Ingresa el nombre del producto base"
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

      <div className="flex flex-col gap-3">
        <Table color={"secondary"} aria-label="Example static collection table">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>
                  <Chip
                    variant="flat"
                    color={row.status === 1 ? "success" : "danger"}
                  >
                    {row.status === 1 ? "Activo" : "Inactivo"}
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
                      <IconButton>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateProductBaseModal
        isOpen={openCreateModal}
        onOpenChange={onCloseCreateModal}
      />
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
