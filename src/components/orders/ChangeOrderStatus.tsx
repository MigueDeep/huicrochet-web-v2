import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip } from "@nextui-org/react";
import EditIcon from '@mui/icons-material/Edit';

export default function OrderDetail() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Tooltip content="Cambiar estado">
                <span onClick={onOpen} className="cursor-pointer">
                    <EditIcon fontSize="medium" color="info" />
                </span>
            </Tooltip>
            <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Cambiar estado de la orden</ModalHeader>
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