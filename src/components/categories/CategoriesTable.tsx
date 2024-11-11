import { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
} from "@mui/material";
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
import AddIcon from "@mui/icons-material/Add";
import EditModal from "./EditModal";
import { CreateCategoryModal } from "./CreateCategoryModal";
import {
  getAllCategories,
  updateCategoryStatus,
} from "../../service/CategoryService";
import { Datum } from "../../interfaces/CategoriesInterface.ts/Category";
import toast from "react-hot-toast";
import SearchIcon from "@mui/icons-material/Search";
import Lottie from "lottie-react";
import animationData from "../../utils/animation.json";
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
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    } finally {
      setLoading(false);
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
    setLoading(true);
    try {
      const newState = !category.state;
      await updateCategoryStatus(category.id, newState);
      fetchCategories();
      toast.success("Estado de la categoría actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el estado de la categoría:", error);
    } finally {
      setLoading(false);
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
        <Button
          variant="contained"
          onClick={onOpenCreateModal}
          startIcon={<AddIcon />}
        >
          Agregar Categoría
        </Button>
      </div>
      <div className="col-6 mb-2">
        <TextField
          label="Busqueda"
          placeholder="Ingresa el nombre de la categoría"
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

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            animationData={animationData}
            style={{ width: 200, height: 200 }}
            loop={true}
          />
        </div>
      ) : (
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
                          checked={item.state}
                          onChange={() => toggleCategoryStatus(item)}
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
      )}

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
