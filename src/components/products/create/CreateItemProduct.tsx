import TextField from "@mui/material/TextField";
import { Divider, Progress } from "@nextui-org/react";
import ColorCircle from "../../common/ColorCircle";
import { useCallback, useEffect, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import "../../../styles/products/products.css";
import {
  IconButton,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  CategoriasIconBlack,
  HiloIConGary,
  StockIcon,
  XCircleIcon,
} from "../../../utils/icons";
import { createItem } from "../../../service/ItemsService";
import { ICreateItem } from "../../../interfaces/Items/ItemsInterface";
import { IColor } from "../../../interfaces/IColor";
import ColorService from "../../../service/ColorService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Product } from "./ProductBaseGrid";

interface CreateItemProductProps {
  selectedProduct: Product | null;
}

export const CreateItemProduct = ({
  selectedProduct,
}: CreateItemProductProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [colorsData, setColorsData] = useState<IColor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stockError, setStockError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [imagePreviews, setImagePreviews] = useState<
    { url: string; name: string; size: string; isNew: boolean }[]
  >([]);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
  });
  const navigate = useNavigate();
  const fetchColors = useCallback(async () => {
    try {
      const response = await ColorService.getColors();
      setColorsData(response.data);
    } catch (error) {
      console.error("Error fetching colors: ", error);
    }
  }, []);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);
  const [value, setValue] = useState(0);
  const [stock, setStock] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 100 : v + 10));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      const validFiles = newFiles.filter((file) => file.type.includes("image"));

      setFiles((prevFiles) => [...prevFiles, ...validFiles]);

      const newPreviews = validFiles.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size:
          file.size / 1024 < 1024
            ? (file.size / 1024).toFixed(2) + " KB"
            : (file.size / (1024 * 1024)).toFixed(2) + " MB",
        isNew: true,
      }));
      if (validFiles.some((file) => file.size > 5 * 1024 * 1024)) {
        setImageError(true);
        toast.error("Las imagenes no deben ser mayores a 5MB.");
      } else {
        setImageError(false);
      }
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setRemovingIndex(index);
    setTimeout(() => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
      setImagePreviews((prevPreviews) =>
        prevPreviews.filter((_, i) => i !== index)
      );
      setRemovingIndex(null);
    }, 300);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setImagePreviews((prevPreviews) =>
        prevPreviews.map((preview) => ({ ...preview, isNew: false }))
      );
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [imagePreviews]);

  const handleColorSelect = (color: IColor) => {
    setSelectedColor(color.id);
  };

  useEffect(() => {
    if (selectedProduct) {
      setProductDetails({
        name: selectedProduct.title,
        category: selectedProduct.category,
        description: selectedProduct.description,
        price: selectedProduct.price.toString(),
      });
    } else {
      setProductDetails({
        name: "",
        category: "",
        description: "",
        price: "",
      });
    }
  }, [selectedProduct]);
  const validateForm = () => {
    let isValid = true;

    if (!selectedProduct) {
      toast.error("Debe seleccionar un producto base.");
      isValid = false;
    }

    if (!stock || stock <= 0) {
      setStockError(true);
      isValid = false;
      toast.error("El stock debe ser mayor a 0.");
    } else {
      setStockError(false);
    }

    if (!selectedColor) {
      toast.error("Debe seleccionar un color.");
      isValid = false;
    }

    if (files.length === 0) {
      toast.error("Debe subir al menos una imagen.");
      isValid = false;
    }

    if (imageError) {
      isValid = false;
    }

    return isValid;
  };
  const handleSave = async () => {
    if (!validateForm()) return;

    const data: ICreateItem = {
      productId: selectedProduct ? selectedProduct.id : "",
      colorId: selectedColor,
      stock: stock,
      state: true,
    };

    const formData = new FormData();
    formData.append("itemDto", JSON.stringify(data));

    files.forEach((file) => {
      formData.append("images", file);
    });
    try {
      setIsLoading(true);
      const response = await createItem(formData);

      toast.success(response.message);
      navigate("/products");
    } catch (error) {
      console.error("Error al crear el producto:", error);
      toast.error("Error al crear el producto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h5 className="text-2xl">Detalles de producto base</h5>
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="mb-3">
            <TextField
              label="Nombre del producto"
              variant="outlined"
              InputProps={{ readOnly: true }}
              value={productDetails.name}
              fullWidth
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

          <div className="mb-3">
            <TextField
              label="Categoria"
              variant="outlined"
              InputProps={{ readOnly: true }}
              value={productDetails.category}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoriasIconBlack />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Descripcion"
              variant="outlined"
              InputProps={{ readOnly: true }}
              value={productDetails.description}
              rows={8}
              multiline
              fullWidth
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Precio"
              variant="outlined"
              InputProps={{ readOnly: true }}
              value={productDetails.price}
              fullWidth
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

          <Divider />
          <div className="mb-3">
            <h5 className="text-2xl">Detalles de Item</h5>
            <TextField
              label="Stock"
              variant="outlined"
              type="number"
              fullWidth
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              error={stockError}
              helperText={stockError ? "El stock debe ser mayor a 0." : ""}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <StockIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <p>Selecciona el color</p>
          <div className="d-flex gap-3 flex-wrap ">
            {colorsData.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  fontSize: "1.2rem",
                  color: "#666",
                  padding: "20px",
                  marginTop: "10px",
                }}
              >
                No hay colores disponibles, recueda que puedes crearlos en la
                sección de colores...✨
              </div>
            ) : (
              colorsData.map((color) => (
                <div
                  key={color.id}
                  className="d-flex flex-column align-items-center gap-2"
                  style={{
                    width: "100px",
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "18px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow:
                      selectedColor === color.id
                        ? "0 4px 15px rgba(255, 105, 180, 0.5)"
                        : "none",
                    transform:
                      selectedColor === color.id ? "scale(1.1)" : "scale(1)",
                    backgroundColor:
                      selectedColor === color.id ? "#fff" : "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorSelect(color)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "50px",
                    }}
                  >
                    <ColorCircle
                      color={color.colorCod}
                      isSelected={selectedColor === color.id}
                      onSelect={() => handleColorSelect(color)}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: selectedColor === color.id ? "#333" : "#999",
                      fontWeight: selectedColor === color.id ? "600" : "400",
                    }}
                  >
                    {color.colorName}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="col-12 col-md-4">
          <p>Imagen del item</p>
          <div className="file-upload-container">
            <label htmlFor="file-upload" className="file-upload-label">
              Subir imagen
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="file-input"
            />
            <div className="file-upload-content">
              <UploadFileIcon style={{ fontSize: "24px" }} />
              <p className="small">
                Seleccione un archivo o arrástrelo y suéltelo aquí
              </p>
              <p className="text-pink">JPEG, PNG / 5MB</p>
            </div>
          </div>

          <div className="image-preview-container mt-3">
            {imagePreviews.map((preview, index) => (
              <div
                key={index}
                className={`image-preview-wrapper mt-2 ${
                  removingIndex === index ? "fade-out" : ""
                } ${preview.isNew ? "fade-in" : ""}`}
              >
                <div className="d-flex">
                  <p className="text-pink small">
                    {preview.name} / {preview.size}
                  </p>
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    style={{ marginLeft: "auto" }}
                  >
                    <XCircleIcon />
                  </IconButton>
                </div>
                <img
                  src={preview.url}
                  alt={`Imagen ${index + 1}`}
                  className="image-preview img-fluid justify-content-center"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    padding: "2px",
                  }}
                />
                <Progress
                  aria-label="Downloading..."
                  size="sm"
                  value={value}
                  color="primary"
                  showValueLabel={true}
                  className="max-w-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-end mt-2">
        <Button variant="outlined" className="me-2">
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isLoading}
          startIcon={
            isLoading && <CircularProgress size={24} color="inherit" />
          }
        >
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </>
  );
};
