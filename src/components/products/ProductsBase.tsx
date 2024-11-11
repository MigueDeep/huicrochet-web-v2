import {
  Button,
  ButtonGroup,
  InputAdornment,
  MenuItem,
  TextField,
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
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "../../styles/products/products.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SearchIcon from "@mui/icons-material/Search";
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="text-end mb-4">
        <Button onClick={onOpen} variant="contained" color="primary">
          Añadir nuevo
        </Button>
      </div>
      <div className="col-6 mb-2">
        <TextField
          label="Busqueda"
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
                      <IconButton>
                        <ModeCommentOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Editar">
                      <IconButton>
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>Añadir nuevo producto base</p>
              </ModalHeader>
              <ModalBody>
                <TextField label="Producto" fullWidth />
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Selecciona la categoría"
                  defaultValue={1}
                  helperText="Please select your currency"
                >
                  <MenuItem value={1}>Juegetes</MenuItem>
                  <MenuItem value={2}>USD</MenuItem>
                </TextField>
                <TextField
                  label="Precio"
                  fullWidth
                  placeholder="Precio del producto"
                  type="number"
                />
                <TextField
                  label="Descripción"
                  fullWidth
                  placeholder="Descripción del producto"
                  multiline
                  rows={4}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Cerrar</Button>
                <Button variant="contained" onClick={onClose}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
