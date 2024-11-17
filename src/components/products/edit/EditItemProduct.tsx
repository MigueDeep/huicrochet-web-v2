import TextField from "@mui/material/TextField";
import { Divider, Progress } from "@nextui-org/react";
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

import { createItem, ItemsService } from "../../../service/ItemsService";
import { IColor } from "../../../interfaces/IColor";
import ColorService from "../../../service/ColorService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ColorCircle from "../../common/ColorCircle";

interface CreateItemProductProps {}
export const EditItemProduct = ({}: CreateItemProductProps) => {
  const { id } = useParams<{ id: string }>();

  const fetchProductById = async (id: string) => {
    try {
      const response = await ItemsService.getById(id);
      const { data } = response;

      if (data) {
        // Establecer datos del producto base
        setProductDetails({
          name: data.product.productName,
          category: data.product.categories[0]?.name || "Sin categoría",
          description: data.product.description,
          price: data.product.price.toString(),
        });

        // Establecer datos del item
        setStock(data.stock || 0);
        setSelectedColor(data.color.id);

        // Configurar imágenes para la vista previa
        const previews = data.images.map((image: any) => ({
          url: `http://localhost:8080/${image.imageUri.split("/").pop()}`,
          name: image.name,
          size: "Tamaño desconocido", // No se provee en los datos actuales
          isNew: false,
        }));
        setImagePreviews(previews);
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  const [files, setFiles] = useState<File[]>([]);
  const [colorsData, setColorsData] = useState<IColor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
      const validFiles = Array.from(selectedFiles).filter((file) =>
        file.type.includes("image")
      );

      const newPreviews = validFiles.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size:
          file.size / 1024 < 1024
            ? (file.size / 1024).toFixed(2) + " KB"
            : (file.size / (1024 * 1024)).toFixed(2) + " MB",
        isNew: true,
      }));

      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
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

  const handleColorSelect = (color: IColor) => {
    setSelectedColor(color.id);
  };

  const handleSave = async () => {
    if (!selectedColor) {
      toast.error("Selecciona un color.");
      return;
    }

    if (stock <= 0) {
      toast.error("El stock debe ser mayor a 0.");
      return;
    }

    const formData = new FormData();

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
          <div className="d-flex gap-2">
            {colorsData.map((color) => (
              <ColorCircle
                key={color.id}
                color={color.colorCod}
                isSelected={selectedColor === color.id}
                onSelect={() => handleColorSelect(color)}
              />
            ))}
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
