import React, { useState } from "react";
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

const rows = [
  { key: 1, name: "Figuras", status: 1 },
  { key: 2, name: "Decoraciones", status: 0 },
  { key: 3, name: "Ropa", status: 1 },
  { key: 4, name: "Muñecos", status: 0 },
  { key: 5, name: "Juguetes", status: 1 },
];

const columns = [
  {
    key: "name",
    label: "Categoria",
  },
  {
    key: "status",
    label: "Estado",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];

const CategoriesTable = () => {
  const [openCreateModal, setopenCreateModal] = useState(false);
  const [openEditModal, setopenEditModal] = useState(false);

  const onOpenEditModal = () => {
    setopenEditModal(true);
  };

  const onOpenCreateModal = () => {
    setopenCreateModal(true);
  };

  const onCloseEditModal = () => {
    setopenEditModal(false);
  };

  const onCloseCreateModal = () => {
    setopenCreateModal(false);
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
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
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
                  ) : columnKey === "status" ? (
                    <Chip
                      color={item.status === 1 ? "success" : "danger"}
                      variant="flat"
                    >
                      {item.status === 1 ? "Activo" : "Inactivo"}
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
      />
    </>
  );
};

export default CategoriesTable;
