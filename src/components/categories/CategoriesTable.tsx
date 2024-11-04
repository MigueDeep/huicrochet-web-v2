import { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { Edit, Delete } from "@mui/icons-material";
import EditModal from "./EditModal";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { getAllCategories } from "../../service/CategoryService";
import { Datum } from "../../interfaces/CategoriesInterface.ts/Category";

const columns = [
  { key: "name", label: "Categoria" },
  { key: "state", label: "Estado" },
  { key: "actions", label: "Acciones" },
];

const CategoriesTable = () => {
  const [openCreateModal, setopenCreateModal] = useState(false);
  const [openEditModal, setopenEditModal] = useState(false);
  const [categories, setCategories] = useState<Datum[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onOpenEditModal = () => setopenEditModal(true);
  const onOpenCreateModal = () => setopenCreateModal(true);
  const onCloseEditModal = () => setopenEditModal(false);
  const onCloseCreateModal = () => setopenCreateModal(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "1rem 0",
        }}
      >
        <Button variant="contained" onClick={onOpenCreateModal}>
          Agregar Categoría
        </Button>
      </div>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} style={{ textAlign: "center" }}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={categories}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell style={{ textAlign: "center" }}>
                  {columnKey === "actions" ? (
                    <>
                      <IconButton aria-label="edit" onClick={onOpenEditModal}>
                        <Edit color="info" />
                      </IconButton>
                      <IconButton aria-label="delete">
                        <Delete color="error" />
                      </IconButton>
                    </>
                  ) : columnKey === "state" ? (
                    <Chip
                      color={item.state ? "success" : "danger"}
                      variant="flat"
                    >
                      {item.state ? "Activo" : "Inactivo"}
                    </Chip>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <EditModal
        isOpen={openEditModal}
        onOpenChange={onOpenEditModal}
        onCloseEditModal={onCloseEditModal}
      />
      <CreateCategoryModal
        isOpen={openCreateModal}
        onOpenChange={onOpenCreateModal}
        onCloseCreateModal={onCloseCreateModal}
        fetchCategories={fetchCategories}
      />
    </>
  );
};

export default CategoriesTable;
