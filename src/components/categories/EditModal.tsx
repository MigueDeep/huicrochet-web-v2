import { Button, TextField } from "@mui/material";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

interface EditDeleteModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onCloseEditModal: () => void;
}
const EditModal = ({
  isOpen,
  onOpenChange,
  onCloseEditModal,
}: EditDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
      <ModalContent>
        <ModalHeader>Editar Categoría</ModalHeader>
        <ModalBody>
          <TextField
            label="Categoria"
            fullWidth
            placeholder="Ingrese el nombre de la categoría"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="contained" color="error" onClick={onCloseEditModal}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onOpenChange}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
