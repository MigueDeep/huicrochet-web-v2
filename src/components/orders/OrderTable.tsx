import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
} from "@nextui-org/react";
import Lottie from "lottie-react";
import { format } from "@formkit/tempo";
import animationData from "../../utils/animation.json";
import OrderDetail from "./OrderDetail";
import { IOrder } from "../../interfaces/IOrder";
import OrderService from "../../service/OrderService";
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
  { key: "order", label: "ORDEN" },
  { key: "customer", label: "CLIENTE" },
  { key: "email", label: "CORREO" },
  { key: "shopping_date", label: "FECHA DE COMPRA" },
  { key: "shipping_date", label: "FECHA ESTIMADA DE ENTREGA" },
  { key: "status", label: "ESTADO" },
  { key: "actions", label: "ACCIONES" },
];

const rowsPerPage = 10;

export default function OrdersTable() {
  const [page, setPage] = useState(1);
  const [ordersData, setOrdersData] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const updateOrderState = (id: string, newStatus: string) => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, orderState: newStatus } : order
      )
    );
  };

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await OrderService.getOrders();
      setOrdersData(response.data);
    } catch (error) {
      console.error("Error al cargar ordenes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const pages = Math.ceil(ordersData.length / rowsPerPage);
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return ordersData;
    return ordersData.filter((order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, ordersData]);

  const items = useMemo(() => {
    if (isLoading) return [];
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredOrders.slice(start, end);
  }, [page, filteredOrders, isLoading]);

  return (
    <>
      <div className="col-6 mb-2">
        <TextField
          label="Busqueda"
          placeholder="Ingresa el ID de la orden"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>
      <Table
        aria-label="Example table with dynamic content"
        bottomContent={
          <div
            className="
          flex w-full justify-center mt-4 pb-4 border-b border-gray-200
          "
          >
            <Pagination
              loop
              showControls
              color="success"
              initialPage={1}
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={
            <div className="flex justify-center items-center">
              <Lottie
                animationData={animationData}
                style={{ width: 100, height: 100 }}
              />
            </div>
          }
          items={items}
          emptyContent={"No hay ordenes para mostrar"}
        >
          {items.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <p className="text-sm font-semibold">{formatId(order.id)}</p>
              </TableCell>
              <TableCell>{order.shippingAddress.user.fullName}</TableCell>
              <TableCell>{order.shippingAddress.user.email}</TableCell>
              <TableCell>{format(order.orderDate, "long")}</TableCell>
              <TableCell>
                {format(order.orderDetails.estimatedDeliveryDate, "long")}
              </TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  size="sm"
                  variant="flat"
                  color={renderColor(order.orderState)}
                >
                  {traduceStatus(order.orderState)}
                </Chip>
              </TableCell>
              <TableCell>
                <OrderDetail order={order} onOrderUpdate={updateOrderState} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

const formatId = (id: string) => {
  return id.slice(0, 8);
};

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
};

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
};
