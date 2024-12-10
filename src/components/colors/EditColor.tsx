import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tooltip } from "@nextui-org/react";
import { Button, CircularProgress, TextField, IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import ColorService from "../../service/ColorService";
import { IColor } from "../../interfaces/IColor";
import { useState } from "react";


export default function EditColorModal({ id, colorName, colorCod, onColorUpdated }: Readonly<{ id: string, colorName: string, colorCod: string, onColorUpdated: () => void }>) {
    const { isOpen, onOpen, onClose } = useDisclosure(); 
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object({
        colorName: yup.string().required("El nombre del color es requerido"),
        colorCod: yup.string().required("El código de color es requerido"),
    });

    const formik = useFormik({
        initialValues: {
            id: id,
            colorName: colorName || "",
            colorCod: colorCod || "#FFFFFF",
            status: true,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async (values: IColor) => {
            setLoading(true);
            try {
                // Intentar actualizar el color
                await ColorService.updateColor(id, values);
                onColorUpdated();
            } catch (error) {
                console.error("Error al actualizar el color:", error);
            } finally {
                setLoading(false);
                formik.resetForm();
                onClose();
            }
        },        
    });

    return (
        <>
            <Tooltip content="Editar color" placement="top">
                <IconButton color="primary" size="small" onClick={onOpen}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Editar color</ModalHeader>
                    <ModalBody>
                        <TextField
                            label="Nombre"
                            fullWidth
                            placeholder="Nombre del color"
                            name="colorName"
                            value={formik.values.colorName}
                            onChange={formik.handleChange}
                            error={formik.touched.colorName && Boolean(formik.errors.colorName)}
                            helperText={formik.touched.colorName && formik.errors.colorName}
                        />
                        <TextField
                            label="Selecciona un color"
                            type="color"
                            fullWidth
                            name="colorCod"
                            value={formik.values.colorCod}
                            onChange={formik.handleChange}
                            sx={{ mt: 2 }}
                            error={formik.touched.colorCod && Boolean(formik.errors.colorCod)}
                            helperText={formik.touched.colorCod && formik.errors.colorCod}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="error" onClick={onClose}>
                            Cerrar
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => formik.handleSubmit()}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Guardar"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
