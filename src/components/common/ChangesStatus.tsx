import { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import Switch from "@mui/material/Switch";

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

  const handleChangeStatus = () => {
    if (type === "color") {
      setIsActive((prev) => !prev);
      onStatusChange(id);
    }
  };

  return (
    <Tooltip content={isActive ? "Desactivar" : "Activar"}>
      <Switch
        checked={isActive}
        onChange={handleChangeStatus}
        color="primary"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </Tooltip>
  );
}
