import { Button, ButtonGroup } from "@mui/material";
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
      <div className="d-flex justify-content-between mb-4">
        <h4 className="text-wine">Productos base</h4>
        <Button onClick={onOpen} variant="contained" color="primary">
          Añadir nuevo
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <Table
          color={"secondary"}
          selectionMode="single"
          defaultSelectedKeys={["2"]}
          aria-label="Example static collection table"
        >
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
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
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
