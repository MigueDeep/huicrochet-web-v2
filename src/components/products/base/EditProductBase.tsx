import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  InputAdornment,
  ListItemText,
  MenuItem,
  TextField,
  SelectChangeEvent,
  CircularProgress,
} from "@mui/material";
import animationData from "../../../utils/animation.json";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "@mui/icons-material";
import Lottie from "lottie-react";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { Datum } from "../../../interfaces/CategoriesInterface.ts/Category";
import { ProductServices } from "../../../service/ProductService";
import { getAllActiveCategories } from "../../../service/CategoryService";
import { CategoriasIconBlack, HiloIConGary } from "../../../utils/icons";

export const EditProductBase = () => {
  const [categories, setCategories] = useState<Datum[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingsave, setLoadingSave] = useState(false);

  const navigate = useNavigate();

  const id = useParams().id;
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

  const handleSave = async () => {
    setLoadingSave(true);
    try {
      if (id) {
        await ProductServices.update(id, {
          ...values,
          createdAt: new Date(values.createdAt),
        });
      } else {
        throw new Error("ID is undefined");
      }
      navigate("/products/base");
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

  const handleCategoriesChange = (event: SelectChangeEvent<unknown>) => {
    const selectedCategories = event.target.value as string[];
    setValues((prev) => ({
      ...prev,
      categories: selectedCategories,
    }));
  };

  const loadProduct = async (id: string) => {
    setLoading(true);
    try {
      const response = await ProductServices.getById(id);
      console.log(response);
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
    if (id) {
      loadProduct(id);
    }
  }, [id]);

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
          <div className="row">
            <div className="col-12 mb-3">
              <TextField
                name="productName"
                label="Producto"
                placeholder="Nombre del producto"
                fullWidth
                variant="outlined"
                disabled={loadingsave}
                required
                value={values.productName}
                onChange={handleInputChange}
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
              <TextField
                select
                name="categories"
                label="Selecciona la categoría"
                fullWidth
                disabled={loadingsave}
                variant="outlined"
                SelectProps={{
                  multiple: true,
                  value: values.categories,
                  onChange: handleCategoriesChange,
                  renderValue: (selected) =>
                    (selected as string[])
                      .map(
                        (id) =>
                          categories.find((cat) => cat.id === id)?.name || id
                      )
                      .join(", "),
                }}
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
                    <Checkbox
                      checked={values.categories.includes(category.id)}
                    />
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-12 mb-3">
              <TextField
                name="price"
                label="Precio"
                fullWidth
                variant="outlined"
                disabled={loadingsave}
                type="number"
                required
                value={values.price}
                onChange={handleInputChange}
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
                disabled={loadingsave}
                multiline
                rows={4}
                value={values.description}
                onChange={handleInputChange}
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
                type="submit"
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
