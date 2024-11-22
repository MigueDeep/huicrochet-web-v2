import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import ColorCircle from "../common/ColorCircle";
import Avatar from "@mui/material/Avatar";

const rows = [
  {
    id: "1",
    image: "/pajaro.jpg",
    product: "Pajaro",
    color: "blue",
    quantity: "2",
    price: "$100",
  },
  {
    id: "2",
    image: "/sueterazul.jpg",
    product: "Gato",
    color: "black",
    quantity: "1",
    price: "$200",
  },
  {
    id: "3",
    image: "/perro.jpeg",
    product: "Perro",
    color: "brown",
    quantity: "3",
    price: "$300",
  },
  {
    id: "4",
    image: "/pajaro.jpg",
    product: "Pez",
    color: "orange",
    quantity: "4",
    price: "$400",
  },
];

const columns = [
  { key: "image", label: "Imagen" },
  { key: "product", label: "Producto" },
  { key: "color", label: "Color" },
  { key: "quantity", label: "Cantidad" },
  { key: "price", label: "Precio" },
];

const rowsPerPage = 10;

export const OrderDetailTable = () => {
  const [page, setPage] = useState(1);

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return rows.slice(start, end);
  }, [page]);

  return (
    <>
      <Table
        aria-label="Example table with dynamic content"
        bottomContent={
          <div className="flex w-full justify-center mt-4 pb-4 border-b border-gray-200">
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
          {(column: { key: string; label: string }) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent={"No hay productos para mostrar"}>
          {(item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === "image" ? (
                    <Avatar alt={item.product} src={item.image} />
                  ) : column.key === "color" ? (
                    <ColorCircle color={item.color} />
                  ) : (
                    item[column.key as keyof typeof item]
                  )}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
