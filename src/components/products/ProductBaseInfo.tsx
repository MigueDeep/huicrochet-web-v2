import TextField from "@mui/material/TextField";
import { Divider } from "@nextui-org/react";
import ColorCircle from "../common/ColorCircle";
import { useEffect, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import "../../styles/products/products.css";
import { IconButton } from "@mui/material";
import { XCircleIcon } from "../../utils/icons";

export const ProductBaseInfo = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<
    { url: string; name: string; size: string; isNew: boolean }[]
  >([]);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);

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
        isNew: true, // Marcamos la imagen como nueva
      }));

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

  // Cambiamos `isNew` a `false` después de la primera renderización para evitar animaciones repetidas
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setImagePreviews((prevPreviews) =>
        prevPreviews.map((preview) => ({ ...preview, isNew: false }))
      );
    }, 300); // Duración de la animación de entrada

    return () => clearTimeout(timeoutId);
  }, [imagePreviews]);

  const [selectedColor, setSelectedColor] = useState("");
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <>
      <h5 className="text-2xl">Detalles de producto base</h5>
      <div className="row">
        <div className="col-12 col-md-8">
          {/* Campos de entrada de información del producto */}
          <div className="mb-3">
            <TextField
              label="Nombre del producto"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              defaultValue={"Producto de prueba"}
              fullWidth
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Categoria"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              defaultValue={"Categoria de prueba"}
              fullWidth
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Descripcion"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              defaultValue={"Producto de prueba"}
              rows={8}
              multiline
              fullWidth
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Precio"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              defaultValue={"$100"}
              fullWidth
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
            />
          </div>
          <p>Selecciona el color</p>
          <div className="d-flex gap-2">
            <ColorCircle
              color="red"
              onSelect={handleColorSelect}
              isSelected={selectedColor === "red"}
            />
            <ColorCircle
              color="blue"
              onSelect={handleColorSelect}
              isSelected={selectedColor === "blue"}
            />
            <ColorCircle
              color="green"
              onSelect={handleColorSelect}
              isSelected={selectedColor === "green"}
            />
            <ColorCircle
              color="yellow"
              onSelect={handleColorSelect}
              isSelected={selectedColor === "yellow"}
            />
            <ColorCircle
              color="black"
              onSelect={handleColorSelect}
              isSelected={selectedColor === "black"}
            />
          </div>
        </div>

        <div className="col-12 col-md-4">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
