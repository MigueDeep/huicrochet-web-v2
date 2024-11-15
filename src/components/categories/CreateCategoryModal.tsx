import { Button, TextField } from "@mui/material";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { createCategory } from "../../service/CategoryService";
import { ICreateCategory } from "../../interfaces/CategoriesInterface.ts/Category";
import { useFormik } from "formik";
import * as Yup from "yup";
import Lottie from "lottie-react";
import animationData from "../../utils/animation.json";
import { useState } from "react";
interface CreateCategoryModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onCloseCreateModal: () => void;
  fetchCategories: () => Promise<void>;
}

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre de la categoría es obligatorio"),
});

export const CreateCategoryModal = ({
  isOpen,
  onOpenChange,
  onCloseCreateModal,
  fetchCategories,
}: CreateCategoryModalProps) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const data: ICreateCategory = {
        name: values.name,
        state: true,
      };

      try {
        setLoading(true); // Activar el loader al iniciar la actualización
        await createCategory(data);

        resetForm();
        onCloseCreateModal();
        await fetchCategories();
      } catch (error) {
        console.error("Error al crear la categoría", error);
      } finally {
        setLoading(false); // Desactivar el loader después de la actualización
      }
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          <ModalHeader>Crear Categoría</ModalHeader>
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
                  onClick={onCloseCreateModal}
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
    </>
  );
};
