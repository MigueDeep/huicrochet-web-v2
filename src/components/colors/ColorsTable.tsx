import { useState, useMemo, useEffect, useCallback } from "react";
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
import ChangeStatus from "../common/ChangesStatus";
import CreateColorModal from "../../components/colors/CreateColor";
import EditColorModal from "./EditColor";
import { IColor } from "../../interfaces/IColor";
import ColorService from "../../service/ColorService";
import Lottie from "lottie-react";
import animationData from "../../utils/animation.json";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  { key: "color", label: "COLOR" },
  { key: "name", label: "NOMBRE" },
  { key: "status", label: "ESTADO" },
  { key: "actions", label: "ACCIONES" },
];

const rowsPerPage = 10;

export default function ColorsTable() {
  const [colorsData, setColorsData] = useState<IColor[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchColors = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ColorService.getColors();
      setColorsData(response.data);
    } catch (error) {
      console.error("Error al cargar colores:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  const handleStatusChange = async (id: string) => {
    try {
      setColorsData((prevColors) =>
        prevColors.map((color) =>
          color.id === id ? { ...color, status: !color.status } : color
        )
      );
      await ColorService.changeColorStatus(id);
    } catch (error) {
      console.error("Error al actualizar el estado del color:", error);
    }
  };

  const pages = Math.ceil(colorsData.length / rowsPerPage);
  const filteredColors = useMemo(() => {
    if (!searchTerm) return colorsData;
    return colorsData.filter((color) =>
      color.colorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, colorsData]);

  const items = useMemo(() => {
    if (isLoading) return [];
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredColors.slice(start, end);
  }, [page, filteredColors, isLoading]);

  return (
    <>
      <div className="row d-flex justify-content-end mb-4">
        <CreateColorModal onColorCreated={fetchColors} />
      </div>
      <div className="col-6 mb-2">
        <TextField
          label="Busqueda"
          placeholder="Ingresa el nombre del color"
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
          <TableBody
            isLoading={isLoading}
            loadingContent={
              <div style={{ height: "100px", width: "100px" }}>
                <Lottie animationData={animationData} width={50} height={50} />
              </div>
            }
            emptyContent={"No hay colores para mostrar"}
            items={items}
          >
            {(item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {renderCellContent(
                      column.key,
                      item,
                      handleStatusChange,
                      fetchColors
                    )}
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

function renderCellContent(
  key: string,
  item: IColor,
  handleStatusChange: (id: string) => void,
  fetchColors: () => void
) {
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
          <EditColorModal
            id={item.id}
            colorName={item.colorName}
            colorCod={item.colorCod}
            onColorUpdated={fetchColors}
          />
          <ChangeStatus
            id={item.id}
            initialStatus={item.status}
            type="color"
            onStatusChange={handleStatusChange}
          />
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
      return <p className="text-sm font-medium">{item.colorName}</p>;
  }
}
