import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import ColorService from "../../service/ColorService";
import { IColor } from "../../interfaces/IColor";

export default function CreateColorModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const validationSchema = yup.object({
        name: yup.string().required("El nombre del color es requerido"),
        color: yup.string().required("El color es requerido"),
    });

    const formik = useFormik({
        initialValues:{
            id: '',
            colorName: '',
            colorCod: '',
            status: true
        },
        validationSchema: validationSchema,
        onSubmit: async (values: IColor) => {
            console.log(values);
            const response = await ColorService.createColor(values);
            console.log(response);
            formik.resetForm();
            onClose(); 
        }
    });

    return (
        <>
            <Button onClick={onOpen} variant="contained" style={{width: '12em'}}>Crear color</Button>
            <Modal isOpen={isOpen} onOpenChange={(open) => open ? onOpen() : onClose()}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Crear color</ModalHeader>
                    <ModalBody>
                        <TextField
                            label="Nombre"
                            fullWidth
                            placeholder="Nombre del color"
                            name="name" // Agregar el nombre para que formik pueda identificar el campo
                            value={formik.values.colorName}
                            onChange={formik.handleChange}
                            error={formik.touched.colorName && Boolean(formik.errors.colorName)}
                            helperText={formik.touched.colorName && formik.errors.colorName}
                        />
                        <TextField
                            label="Selecciona un color"
                            type="color"
                            fullWidth
                            name="color" // Agregar el nombre para que formik pueda identificar el campo
                            value={formik.values.colorCod}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true }}
                            sx={{ mt: 2 }}
                            error={formik.touched.colorCod && Boolean(formik.errors.colorCod)}
                            helperText={formik.touched.colorCod && formik.errors.colorCod}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="error" onClick={onClose}>
                            Cerrar
                        </Button>
                        <Button color="primary" variant="contained" onClick={
                            () => formik.handleSubmit()
                        }>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
