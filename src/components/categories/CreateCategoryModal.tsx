import { Button, TextField } from "@mui/material";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
interface CreateCategoryModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onCloseCreateModal: () => void;
}

export const CreateCategoryModal = ({
  isOpen,
  onOpenChange,
  onCloseCreateModal,
}: CreateCategoryModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          <ModalHeader>Crear Categoría</ModalHeader>
          <ModalBody>
            <TextField
              label="Categoria"
              fullWidth
              placeholder="Ingrese el nombre de la categoría"
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
            <Button variant="contained" onClick={onOpenChange}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
