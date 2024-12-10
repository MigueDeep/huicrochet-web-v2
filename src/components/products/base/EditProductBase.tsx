import { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  CircularProgress,
  SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "@mui/icons-material";
import { CategoriasIconBlack, HiloIConGary } from "../../../utils/icons";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { Datum } from "../../../interfaces/CategoriesInterface.ts/Category";
import { ProductServices } from "../../../service/ProductService";
import { getAllActiveCategories } from "../../../service/CategoryService";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const EditProductBase = () => {
  const [categories, setCategories] = useState<Datum[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingsave, setLoadingSave] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { id } = useParams();

  const [values, setValues] = useState<{
    productName: string;
    description: string;
    price: number;
    categories: string[];
    state: boolean;
    createdAt: string;
  }>({
    productName: "",
    description: "",
    price: 0,
    categories: [],
    state: true,
    createdAt: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!values.productName.trim()) {
      newErrors.productName = "El nombre del producto es obligatorio.";
    } else if (values.productName.trim().length < 3) {
      newErrors.productName = "El nombre debe tener al menos 3 caracteres.";
    } else if (values.productName.length > 50) {
      newErrors.productName = "El nombre no puede exceder los 50 caracteres.";
    }

    if (values.price <= 0) {
      newErrors.price = "El precio debe ser mayor a 0.";
    }

    if (!values.description.trim()) {
      newErrors.description = "La descripción es obligatoria.";
    } else if (values.description.trim().length < 3) {
      newErrors.description =
        "La descripción debe tener al menos 3 caracteres.";
    } else if (values.description.length > 250) {
      newErrors.description =
        "La descripción no puede exceder los 250 caracteres.";
    }

    if (values.categories.length < 1) {
      newErrors.categories = "Selecciona al menos una categoría.";
    } else if (values.categories.length > 3) {
      newErrors.categories = "No puedes seleccionar más de 3 categorías.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoadingSave(true);
    try {
      if (id) {
        await ProductServices.update(id, {
          ...values,
          createdAt: new Date(values.createdAt),
        });
        navigate("/products/base");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleCategoriesChange = (event: SelectChangeEvent<string[]>) => {
    const selectedCategories = event.target.value as string[];
    setValues((prev) => ({
      ...prev,
      categories: selectedCategories,
    }));
  };

  const loadProduct = async (productId: string) => {
    setLoading(true);
    try {
      const response = await ProductServices.getById(productId);
      const productData = response.data;
      setValues({
        productName: productData.productName,
        description: productData.description,
        price: productData.price,
        categories: productData.categories.map(
          (category: Datum) => category.id
        ),
        state: productData.state,
        createdAt: new Date(productData.createdAt).toISOString(),
      });
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadProduct(id);

    const fetchCategories = async () => {
      try {
        const response = await getAllActiveCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener categorías activas:", error);
      }
    };
    fetchCategories();
  }, [id]);

  return (
    <>
      <div className="text-start">
        <Button
          startIcon={<ArrowLeft />}
          color="secondary"
          onClick={() => navigate("/products/base")}
        >
          Regresar
        </Button>
      </div>
      <div className="container mt-4 mb-4">
        {loading ? (
          <CircularProgress />
        ) : (
          <div className="row">
            <div className="col-12 mb-3">
              <TextField
                name="productName"
                label="Producto"
                fullWidth
                variant="outlined"
                value={values.productName}
                onChange={handleInputChange}
                disabled={loadingsave}
                error={!!errors.productName}
                helperText={errors.productName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HiloIConGary />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="col-12 mb-3">
              <FormControl fullWidth>
                <InputLabel id="edit-multiple-checkbox-label">
                  Categorías*
                </InputLabel>
                <Select
                  id="edit-multiple-checkbox"
                  multiple
                  value={values.categories} // Inicializado con las categorías seleccionadas del producto
                  onChange={handleCategoriesChange}
                  input={
                    <OutlinedInput
                      label="Categorías"
                      startAdornment={
                        <InputAdornment position="start">
                          <CategoriasIconBlack />
                        </InputAdornment>
                      }
                    />
                  }
                  renderValue={(selected) =>
                    selected
                      .map(
                        (id) =>
                          categories.find((cat) => cat.id === id)?.name || id
                      )
                      .join(", ")
                  }
                  MenuProps={MenuProps}
                >
                  {categories
                    .filter((category) => category.state) // Solo mostrar categorías activas
                    .map((category) => (
                      <MenuItem
                        key={category.id}
                        value={category.id}
                        disabled={
                          values.categories.length >= 3 &&
                          !values.categories.includes(category.id)
                        }
                      >
                        <Checkbox
                          checked={values.categories.includes(category.id)}
                        />
                        <ListItemText primary={category.name} />
                      </MenuItem>
                    ))}
                </Select>
                {!!errors.categories && (
                  <div className="text-danger">{errors.categories}</div>
                )}
              </FormControl>
            </div>

            <div className="col-12 mb-3">
              <TextField
                name="price"
                label="Precio"
                fullWidth
                variant="outlined"
                value={values.price}
                onChange={handleInputChange}
                disabled={loadingsave}
                type="number"
                error={!!errors.price}
                helperText={errors.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="col-12 mb-3">
              <TextField
                name="description"
                label="Descripción"
                fullWidth
                variant="outlined"
                value={values.description}
                onChange={handleInputChange}
                disabled={loadingsave}
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description}
              />
            </div>

            <div className="col-12 d-flex justify-content-between gap-2">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/products/base")}
              >
                Cancelar
              </Button>
              <Button
                disabled={loadingsave}
                variant="contained"
                onClick={handleSave}
              >
                {loadingsave ? <CircularProgress size={24} /> : "Guardar"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
