import { useState } from 'react';
import { Tooltip } from '@nextui-org/react';  
import Switch from '@mui/material/Switch';

interface ChangeStatusProps {
  id: string;
  initialStatus: boolean;
  type: string; 
}

export default function ChangeStatus({ id, initialStatus, type }: Readonly<ChangeStatusProps>) {
  const [isActive, setIsActive] = useState(initialStatus);

  const handleChangeStatus = () => {
    console.log(`Changing status of ${type} with id ${id}`);
    setIsActive(!isActive); 
  };

  return (
    <Tooltip 
      content={isActive ? "Desactivar" : "Activar"}
    >
      <Switch 
        checked={isActive} 
        onChange={handleChangeStatus} 
        color="primary" 
        inputProps={{ 'aria-label': 'primary checkbox' }} 
      />
    </Tooltip>
  );
}
