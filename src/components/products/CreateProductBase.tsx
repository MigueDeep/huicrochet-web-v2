import { useEffect, useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { getAllActiveCategories } from "../../service/CategoryService";
import { Datum } from "../../interfaces/CategoriesInterface.ts/Category";
import { ProductServices } from "../../service/ProductService";
import { ICreateProduct } from "../../interfaces/products/ProductsIterface";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ArrowLeft } from "@mui/icons-material";
import Lottie from "lottie-react";
import animationData from "../../utils/animation.json";
const validationSchema = Yup.object({
  productName: Yup.string().required("El nombre del producto es obligatorio"),
  price: Yup.number()
    .positive("El precio debe ser un número positivo")
    .required("El precio es obligatorio"),
  categories: Yup.array()
    .min(1, "Selecciona al menos una categoría")
    .required("La categoría es obligatoria"),
  description: Yup.string().max(
    250,
    "La descripción no puede exceder los 250 caracteres"
  ),
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
      toast.success("Producto creado exitosamente");
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
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem 0",
            }}
          >
            <Lottie
              animationData={animationData}
              style={{ width: 150, height: 150 }}
              loop={true}
            />
          </div>
        ) : (
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
            {({ setFieldValue, errors, touched, resetForm }) => (
              <Form>
                <div className="row">
                  <div className="col-12 mb-3">
                    <div className="form-group">
                      <Field
                        name="productName"
                        as={TextField}
                        label="Producto"
                        placeholder="Nombre del producto"
                        fullWidth
                        variant="outlined"
                        required
                        className="form-control"
                        error={touched.productName && !!errors.productName}
                        helperText={<ErrorMessage name="productName" />}
                      />
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <div className="form-group">
                      <Field
                        name="categories"
                        as={TextField}
                        select
                        label="Selecciona la categoría"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue("categories", [e.target.value])
                        }
                        fullWidth
                        variant="outlined"
                        className="form-control"
                        error={touched.categories && !!errors.categories}
                        helperText={<ErrorMessage name="categories" />}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Field>
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
                        className="form-control"
                        error={touched.price && !!errors.price}
                        helperText={<ErrorMessage name="price" />}
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
                    >
                      Cancelar
                    </Button>
                    <Button variant="contained" type="submit">
                      Guardar
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};
