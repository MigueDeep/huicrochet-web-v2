import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from "@nextui-org/react";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function OrderDetail() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Tooltip content="Detalle de la orden">
                <span onClick={onOpen} className="cursor-pointer">
                    <VisibilityIcon fontSize="medium" color="info" />
                </span>
            </Tooltip>
            <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Detalle de la orden</ModalHeader>
                            <ModalBody>
                                contenido de la orden
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}