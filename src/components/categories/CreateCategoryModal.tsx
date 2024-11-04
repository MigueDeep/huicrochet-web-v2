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
import toast from "react-hot-toast";

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
        await createCategory(data);
        resetForm();
        onCloseCreateModal();
        toast.success("Categoría creada exitosamente");
        await fetchCategories();
      } catch (error) {
        console.error("Error al crear la categoría", error);
      }
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          <ModalHeader>Crear Categoría</ModalHeader>
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
        </ModalContent>
      </Modal>
    </>
  );
};
