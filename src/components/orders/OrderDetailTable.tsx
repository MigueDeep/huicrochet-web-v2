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
import { ProductElement } from "../../interfaces/IOrder";


const columns = [
  { key: "image", label: "Imagen" },
  { key: "product", label: "Producto" },
  { key: "color", label: "Color" },
  { key: "quantity", label: "Cantidad" },
  { key: "price", label: "Precio" },
];

const rowsPerPage = 5;

interface IOrderProducts{
  products: ProductElement[];
}

export const OrderDetailTable = ( { products }: Readonly<IOrderProducts>) => {
  const [page, setPage] = useState(1);

  const pages = Math.ceil(products.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return products.slice(start, end);
  }, [page]);
  

  return (
    <Table
      aria-label="Example table with dynamic content"
      layout="fixed"
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
                {renderCell(item, column.key)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const renderCell = (item: ProductElement, key: string) => {
  switch (key) {
  case "image":
    {
      const imageUri = `http://34.203.104.87:8080/${item.item.images[0].imageUri
        .split("/")
        .pop()}`;
      return imageUri ? <Avatar alt="img" src={imageUri} /> : "Sin imagen";
    }
  case "color":
    return item.item?.color?.colorCod ? (
      <ColorCircle color={item.item.color.colorCod} />
    ) : (
      "Sin color"
    );
  case "product":
    return item.item?.product?.productName || "Sin nombre";
  case "quantity":
    return item.quantity;
  case "price":
    return `$ ${item.item.product.price}`;
  }
  const value = item[key as keyof ProductElement];
  return typeof value === "string" || typeof value === "number" ? value : "N/A";
};
