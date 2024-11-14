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
  Spinner,
} from "@nextui-org/react";
import Avatar from "@mui/material/Avatar";
import ChangeStatus from "../common/ChangesStatus";
import { useEffect, useMemo, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import UserService from "../../service/UserService";

const columns = [
  { key: "pic", label: "FOTO" },
  { key: "name", label: "NOMBRE COMPLETO" },
  { key: "email", label: "CORREO" },
  { key: "birthday", label: "FECHA DE NACIMIENTO" },
  { key: "status", label: "ESTADO" },
  { key: "actions", label: "ACTIVAR/DESACTIVAR" },
];

const rowsPerPage = 10;

export default function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await UserService.getUsers();
        console.log(response.data);
        setUsers(response.data);
      } catch (err) {
        setError("Error al obtener los usuarios. Intente nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return users.slice(start, end);
  }, [page, users]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
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
        <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner label="Cargando usuarios..." />}
         items={items}>
          {(user) => (
            <TableRow key={user.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "pic" ? (
                    user.image?.imageUri ? (
                      <Avatar alt={user.fullName}  src={
                        user.image
                          ? `http://localhost:8080/${user.image.imageUri
                              .split("/")
                              .pop()}`
                          : "/default.webp"
                      } />
                    ) : (
                      <Avatar>{user.fullName.charAt(0).toUpperCase()}</Avatar>
                    )
                  ) : column.key === "actions" ? (
                    <Tooltip
                      showArrow
                      content={user.status ? "Desactivar" : "Activar"}
                    >
                      <span className="text-danger cursor-pointer active:opacity-50">
                        <ChangeStatus id={user.id} initialStatus={user.status} type="user" />
                      </span>
                    </Tooltip>
                  ) : column.key === "status" ? (
                    <Chip
                      className="capitalize"
                      size="sm"
                      variant="flat"
                      color={user.status ? "success" : "danger"}
                    >
                      {user.status ? "activo" : "inactivo"}
                    </Chip>
                  ) : column.key === "name" ? (
                    user.fullName
                  ) : column.key === "email" ? (
                    user.email
                  ) : column.key === "birthday" ? (
                    new Date(user.birthday).toLocaleDateString()
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
