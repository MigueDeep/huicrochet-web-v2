// EditColorModal.jsx
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Tooltip } from "@nextui-org/react";
import { Button, TextField, IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import EditIcon from '@mui/icons-material/Edit';

export default function EditColorModal({ id }: Readonly<{ id: string }>) { 
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
            console.log(id);
            console.log(values);
            formik.resetForm();
            onClose();
        }
    });

    return (
        <>
            <Tooltip content="Editar color" placement="top">
                <IconButton
                    color="primary"
                    size="small"
                    onClick={onOpen}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={(open) => open ? onOpen() : onClose()}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Crear color</ModalHeader>
                    <ModalBody>
                        <TextField
                            label="Nombre"
                            fullWidth
                            placeholder="Nombre del color"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            label="Selecciona un color"
                            type="color"
                            fullWidth
                            name="color"
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
                        <Button color="primary" variant="contained" onClick={() => formik.handleSubmit()}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
