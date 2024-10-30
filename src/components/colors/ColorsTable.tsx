import { useState, useMemo } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Chip,
    Pagination,
    ButtonGroup,
} from "@nextui-org/react";
import ColorCircle from "../common/ColorCircle";
import ChangeStatus from "../common/ChangesStatus";
import EditColorModal from "./EditColor";

const rows = [
    {
        key: '1',
        color: "#FF0000",
        name: "Rojo",
        status: "activo",
    },
    {
        key: '2',
        color: "#00FF00",
        name: "Verde",
        status: "deshabilitado",
    },
    {
        key: '3',
        color: "#0000FF",
        name: "Azul",
        status: "activo",
    },
    {
        key: '4',
        color: "#FFFF00",
        name: "Amarillo",
        status: "activo",
    },
    {
        key: '5',
        color: "#FF00FF",
        name: "Morado",
        status: "deshabilitado",
    },
    {
        key: '6',
        color: "#00FFFF",
        name: "Cyan",
        status: "deshabilitado",
    },
];

const columns = [
    { key: "color", label: "COLOR" },
    { key: "name", label: "NOMBRE" },
    { key: "status", label: "ESTADO" },
    { key: "actions", label: "ACCIONES" },
];

const rowsPerPage = 5;

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
                <div className="flex w-full justify-center mt-4 pb-4 border-b border-gray-200">
                    <Pagination
                        loop showControls
                        color="success"
                        initialPage={1} page={page}
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
                                    column.key === "color" ? (
                                        <ColorCircle color={item.color} />
                                    ) : column.key === "actions" ? (
                                        <ButtonGroup
                                            className="gap-2"
                                        >
                                            <EditColorModal id={item.key} />
                                            <ChangeStatus
                                                id={item.key}
                                                initialStatus={item.status === "activo"}
                                                type="color"
                                            />
                                        </ButtonGroup>


                                    ) : column.key === "status" ? (
                                        <Chip
                                            className="capitalize"
                                            size="sm"
                                            variant="flat"
                                            color={item.status === "activo" ? "success" : "danger"}
                                        >
                                            {item.status}
                                        </Chip>
                                    ) :
                                        (
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
