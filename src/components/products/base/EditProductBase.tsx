import { useEffect, useState } from "react";
import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import animationData from "../../../utils/animation.json";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ArrowLeft } from "@mui/icons-material";
import Lottie from "lottie-react";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { Datum } from "../../../interfaces/CategoriesInterface.ts/Category";
import { IUpdateProduct } from "../../../interfaces/products/ProductsIterface";
import { ProductServices } from "../../../service/ProductService";
import { getAllActiveCategories } from "../../../service/CategoryService";
import { CategoriasIconBlack, HiloIConGary } from "../../../utils/icons";
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
export const EditProductBase = () => {
  const [categories, setCategories] = useState<Datum[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const id = useParams().id;
  const handleSave = async (values: IUpdateProduct) => {
    setLoading(true);
    try {
      if (id) {
        await ProductServices.update(id, values);
      } else {
        throw new Error("ID is undefined");
      }
      console.log(values);
      navigate("/products/base");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadProduct = async (id: string, setValues: Function) => {
    try {
      const response = await ProductServices.getById(id);
      const productData = response.data;
      const createdAtISO = new Date(productData.createdAt).toISOString();

      setValues({
        productName: productData.productName,
        description: productData.description,
        price: productData.price,
        categories: productData.categories.map(
          (category: Datum) => category.id
        ),
        state: productData.state,
        createdAt: createdAtISO,
      });
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

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
            enableReinitialize
          >
            {({ setFieldValue, setValues, values, errors, touched }) => {
              useEffect(() => {
                if (id) {
                  loadProduct(id, setValues);
                }
              }, [id, setValues]);

              return (
                <Form>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <Field
                        name="productName"
                        as={TextField}
                        label="Producto"
                        placeholder="Nombre del producto"
                        fullWidth
                        variant="outlined"
                        required
                        error={touched.productName && !!errors.productName}
                        helperText={<ErrorMessage name="productName" />}
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
                        error={touched.categories && !!errors.categories}
                        helperText={<ErrorMessage name="categories" />}
                        defaultValue={values.categories}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CategoriasIconBlack />
                            </InputAdornment>
                          ),
                        }}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="col-12 mb-3">
                      <Field
                        name="price"
                        as={TextField}
                        label="Precio"
                        fullWidth
                        variant="outlined"
                        type="number"
                        required
                        error={touched.price && !!errors.price}
                        helperText={<ErrorMessage name="price" />}
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
                      <Field
                        name="description"
                        as={TextField}
                        label="Descripción"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        error={touched.description && !!errors.description}
                        helperText={<ErrorMessage name="description" />}
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
                      <Button variant="contained" type="submit">
                        Guardar
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
    </>
  );
};
