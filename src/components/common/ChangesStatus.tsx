import { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button"; // Asegúrate de importar el componente Button

interface ChangeStatusProps {
  id: string;
  initialStatus: boolean;
  type: string;
  onStatusChange: (id: string) => void;
}

export default function ChangeStatus({
  id,
  initialStatus,
  type,
  onStatusChange,
}: Readonly<ChangeStatusProps>) {
  const [isActive, setIsActive] = useState(initialStatus);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const confirmChangeStatus = () => {
    setIsActive((prev) => !prev);
    onStatusChange(id);
    handleCloseDialog();
  };

  return (
    <>
      <Tooltip content={isActive ? "Desactivar" : "Activar"}>
        <Switch
          checked={isActive}
          onChange={handleOpenDialog}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Tooltip>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar acción"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas{" "}
            {isActive ? "desactivar" : "activar"} este {translate(type)}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={handleCloseDialog}>
            Cancelar
          </Button>
          <Button color="primary" onClick={confirmChangeStatus} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const translate = (key: string) => {
  switch (key) {
    case "user":
      return "usuario";
    case "color":
      return "color";
    default:
      return key;
  }
}