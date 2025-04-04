import { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Select,
  Checkbox,
  OutlinedInput,
  ListItemText,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { getAllActiveCategories } from "../../../service/CategoryService";
import { Datum } from "../../../interfaces/CategoriesInterface.ts/Category";
import { ProductServices } from "../../../service/ProductService";
import { ICreateProduct } from "../../../interfaces/products/ProductsIterface";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ArrowLeft } from "@mui/icons-material";
import { CategoriasIconBlack, HiloIConGary } from "../../../utils/icons";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

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

const validationSchema = Yup.object({
  productName: Yup.string()
    .required("El nombre del producto es obligatorio")
    .test(
      "no-empty-spaces",
      "El nombre no puede contener solo espacios",
      (value) => value?.trim() !== ""
    )
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  price: Yup.number()
    .positive("El precio debe ser mayor a 0")
    .required("El precio es obligatorio"),
  categories: Yup.array()
    .min(1, "Selecciona al menos una categoría")
    .max(5, "No puedes seleccionar más de 5 categorías")
    .required("La categoría es obligatoria"),
  description: Yup.string()
    .max(250, "La descripción no puede exceder los 250 caracteres")
    .test(
      "no-empty-spaces",
      "La descripción no puede contener solo espacios",
      (value) => value?.trim() !== ""
    )
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .required("La descripción es obligatoria"),
});

export const CreateProductBase = () => {
  const [categories, setCategories] = useState<Datum[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllActiveCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener categorías activas:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSave = async (values: ICreateProduct) => {
    try {
      setLoading(true);
      await ProductServices.create(values);
      navigate("/products/base");
    } catch (error) {
      console.error("Error al crear el producto:", error);
    } finally {
      setLoading(false);
    }
  };

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
        <Formik
          initialValues={{
            productName: "",
            description: "",
            price: 0,
            categories: [],
            state: true,
            createdAt: new Date(),
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ setFieldValue, values, errors, touched, resetForm }) => (
            <Form>
              <div className="row">
                <div className="col-12 mb-3">
                  <div className="form-group">
                    <Field
                      name="productName"
                      as={TextField}
                      label="Producto"
                      disabled={loading}
                      placeholder="Nombre del producto"
                      fullWidth
                      variant="outlined"
                      required
                      className="form-control"
                      error={touched.productName && !!errors.productName}
                      helperText={<ErrorMessage name="productName" />}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <HiloIConGary />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="form-group">
                    <FormControl fullWidth>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Categorias*
                      </InputLabel>

                      <Select
                        id="demo-multiple-checkbox"
                        multiple
                        disabled={loading}
                        value={values.categories}
                        onChange={(event) =>
                          setFieldValue("categories", event.target.value)
                        }
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
                                categories.find((cat) => cat.id === id)?.name ||
                                id
                            )
                            .join(", ")
                        }
                        MenuProps={MenuProps}
                      >
                        {categories.map((category) => (
                          <MenuItem
                            key={category.id}
                            value={category.id}
                            disabled={
                              values.categories.length >= 5 &&
                              !values.categories.includes(category.id as never)
                            }
                          >
                            <Checkbox
                              checked={values.categories.includes(
                                category.id as never
                              )}
                            />
                            <ListItemText primary={category.name} />
                          </MenuItem>
                        ))}
                      </Select>

                      {touched.categories && errors.categories && (
                        <div className="text-danger">{errors.categories}</div>
                      )}
                    </FormControl>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="form-group">
                    <Field
                      name="price"
                      as={TextField}
                      label="Precio"
                      placeholder="Precio del producto"
                      fullWidth
                      variant="outlined"
                      type="number"
                      required
                      disabled={loading}
                      className="form-control"
                      error={touched.price && !!errors.price}
                      helperText={<ErrorMessage name="price" />}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <AttachMoneyOutlinedIcon />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="form-group">
                    <Field
                      name="description"
                      as={TextField}
                      label="Descripción"
                      placeholder="Descripción del producto"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={4}
                      className="form-control"
                      error={touched.description && !!errors.description}
                      helperText={<ErrorMessage name="description" />}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-between gap-2">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      resetForm();
                    }}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                  <Button variant="contained" type="submit">
                    {loading ? <CircularProgress size={24} /> : "Guardar"}
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
