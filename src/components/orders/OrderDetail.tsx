import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
  Card,
  CardBody,
  Image,
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
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import { deepPurple } from "@mui/material/colors";
import * as Yup from "yup";
import ColorCircle from "../common/ColorCircle";


export default function OrderDetail() {

  const validationSchema = Yup.object({
    date: Yup.date().required("La fecha es requerida"),
  });


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
          Editar
        </Button>
      </Tooltip>
      <Modal
        size="4xl"
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
                    <h6>Orden ID: #168012</h6>
                    <p>Lunes 20 de Ocubre, 2024</p>
                    <Chip
                      className="capitalize"
                      size="sm"
                      variant="flat"
                      color="success"
                    >
                      En proceso
                    </Chip>
                  </div>

                  <form className="col-6 d-flex gap-4" >
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
                      <DatePicker
                        label="Fecha de entrega"
                      />
                    </Box>
                  </form>
                  
                </section>

                {/* Datos de entrega */}
                <section>
                  <div className="row">
                    <div className="col-6 d-flex gap-5 justify-content-center align-items-center">
                      <Avatar
                        sx={{ bgcolor: deepPurple[500], width: 56, height: 56 }}
                      >
                        MD
                      </Avatar>
                      <div>
                        <h5>Cliente</h5>
                        <p>
                          <strong>Nombre: </strong>Miguel Delgado
                        </p>
                        <p>
                          <strong>Correo: </strong>miguel@gmail.com
                        </p>
                        <p>
                          <strong>Télefono: </strong>777 152 7761
                        </p>
                      </div>
                    </div>
                    <div className="col-6 d-flex gap-5 justify-content-center align-items-center">
                      <Avatar sx={{ width: 56, height: 56 }}>
                        <LocalShippingIcon fontSize="large" htmlColor="black" />
                      </Avatar>

                      <div>
                        <h5>Dirección de entrega</h5>
                        <p>
                          <strong>Nombre: </strong>Miguel Delgado
                        </p>
                        <p>
                          <strong>Correo: </strong>miguel@gmail.com
                        </p>
                        <p>
                          <strong>Télefono: </strong>777 152 7761
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-6 d-flex gap-5 justify-content-center align-items-center">
                      <Avatar sx={{ width: 56, height: 56 }}>
                        <PaymentIcon fontSize="large" htmlColor="black" />
                      </Avatar>

                      <div>
                        <h5>Método de pago</h5>
                        <p>
                          <strong>Nombre: </strong>Miguel Delgado
                        </p>
                        <p>
                          <strong>Correo: </strong>miguel@gmail.com
                        </p>
                        <p>
                          <strong>Télefono: </strong>777 152 7761
                        </p>
                      </div>
                    </div>
                  </div>
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
                  </Card>
                  {/* Puedes añadir más productos duplicando el Card */}
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