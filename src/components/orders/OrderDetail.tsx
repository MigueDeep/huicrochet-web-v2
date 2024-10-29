import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
  Divider,
  Chip,
} from "@nextui-org/react";
import Select from "@mui/material/Select";
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import PaymentIcon from "@mui/icons-material/Payment";
import { PedidosIconBlack } from "../../utils/icons";
import { OrderDetailTable } from "./OrderDetailTable";

export default function OrderDetail() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const status = [
    { value: "1", label: "En proceso" },
    { value: "2", label: "Enviado" },
    { value: "3", label: "Entregado" },
  ];
  

  return (
    <>
      <Tooltip content="Detalle de la orden">
        <Button onClick={onOpen} variant="contained">
          Ver detalles
        </Button>
      </Tooltip>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
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
                    <h6 className="text-wine">Orden ID: #168012</h6>
                    <p className="text-secondary">Lunes 20 de Ocubre, 2024</p>
                    <Chip
                      className="capitalize"
                      size="sm"
                      variant="flat"
                      color="success"
                    >
                      En proceso
                    </Chip>
                  </div>

                  <form className="col-6 d-flex gap-4">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Estado
                        </InputLabel>
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
                  </form>
                </section>

                {/* Datos de entrega */}
                <section className="mt-3">
                  <div className="row">
                      <div className="col-6 d-flex gap-3 justify-content-center">
                        <div className="flex-grow-1">
                          <div className="d-flex gap-3 align-items-center">
                            <Avatar
                              sx={{ width: 36, height: 36 }}
                              src="/pajaro.jpg"
                            ></Avatar>
                            <h5>Cliente</h5>
                          </div>

                          <div className="px-5">
                            <p>
                              <span className="text-pink">Nombre: </span>Miguel
                              Delgado
                            </p>
                            <p>
                              <span className="text-pink">Correo: </span>
                              miguel@gmail.com
                            </p>
                            <p>
                              <span className="text-pink">Télefono: </span>777 152
                              7761
                            </p>
                          </div>
                          
                        </div>
                      </div>

                      <div className="col-6 d-flex gap-3 align-items-center justify-content-center">
                        <div className="flex-grow-1">
                          <div className="d-flex gap-3 align-items-center">
                            <PedidosIconBlack />
                            <h5>Dirección de entrega</h5>
                          </div>
                          <div className="px-5">
                            <p>
                              <span className="text-pink">Nombre: </span>Miguel
                              Delgado
                            </p>
                            <p>
                              <span className="text-pink">Correo: </span>
                              miguel@gmail.com
                            </p>
                            <p>
                              <span className="text-pink">Télefono: </span>777 152
                              7761
                            </p>
                          </div>
                        </div>
                      </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-6 d-flex gap-3 align-items-center">
                      <div className="flex-grow-1">
                        <div className="d-flex gap-3 align-items-center">
                          <PaymentIcon />
                          <h5>Método de pago</h5>
                        </div>
                        <div className="px-5">
                          <p>
                            <span className="text-pink">Nombre: </span>Miguel
                            Delgado
                          </p>
                          <p>
                            <span className="text-pink">Correo: </span>
                            miguel@gmail.com
                          </p>
                          <p>
                            <span className="text-pink">Télefono: </span>777 152
                            7761
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </section>

                <Divider />

                {/* Productos */}
                <section>
                  {/* <h5 className="text-lg font-semibold mb-2">Productos</h5>
                  <Card className="flex flex-row items-center gap-4 max-w-full p-3 mb-4 border">
                    <Image
                      isZoomed
                      width={200}
                      alt="NextUI Fruit Image with Zoom"
                      src="pajaro.jpg"
                      classNames={{
                        img: "opacity-100", // This should override any existing opacity class
                      }}
                    />
                    <CardBody className="flex flex-col ">
                      <p>
                        <strong>Nombre:</strong> Producto 1
                      </p>
                      <p>
                        <strong>Cantidad:</strong> 2
                      </p>
                      <p className="d-flex gap-2">
                        <strong>Color:</strong>
                        <div className="d-flex gap-2">
                          <ColorCircle color="pink" />
                          <ColorCircle color="red" />
                        </div>
                      </p>
                    </CardBody>
                  </Card> */}
                  {/* Puedes añadir más productos duplicando el Card */}
                  <OrderDetailTable />
                </section>
              </ModalBody>

              <ModalFooter>
                <Button onClick={onClose}>Cerrar</Button>
                <Button color="primary" variant="contained">
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    
  );

}
