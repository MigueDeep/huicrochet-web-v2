import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
  user,
} from "@nextui-org/react";
import Avatar from "@mui/material/Avatar";
import ChangeStatus from "../common/ChangesStatus";
import UserService from "../../service/UserService";
import { IUser } from "../../interfaces/IUser";
import Lottie from "lottie-react";
import animationData from "../../utils/animation.json";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  { key: "pic", label: "FOTO" },
  { key: "name", label: "NOMBRE COMPLETO" },
  { key: "email", label: "CORREO" },
  { key: "birthday", label: "FECHA DE NACIMIENTO" },
  { key: "status", label: "ESTADO" },
  { key: "actions", label: "ACCIONES" },
];

const rowsPerPage = 10;

export default function UsersTable() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (err) {
      setError("Error al obtener los usuarios. Intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleStatusChange = async (id: string) => {
    try {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: !user.status } : user
        )
      );
      await UserService.changeUserStatus(id);
    } catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);
    }
  };

  const pages = Math.ceil(users.length / rowsPerPage);
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    return users.filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);
  const items = useMemo(() => {
    if (isLoading) return [];

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredUsers.slice(start, end);
  }, [page, filteredUsers, isLoading]);

  const renderCellContent = (
    key: string,
    user: IUser,
    handleStatusChange: (id: string) => void
  ) => {
    switch (key) {
      case "pic":
        return user.image?.imageUri ? (
          <Avatar
            alt={user.fullName}
            src={
              user.image
                ? `http://34.203.104.87:8080/${user.image.imageUri
                    .split("/")
                    .pop()}`
                : "/default.webp"
            }
          />
        ) : (
          <Avatar>{user.fullName.charAt(0).toUpperCase()}</Avatar>
        );
      case "name":
        return user.fullName;
      case "email":
        return user.email;
      case "birthday":
        return new Date(user.birthday).toLocaleDateString();
      case "status":
        return (
          <Chip
            className="capitalize"
            size="sm"
            variant="flat"
            color={user.status ? "success" : "danger"}
          >
            {user.status ? "Activo" : "Inactivo"}
          </Chip>
        );
      case "actions":
        return (
          <ChangeStatus
            id={user.id}
            initialStatus={user.status}
            type="user"
            onStatusChange={handleStatusChange}
          />
        );
      default:
        return null;
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="col-6 mb-2">
        <TextField
          label="Busqueda"
          placeholder="Ingresa el nombre del usuario"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
        layout="fixed"
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
          isLoading={isLoading}
          loadingContent={
            <div style={{ height: "100px", width: "100px" }}>
              <Lottie animationData={animationData} width={50} height={50} />
            </div>
          }
          emptyContent={"✨ No hay usuarios para mostrar...✨"}
          items={items}
        >
          {(user) => (
            <TableRow key={user.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {renderCellContent(column.key, user, handleStatusChange)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
