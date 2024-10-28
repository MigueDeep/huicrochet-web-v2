import { useState } from "react";
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
import { deepPurple } from "@mui/material/colors";
import ColorCircle from "../common/ColorCircle";
import { useFormik } from "formik";
import { date } from "yup";
import { form } from "framer-motion/client";
import dayjs from "dayjs";

export default function OrderDetail() {
  const [status, setStatus] = useState("En proceso");
  
  const changeStatus = (newStatus: string) => {
    setStatus(newStatus);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      status: status,
      date: dayjs().format("YYYY-MM-DD"),
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

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
                    <p>Lunes 20 de Octubre, 2024</p>
                    <Chip
                      className="capitalize"
                      size="sm"
                      variant="flat"
                      color="success"
                    >
                      {status}
                    </Chip>
                  </div>

                  <form className="col-6 d-flex gap-4" onSubmit={formik.handleSubmit}>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="status-label">Estado</InputLabel>
                        <Select
                          labelId="status-label"
                          id="status"
                          value={formik.values.status}
                          onChange={(e) => changeStatus(e.target.value)}
                        >
                          <MenuItem value={"En proceso"}>En proceso</MenuItem>
                          <MenuItem value={"Enviado"}>Enviado</MenuItem>
                          <MenuItem value={"Entregado"}>Entregado</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                      <DatePicker
                        label="Fecha de entrega"
                        disabled={status !== "En proceso"}
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
                </section>

                <Divider />

                {/* Productos */}
                <section>
                  <h5 className="text-lg font-semibold mb-2">Productos</h5>
                  <Card className="flex flex-row items-center gap-4 max-w-full p-3 mb-4 border">
                    <Image
                      isZoomed
                      width={200}
                      alt="Producto"
                      src="pajaro.jpg"
                    />
                    <CardBody className="flex flex-col">
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
                </section>
              </ModalBody>

              <ModalFooter>
                <Button onClick={onClose}>Cerrar</Button>
                <Button 
                  color="primary" 
                  variant="contained"
                  type="submit"
                >
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
