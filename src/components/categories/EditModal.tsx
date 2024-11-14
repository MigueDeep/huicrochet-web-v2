import { useState } from "react";
import { Button, TextField } from "@mui/material";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateCategory } from "../../service/CategoryService";
import { Datum } from "../../interfaces/CategoriesInterface.ts/Category";
import Lottie from "lottie-react";
import animationData from "../../utils/animation.json";

interface EditModalProps {
  isOpen: boolean;
  onCloseEditModal: () => void;
  selectedCategory: Datum | null;
  fetchCategories: () => Promise<void>;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("El nombre de la categoría es obligatorio")
    .test(
      "no-empty-spaces",
      "El nombre de la categoría no puede ser solo espacios en blanco",
      (value) => value?.trim().length > 0
    ),
});

const EditModal = ({
  isOpen,
  onCloseEditModal,
  selectedCategory,
  fetchCategories,
}: EditModalProps) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: selectedCategory ? selectedCategory.name : "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (selectedCategory) {
        setLoading(true); // Activar el loader al iniciar la actualización
        try {
          await updateCategory(
            { name: values.name.trim(), state: selectedCategory.state },
            selectedCategory.id
          );
          onCloseEditModal();
          await fetchCategories();
        } catch (error) {
          console.error("Error al actualizar la categoría", error);
        } finally {
          setLoading(false); // Desactivar el loader después de la actualización
        }
      }
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onCloseEditModal} hideCloseButton>
      <ModalContent>
        <ModalHeader>Editar Categoría</ModalHeader>
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
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <TextField
                label="Categoria"
                fullWidth
                placeholder="Ingrese el nombre de la categoría"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="contained"
                color="error"
                onClick={onCloseEditModal}
              >
                Cancelar
              </Button>
              <Button variant="contained" type="submit">
                Confirmar
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
