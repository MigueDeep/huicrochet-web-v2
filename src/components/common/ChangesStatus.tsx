import { useState } from 'react';
import { Tooltip } from '@nextui-org/react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

interface ChangeStatusProps {
  id: string;
  initialStatus: boolean;
  type: string; 
}

export default function ChangeStatus({ id, initialStatus, type }: ChangeStatusProps) {
  const [isActive, setIsActive] = useState(initialStatus);

  const handleChangeStatus = () => {
    console.log(`Changing status of ${type} with id ${id}`);
    setIsActive(!isActive); 
  };

  return (
    <Tooltip 
      content={isActive ? "Desactivar" : "Activar"}
    >
      <span onClick={handleChangeStatus} className="cursor-pointer">
        {isActive ? (
          <ToggleOnIcon fontSize="large" color="success" /> 
        ) : (
          <ToggleOffIcon fontSize="large" color="error" /> 
        )}
      </span>
    </Tooltip>
  );
}
