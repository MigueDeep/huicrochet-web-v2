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
  Typography,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import PaymentIcon from "@mui/icons-material/Payment";
import { PedidosIconBlack } from "../../utils/icons";
import { OrderDetailTable } from "./OrderDetailTable";
import { useState } from "react";

export default function OrderDetail() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const status = [
    { value: "1", label: "En proceso", color: "warning" },
    { value: "2", label: "Enviado", color: "primary" },
    { value: "3", label: "Entregado", color: "success" },
  ];
  const [selectedStatus, setSelectedStatus] = useState("1");

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
              <ModalHeader className="flex flex-col items-center gap-2">
                <Typography variant="h6">Detalle de la Orden</Typography>
                <Chip
                  color={
                    (status.find((s) => s.value === selectedStatus)?.color as
                      | "success"
                      | "default"
                      | "primary"
                      | "secondary"
                      | "warning"
                      | "danger") || "default"
                  }
                  size="md"
                  variant="flat"
                >
                  {status.find((s) => s.value === selectedStatus)?.label || ""}
                </Chip>
              </ModalHeader>
              <ModalBody className="max-h-[60vh] overflow-y-auto">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      Orden ID: #168012
                    </Typography>
                    <Typography color="text.secondary">
                      Lunes 20 de Octubre, 2024
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>Estado</InputLabel>
                        <Select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          label="Estado"
                        >
                          {status.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker label="Fecha de entrega" />
                    </Grid>
                  </Grid>
                </Grid>

                <Divider className="my-4" />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        src="/pajaro.jpg"
                        sx={{ width: 40, height: 40 }}
                      />
                      <Typography variant="h6">Cliente</Typography>
                    </Box>
                    <Box ml={5}>
                      <Typography>
                        <span className="text-semibold text-pink">Nombre:</span>{" "}
                        Miguel Delgado
                      </Typography>
                      <Typography>
                        <span className="text-semibold text-pink">Correo:</span>{" "}
                        miguel@gmail.com
                      </Typography>
                      <Typography>
                        <span className="text-semibold text-pink">
                          Teléfono:
                        </span>{" "}
                        777 152 7761
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <PedidosIconBlack />
                      <Typography variant="h6">Dirección de entrega</Typography>
                    </Box>
                    <Box ml={5}>
                      <Typography>
                        <span className="text-semibold text-pink">
                          Dirección:
                        </span>{" "}
                        Calle Falsa 123, Ciudad, País
                      </Typography>
                      <Typography>
                        <span className="text-semibold text-pink">CP:</span>{" "}
                        12345
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Divider className="my-4" />

                <Box display="flex" alignItems="center" gap={2} mt={2}>
                  <PaymentIcon />
                  <Typography variant="h6">Método de pago</Typography>
                </Box>
                <Box ml={5}>
                  <Typography>
                    <span className="text-semibold text-pink">Método:</span>{" "}
                    Tarjeta de crédito
                  </Typography>
                  <Typography>
                    <span className="text-semibold text-pink">Número:</span>{" "}
                    **** **** **** 1234
                  </Typography>
                  <Typography>
                    <span className="text-semibold text-pink">Titular:</span>{" "}
                    Miguel Delgado
                  </Typography>
                  <Typography>
                    <span className="text-semibold text-pink">Fecha:</span>{" "}
                    10/24
                  </Typography>
                </Box>

                <Divider className="my-4" />
                <p className="text-wine text-semibold"> Productos ordenados</p>
                <OrderDetailTable />
              </ModalBody>

              <ModalFooter>
                <Button onClick={onClose} variant="outlined" color="secondary">
                  Cerrar
                </Button>
                <Button
                  onClick={() => alert("Cambios guardados")}
                  variant="contained"
                  color="primary"
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
