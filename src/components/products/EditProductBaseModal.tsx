import { Button, MenuItem, TextField } from "@mui/material";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

interface CreateProductBaseModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const EditProductBaseModal = ({
  isOpen,
  onOpenChange,
}: CreateProductBaseModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p>Editar producto base</p>
            </ModalHeader>
            <ModalBody>
              <TextField label="Producto" fullWidth />
              <TextField
                id="outlined-select-category"
                select
                label="Selecciona la categoría"
                defaultValue={1}
                helperText="Por favor selecciona la categoría"
                fullWidth
              >
                <MenuItem value={1}>Juguetes</MenuItem>
                <MenuItem value={2}>Accesorios</MenuItem>
              </TextField>
              <TextField
                label="Precio"
                fullWidth
                placeholder="Precio del producto"
                type="number"
              />
              <TextField
                label="Descripción"
                fullWidth
                placeholder="Descripción del producto"
                multiline
                rows={4}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cerrar</Button>
              <Button variant="contained" onClick={onClose}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditProductBaseModal;
