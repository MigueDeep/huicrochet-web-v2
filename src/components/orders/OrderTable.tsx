import { useState, useMemo } from "react";
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
import OrderDetail from "./OrderDetail";

const rows = [
    {
        key: '1',
        order: "001",
        customer: "Juan Perez",
        email: "jhon@email.com",
        shopping_date: "2024-10-10",
        shipping_date: "2024-10-15",
        status: "activo",
    }
];

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

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return rows.slice(start, end);
  }, [page]);

  return (
    <Table
      aria-label="Example table with dynamic content"
      bottomContent={
        <div className="
          flex w-full justify-center mt-4 pb-4 border-b border-gray-200
          ">
            <Pagination 
              loop showControls 
              color="success" 
              initialPage={1}  page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.key}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {
                 column.key === "actions" ? (
                  <Tooltip
                    showArrow={true}
                    content={
                      item.status === "activo" ? "Desactivar" : "Activar"
                    }
                  >
                    <span className="text-danger cursor-pointer active:opacity-50">
                      <OrderDetail/>
                    </span>
                  </Tooltip>
                ) 
                : column.key === "status" ? (
                  <Chip
                    className="capitalize"
                    size="sm"
                    variant="flat"
                    color={item.status === "activo" ? "success" : "danger"}
                  >
                    {item.status}
                  </Chip>
                ) : (
                  getKeyValue(item, column.key)
                )}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
