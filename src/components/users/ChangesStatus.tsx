import React, { useState } from 'react';
import { Tooltip } from '@nextui-org/react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

interface ChangeStatusProps {
  userId: string;
  initialStatus: boolean; 
}

export default function ChangeStatus({ userId, initialStatus }: ChangeStatusProps) {
  const [isActive, setIsActive] = useState(initialStatus);

  const handleChangeStatus = () => {
    setIsActive(!isActive); 
    console.log(`El estado del usuario con ID ${userId} ha sido cambiado a ${!isActive ? 'Activo' : 'Inactivo'}`);
  };

  return (
    <Tooltip content={isActive ? 'Desactivar usuario' : 'Activar usuario'}>
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
