import { useState, useEffect, useMemo } from "react";
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
  Pagination,
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
import SearchIcon from "@mui/icons-material/Search";
import Lottie from "lottie-react";
import animationData from "../../utils/animation.json";

const label = { inputProps: { "aria-label": "Switch demo" } };
const rowsPerPage = 10;

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
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
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
    try {
      const newState = !category.state;

      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === category.id ? { ...cat, state: newState } : cat
        )
      );
      await updateCategoryStatus(category.id, newState);
    } catch (error) {
      console.error("Error al actualizar el estado de la categoría:", error);
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === category.id ? { ...cat, state: category.state } : cat
        )
      );
    }
  };

  const pages = Math.ceil(categories.length / rowsPerPage);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categories]);

  const items = useMemo(() => {
    if (loading) return [];
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredCategories.slice(start, end);
  }, [page, filteredCategories, loading]);

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
            <TableColumn key={column.key} style={{ textAlign: "center" }}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={
            <div style={{ height: "100px", width: "100px" }}>
              <Lottie animationData={animationData} width={50} height={50} />
            </div>
          }
          items={items}
          emptyContent={"✨No hay categorías para mostra...✨"}
        >
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
                        <Edit />
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
