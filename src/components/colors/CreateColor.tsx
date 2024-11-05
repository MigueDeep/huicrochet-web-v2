import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

export default function CreateColorModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const validationSchema = yup.object({
        name: yup.string().required("El nombre es requerido"),
        color: yup.string().required("El color es requerido"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            color: "#000000",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
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
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            label="Selecciona un color"
                            type="color"
                            fullWidth
                            name="color" // Agregar el nombre para que formik pueda identificar el campo
                            value={formik.values.color}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true }}
                            sx={{ mt: 2 }}
                            error={formik.touched.color && Boolean(formik.errors.color)}
                            helperText={formik.touched.color && formik.errors.color}
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
