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
import {
  Avatar,
  Box,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { format } from "@formkit/tempo"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PaymentIcon from "@mui/icons-material/Payment";
import { PedidosIconBlack } from "../../utils/icons";
import { OrderDetailTable } from "./OrderDetailTable";
import { IOrder } from "../../interfaces/IOrder";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
interface IOrderDetailProps {
  order: IOrder;
}

const steps = [
    "Pendiente",
    "Enviado",
    "Entregado",
];


export default function OrderDetail( { order }: IOrderDetailProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content="Detalle de la orden">
        <IconButton onClick={onOpen} >
          <RemoveRedEyeIcon/>
        </IconButton>
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
                  color={renderColor(order.orderState)}
                  size="md"
                  variant="flat"
                  className="capitalize"
                >
                  {traduceStatus(order.orderState)}
                </Chip>
                <Box sx={{ width: '100%' }} mt={2}>
                  <Stepper activeStep={
                    order.orderState === "PENDING" ? 0 : 
                    order.orderState === "SHIPPED" ? 1 :
                    order.orderState === "DELIVERED" ? 3 : 0
                  } alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </ModalHeader>
              <ModalBody className="max-h-[60vh] overflow-y-auto">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      Orden ID: <span className="text-semibold">#{formatId(order.id)}</span>
                    </Typography>
                    <Typography color="text.secondary">
                        {formatDate(order.orderDate)}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider className="my-4" />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={2}>
                      {
                        order.shippingAddress.user.image?.imageUri ? (
                          <Avatar
                            alt={order.shippingAddress.user.fullName}
                            src={`http://localhost:8080/${order.shippingAddress.user.image.imageUri.split("/").pop()}`}
                          />
                        ) : (
                          <Avatar>{order.shippingAddress.user.fullName.charAt(0).toUpperCase()}</Avatar>
                        )
                      }
                      <Typography variant="h6">Cliente</Typography>
                    </Box>
                    <Box ml={7}>
                      <Typography>
                        <span className="text-semibold text-pink">Nombre:</span>{" "}
                        {order.shippingAddress.user.fullName}
                      </Typography>
                      <Typography>
                        <span className="text-semibold text-pink">Correo:</span>{" "}
                        {order.shippingAddress.user.email}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <PedidosIconBlack />
                      <Typography variant="h6">Dirección de entrega</Typography>
                    </Box>
                    <Box ml={6}>
                      <Typography>
                        <span className="text-semibold text-pink">
                          Dirección:
                        </span>{" "}
                        {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}
                      </Typography>
                      <Typography>
                        <span className="text-semibold text-pink">CP:</span>{" "}
                        {order.shippingAddress.zipCode}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box display="flex" alignItems="center" gap={2} mt={2}>
                  <PaymentIcon />
                  <Typography variant="h6">Método de pago</Typography>
                </Box>
                <Box ml={5}>
                  <Typography>
                    <span className="text-semibold text-pink">Método:</span>{" "}
                    {
                      order.paymentMethod.cardType === "credit" ? "Tarjeta de crédito" : "Tarjeta de débito"
                    }
                  </Typography>
                  <Typography>
                    <span className="text-semibold text-pink">Número:</span>{" "}
                    **** **** **** **** {order.paymentMethod.cardNumber.slice(-4)} 
                  </Typography>
                  <Typography>
                    <span className="text-semibold text-pink">Titular:</span>{" "}
                    {order.shippingAddress.user.fullName}
                  </Typography>
                  <Typography>
                    <span className="text-semibold text-pink">Fecha:</span>{" "}
                    {order.paymentMethod.expirationDate}
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

const formatId = (id: string) => {
  return id.slice(0, 8);
}

 const formatDate = (date: Date) => {
  const readable = format(date, "full")
  return readable
}

const traduceStatus = (status: string) => {
  switch (status) {
    case "PENDING":
      return "Pendiente";
    case "SHIPPED":
      return "Enviado";
    case "DELIVERED":
      return "Entregado";
    default:
      return status;
  }
}

const renderColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "warning";
    case "SHIPPED":
      return "secondary";
    case "DELIVERED":
      return "success";
    default:
      return "danger";
  }
}