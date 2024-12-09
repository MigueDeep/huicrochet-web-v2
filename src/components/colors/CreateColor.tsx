import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import ColorService from "../../service/ColorService";
import { IColor } from "../../interfaces/IColor";
import { useEffect, useRef, useState } from "react";

export default function CreateColorModal({ onColorCreated: onColorCreated }: { onColorCreated: () => void }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isOffline, setIsOffline] = useState<boolean>(false);
    const isOfflineRef = useRef(false);

    useEffect(() => {
        const updateNetworkStatus = () => {
            isOfflineRef.current = !navigator.onLine;
            setIsOffline(isOfflineRef.current); // Actualiza el estado para re-renderizar si es necesario
            console.log(`Modo ${navigator.onLine ? "online" : "offline"}`);
        };

        updateNetworkStatus(); // Llama la función una vez inicialmente

        window.addEventListener("online", updateNetworkStatus);
        window.addEventListener("offline", updateNetworkStatus);

        return () => {
            window.removeEventListener("online", updateNetworkStatus);
            window.removeEventListener("offline", updateNetworkStatus);
        };
    }, []); // Array de dependencias vacío

    const validationSchema = yup.object({
        colorName: yup.string().required("El nombre del color es requerido"),
        colorCod: yup.string().required("El código de color es requerido"),
    });

    const formik = useFormik({
        initialValues: {
            id: "",
            colorName: "",
            colorCod: "#FFFFFF",
            status: true,
        },
        validationSchema: validationSchema,
        onSubmit: async (values: IColor, { setSubmitting }) => {
            try {
                if (!isOffline) {
                    await ColorService.createColor(values); // Guardar en el servidor
                } else {
                    await ColorService.saveColorOffline(values); // Guardar en PouchDB
                    toast.success("Color guardado localmente hasta que se restablezca la conexión.");
                }
                formik.resetForm();
                onClose();
                onColorCreated();
            } catch (error: any) {
                toast.error(
                    error.message || "Error al procesar el color. Intente nuevamente."
                );
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>
            <Button onClick={onOpen} variant="contained" style={{ width: "12em" }}>
                Crear color
            </Button>
            <Modal isOpen={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Crear color</ModalHeader>
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
                            disabled={false} // No deshabilitar el campo para edición
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
                            disabled={false} // No deshabilitar el campo para edición
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
                            disabled={formik.isSubmitting || isOffline} // Deshabilitar solo si estamos offline
                        >
                            {formik.isSubmitting ? <CircularProgress size={24} /> : "Guardar"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
