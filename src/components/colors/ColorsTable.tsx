import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
  ButtonGroup,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import ChangeStatus from "../common/ChangesStatus";
import CreateColorModal from "../../components/colors/CreateColor";
import EditColorModal from "./EditColor";
import { IColor } from "../../interfaces/IColor";
import ColorService from "../../service/ColorService";

const columns = [
  { key: "color", label: "COLOR" },
  { key: "name", label: "NOMBRE" },
  { key: "status", label: "ESTADO" },
  { key: "actions", label: "ACCIONES" },
];

const rowsPerPage = 5;

export default function OrdersTable() {
  const [colorsData, setColorsData] = useState<IColor[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await ColorService.getColors();

        if (response.error) {
          toast.error("Error al cargar los colores");
        } else {
          setColorsData(response.data); 
        }
      } catch (error) {
        toast.error("Error al cargar los colores");
      }
    };
    fetchColors();
  }, []);

  const pages = Math.ceil(colorsData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return colorsData.slice(start, end);
  }, [page, colorsData]);

  return (
    <>
      <div className="row d-flex justify-content-end mb-4">
        <CreateColorModal />
      </div>
      <div className="row">
        <Table
          aria-label="Example table with dynamic content"
          bottomContent={
            <div className="flex w-full justify-center pb-4 border-b border-gray-200">
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
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {renderCellContent(column.key, item)}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function renderCellContent(key: string, item: IColor) {
  switch (key) {
    case "color":
      return (
        <div className="d-flex gap-2">
          <div
            style={{
              backgroundColor: item.colorCod,
              width: 20,
              height: 20,
              borderRadius: "50%",
            }}
          ></div>
          <p>{item.colorCod}</p>
        </div>
      );
    case "actions":
      return (
        <ButtonGroup className="gap-2">
          <EditColorModal id={item.id} />
          <ChangeStatus id={item.id} initialStatus={item.status} type="color" />
        </ButtonGroup>
      );
    case "status":
      return (
        <Chip
          className="capitalize"
          size="sm"
          variant="flat"
          color={item.status ? "success" : "danger"}
        >
          {item.status ? "Activo" : "Desactivado"}
        </Chip>
      );
    default:
      return (
        <p className="text-sm font-medium">{item.colorName}</p>
      );
  }
}
