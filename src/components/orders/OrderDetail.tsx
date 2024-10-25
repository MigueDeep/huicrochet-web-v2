import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Card, CardBody, Image, Divider, Chip, DateInput } from "@nextui-org/react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Select from '@mui/material/Select';
import { Box, FormControl, InputLabel, MenuItem } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import ColorCircle from "../common/ColorCircle";

export default function OrderDetail() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const status = [
        { value: '1', label: 'En proceso' },
        { value: '2', label: 'Enviado' },
        { value: '3', label: 'Entregado' },
    ];

    return (
        <>
            <Tooltip content="Detalle de la orden">
                <span onClick={onOpen} className="cursor-pointer">
                    <VisibilityIcon fontSize="medium" color="info" />
                </span>
            </Tooltip>
            <Modal
                size="4xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                scrollBehavior="inside" // Permite scroll en el modal completo
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col items-center gap-1">
                                Detalle de la Orden
                            </ModalHeader>
                            <ModalBody className="max-h-[60vh] overflow-y-auto">
                                <section className="row">
                                    <div className="col-6">
                                        <h6>Orden ID: #168012</h6>
                                        <p>Lunes 20 de Ocubre, 2024</p>
                                        <Chip
                                            className="capitalize"
                                            size="sm"
                                            variant="flat"
                                            color="success"
                                        >En proceso</Chip>
                                    </div>
                                    <div className="col-6 d-flex gap-4">

                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Estado"
                                                >
                                                    {status.map((item) => (
                                                        <MenuItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Box sx={{ minWidth: 120 }}>
                                            <DatePicker label="Fecha de entrega" />
                                        </Box>

                                    </div>
                                </section>
                                {/* Datos de entrega */}
                                <section>

                                </section>

                                <Divider />

                                {/* Productos */}
                                <section>
                                    <h5 className="text-lg font-semibold mb-2">Productos</h5>
                                    <Card className="flex flex-row items-center gap-4 max-w-full p-3 mb-4 border">
                                        <Image
                                            isZoomed
                                            width={200}
                                            alt="NextUI Fruit Image with Zoom"
                                            src="pajaro.jpg"
                                            classNames={{
                                                img: "opacity-100" // This should override any existing opacity class
                                            }}
                                        />
                                        <CardBody className="flex flex-col ">
                                            <p><strong>Nombre:</strong> Producto 1</p>
                                            <p><strong>Cantidad:</strong> 2</p>
                                            <p className="d-flex gap-2">
                                                <strong>Color:</strong>
                                                <div className="d-flex gap-2">
                                                    <ColorCircle color="pink" />
                                                    <ColorCircle color="red" />
                                                </div>
                                            </p>

                                        </CardBody>
                                    </Card>
                                    {/* Puedes añadir más productos duplicando el Card */}
                                </section>
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
