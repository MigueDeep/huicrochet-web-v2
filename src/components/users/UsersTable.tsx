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
} from "@nextui-org/react";
import Avatar from "@mui/material/Avatar"; // Importación de Avatar
import ChangeStatus from "../common/ChangesStatus";
import { useMemo, useState } from "react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    phone: "1234567890",
    email: "tony@email.com",
    age: 29,
    status: "activo",
    pic: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  },
  {
    key: "2",
    name: "Zoey Lang",
    phone: "1234567890",
    email: "zoey@email.com",
    age: 25,
    status: "bloqueado",
    pic: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  {
    key: "3",
    name: "Jane Fisher",
    phone: "9876543210",
    email: "jane@email.com",
    age: 32,
    status: "activo",
    pic: "https://i.pravatar.cc/150?u=a042581f4e29026304d",
  },
  {
    key: "4",
    name: "William Howard",
    phone: "1122334455",
    email: "william@email.com",
    age: 40,
    status: "vacaciones",
    pic: "https://i.pravatar.cc/150?u=a042581f4e29026404d",
  },
];

const columns = [
  { key: "pic", label: "FOTO" },
  { key: "name", label: "NOMBRE COMPLETO" },
  { key: "phone", label: "TELEFONO" },
  { key: "email", label: "CORREO" },
  { key: "age", label: "EDAD" },
  { key: "status", label: "ESTADO" },
  { key: "actions", label: "ACTIVAR/DESACTIVAR" },
];

const rowsPerPage = 2; // Filas por página

export default function App() {
  const [page, setPage] = useState(1);

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return rows.slice(start, end);
  }, [page]);

  return (
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
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.key}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.key === "pic" ? (
                  <Avatar alt={item.name} src={item.pic} />
                ) : column.key === "actions" ? (
                  <Tooltip
                    showArrow={true}
                    content={
                      item.status === "activo" ? "Desactivar" : "Activar"
                    }
                  >
                    <span className="text-danger cursor-pointer active:opacity-50">
                      <ChangeStatus
                        id={item.key}
                        initialStatus={item.status === "activo"}
                        type="user"
                      />
                    </span>
                  </Tooltip>
                ) : column.key === "status" ? (
                  <Chip
                    className="capitalize"
                    size="sm"
                    variant="flat"
                    color={item.status === "activo" ? "success" : "danger"}
                  >
                    {item.status}
                  </Chip>
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
  );
}
