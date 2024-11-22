import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Tooltip,
  Chip,
  Pagination,
} from "@nextui-org/react";
import animationData from "../../utils/animation.json";
import OrderDetail from "./OrderDetail";
import { IOrder } from "../../interfaces/IOrder";
import Lottie from "lottie-react";
import OrderService from "../../service/OrderService";


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
  

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await OrderService.getOrders();
      setOrdersData(response.data);
      console.log(response.data);
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

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return ordersData.slice(start, end);
  }, [page, ordersData]);


  return (
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
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody 
        isLoading={isLoading}
        loadingContent={
          <div className="flex justify-center items-center">
            <Lottie animationData={animationData} style={{ width: 100, height: 100 }} />
          </div>
        }        
        items={items} emptyContent={"No hay ordenes para mostrar"}>
        {(item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={column.key}>{renderCell(item, column.key)}</TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}


const renderCell = (item: IOrder, columnKey: string) => {
  switch (columnKey) {
    case "status":
      return (
        <Chip
          className="capitalize"
          size="sm"
          variant="flat"
          color={renderColor(item.orderState)}
        >
          {traduceStatus(item.orderState)}
        </Chip>
      );
    case 'order':
      return(
        <p className="text-sm font-semibold">
          {formatId(item.id)}
        </p>
      )
    case 'customer':
      return(
        <p className="text-sm">
          {item.shippingAddress.user.fullName}
        </p>
      ) 
    case 'email':
      return(
        <p className="text-sm">
          {item.shippingAddress.user.email}
        </p>
      ) 
    case 'shopping_date':
      return(
        <p className="text-sm">
          {formatDate(item.orderDate)}
        </p>
      )
    case 'actions':
      return(
        <OrderDetail order={item} />
      )
    default:
      return getKeyValue(item, columnKey);
  }
};

const formatId = (id: string) => {
  return id.slice(0, 8);
}

 const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString();
}

const traduceStatus = (status: string) => {
  switch (status) {
    case "PENDING":
      return "Pendiente";
    case "SHIPPED":
      return "Enviado";
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
    default:
      return "danger";
  }
}