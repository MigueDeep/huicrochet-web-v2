import { useState, useEffect } from "react";
import { Button, IconButton, Switch } from "@mui/material";
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
import { Edit } from "@mui/icons-material";
import EditModal from "./EditModal";
import { CreateCategoryModal } from "./CreateCategoryModal";
import {
  getAllCategories,
  updateCategoryStatus,
} from "../../service/CategoryService";
import { Datum } from "../../interfaces/CategoriesInterface.ts/Category";

const label = { inputProps: { "aria-label": "Switch demo" } };

const columns = [
  { key: "name", label: "Categoria" },
  { key: "state", label: "Estado" },
  { key: "actions", label: "Acciones" },
];

const CategoriesTable = () => {
  const [openCreateModal, setopenCreateModal] = useState(false);
  const [openEditModal, setopenEditModal] = useState(false);
  const [categories, setCategories] = useState<Datum[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Datum | null>(null);

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

  const onOpenEditModal = (category: Datum) => {
    setSelectedCategory(category);
    setopenEditModal(true);
  };

  const onCloseEditModal = () => {
    setopenEditModal(false);
    setSelectedCategory(null);
  };

  const onOpenCreateModal = () => setopenCreateModal(true);
  const onCloseCreateModal = () => setopenCreateModal(false);

  const toggleCategoryStatus = async (category: Datum) => {
    try {
      // Cambiar el estado al opuesto y actualizar en la base de datos
      const newState = !category.state;
      await updateCategoryStatus(category.id, newState);

      // Refrescar la lista de categorías
      fetchCategories();
    } catch (error) {
      console.error("Error al actualizar el estado de la categoría:", error);
    }
  };

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
                      <IconButton
                        aria-label="edit"
                        onClick={() => onOpenEditModal(item)}
                      >
                        <Edit color="info" />
                      </IconButton>
                      <Switch
                        {...label}
                        checked={item.state} // Estado actual de la categoría
                        onChange={() => toggleCategoryStatus(item)} // Cambiar el estado al hacer clic
                      />
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
        onCloseEditModal={onCloseEditModal}
        selectedCategory={selectedCategory}
        fetchCategories={fetchCategories}
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
