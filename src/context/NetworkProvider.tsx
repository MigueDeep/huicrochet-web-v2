import React, { createContext, useContext, useEffect, useState } from "react";
import ColorService from "../service/ColorService";

interface NetworkContextProps {
  isOffline: boolean;
}

const NetworkContext = createContext<NetworkContextProps>({ isOffline: false });

export const useNetwork = () => useContext(NetworkContext);

const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOffline(!navigator.onLine);
    };
  
    const handleOnline = async () => {
      console.log("Conexión restaurada. Iniciando sincronización...");
      try {
        // Llama a la función de sincronización cuando vuelvas a estar en línea
        await ColorService.syncColors();
        console.log("Sincronización completada.");
        //llama el servicio de get colors despuesde sincronizar
        await ColorService.getColors();
      } catch (error) {
        console.error("Error durante la sincronización automática:", error);
      }
    };
  
    const preventPageRefresh = (event: Event) => {
      if (!navigator.onLine) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
  
    // Inicializa el estado basado en la conexión actual
    updateNetworkStatus();
  
    // Agrega listeners para cambios de conexión
    window.addEventListener("online", handleOnline); // Escucha el evento `online`
    window.addEventListener("offline", updateNetworkStatus);
    window.addEventListener("beforeunload", preventPageRefresh);
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (!navigator.onLine && (event.key === "F5" || (event.ctrlKey && event.key === "r"))) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  
    // Limpia los listeners al desmontar el componente
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", updateNetworkStatus);
      window.removeEventListener("beforeunload", preventPageRefresh);
      document.removeEventListener("keydown", preventPageRefresh);
    };
  }, []);
  

  return (
    <NetworkContext.Provider value={{ isOffline }}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
