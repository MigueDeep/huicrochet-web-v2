import TextField from "@mui/material/TextField";
import { Divider } from "@nextui-org/react";
import ColorCircle from "../common/ColorCircle";
import { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import "../../styles/products/products.css";
export const ProductBaseInfo = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      const validFiles = newFiles.filter((file) => file.type.includes("image"));

      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...validFiles];
        console.log("Arreglo de archivos:", updatedFiles);
        return updatedFiles;
      });

      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  return (
    <>
      <h5 className="text-2xl">Detalles de producto base</h5>
      <div className="row">
        <div className="col-12 col-md-6">
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
            <h5 className="text-2xl ">Detalles de Item</h5>
            <TextField
              label="Stock"
              variant="outlined"
              type="number"
              fullWidth
            />
          </div>
          <p>Selecciona el color</p>
          <div className="d-flex gap-2">
            <ColorCircle color="red" />
            <ColorCircle color="blue" />
            <ColorCircle color="green" />
            <ColorCircle color="yellow" />
            <ColorCircle color="black" />
          </div>
        </div>

        {/* Área de "drag and drop" para la carga de archivos */}
        <div className="col-12 col-md-6">
          <div className="file-upload-container ">
            <label htmlFor="file-upload" className="file-upload-label">
              {/*  */}
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
              <UploadFileIcon style={{ fontSize: "48px", color: "#999" }} />
              <p>Arrastra tus archivos aquí o haz clic para seleccionarlos</p>
            </div>
          </div>

          <div className="image-preview-container mt-3">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Imagen ${index + 1}`}
                className="image-preview"
                style={{ maxWidth: "100%", marginBottom: "10px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
