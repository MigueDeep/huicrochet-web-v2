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

import { ItemsService, UpdateItem } from "../../../service/ItemsService";
import { IColor } from "../../../interfaces/IColor";
import ColorService from "../../../service/ColorService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ColorCircle from "../../common/ColorCircle";
import { IUpdateItem } from "../../../interfaces/Items/ItemsInterface";

import { IItem } from "../../../interfaces/Items/ItemById";

export const EditItemProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<IItem | null>(null);

  const fetchProductById = async (id: string) => {
    try {
      const response = await ItemsService.getById(id);
      const { data } = response;

      if (response) {
        setItem(response);
      }

      if (data) {
        setProductDetails({
          name: data.product.productName,
          category: data.product.categories[0]?.name || "Sin categoría",
          description: data.product.description,
          price: data.product.price.toString(),
        });

        setStock(data.stock || 0);
        setSelectedColor(data.color.id);

        const filePromises = data.images.map(async (image: any) => {
          const imageUrl = `http://localhost:8080/${image.imageUri
            .split("/")
            .pop()}`;
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          return new File([blob], image.name, { type: blob.type });
        });

        // Esperar la conversión de todas las imágenes
        const files = await Promise.all(filePromises);
        setFiles(files);

        // Configurar vistas previas de las imágenes
        const previews = files.map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
          size:
            file.size / 1024 < 1024
              ? (file.size / 1024).toFixed(2) + " KB"
              : (file.size / (1024 * 1024)).toFixed(2) + " MB",
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

      setFiles((prevFiles) => [
        ...prevFiles.filter(
          (file) => !newPreviews.some((np) => np.name === file.name)
        ),
        ...validFiles,
      ]);
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const imageToRemove = imagePreviews[index];

    if (!imageToRemove.isNew) {
      setFiles((prevFiles) =>
        prevFiles.filter(
          (file) =>
            file.name !== imageToRemove.name &&
            !file.name.includes(imageToRemove.url)
        )
      );
    }

    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
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

    const data: IUpdateItem = {
      productId: item?.data.product.id || "",
      colorId: selectedColor,
      stock: stock,
      state: true,
    };

    const formData = new FormData();
    formData.append("itemDto", JSON.stringify(data));

    files.forEach((file) => {
      console.log(file);
      formData.append("images", file);
    });

    try {
      setIsLoading(true);
      const response = await UpdateItem(id!, formData);
      console.log(response);

      toast.success("Producto actualizado correctamente");
      navigate("/products");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      toast.error("Error al actualizar el producto");
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    navigate("/products");
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
          <div className="d-flex gap-3 flex-wrap">
            {colorsData.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  fontSize: "1.2rem",
                  color: "#666",
                  padding: "20px",
                  marginTop: "20px",
                }}
              >
                No hay colores disponibles, recuerda que puedes crearlos en la
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
                      selectedColor === color.id && color.status
                        ? "0 4px 15px rgba(255, 105, 180, 0.5)"
                        : "none",
                    transform:
                      selectedColor === color.id && color.status
                        ? "scale(1.1)"
                        : "scale(1)",
                    backgroundColor: color.status
                      ? selectedColor === color.id
                        ? "#fff"
                        : "#fff"
                      : "rgba(220, 220, 220, 0.5)",
                    border: color.status
                      ? "2px solid transparent"
                      : "2px dashed rgba(150, 150, 150, 0.7)",
                    cursor: color.status ? "pointer" : "not-allowed",
                    opacity: color.status ? 1 : 0.7,
                  }}
                  onClick={() => color.status && handleColorSelect(color)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "50px",
                      filter: color.status ? "none" : "grayscale(100%)",
                    }}
                  >
                    <ColorCircle
                      color={color.colorCod}
                      isSelected={selectedColor === color.id && color.status}
                      onSelect={() => color.status && handleColorSelect(color)}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      color: color.status
                        ? selectedColor === color.id
                          ? "#333"
                          : "#666"
                        : "#aaa",
                      fontWeight:
                        selectedColor === color.id && color.status
                          ? "600"
                          : "400",
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
        <Button variant="outlined" className="me-2" onClick={onCancel}>
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
