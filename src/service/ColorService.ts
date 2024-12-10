// src/services/AuthService.ts
import { doPost, doGet, doPut, doPutId } from "../config/Axios";
import { IColor } from "../interfaces/IColor";
import PouchDB from 'pouchdb';
const db = new PouchDB('colorsDB');
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';


const ColorService = {

    createColor: async (data: IColor) => {
        try {
            const response = await doPost("/color", data);
            return response.data;
        } catch (ex) {
            throw new Error("An error occurred while creating color. Please try again.");  
        }
    },

    saveColorOffline: async (data: IColor) => {
        try {
            console.log("Guardando color en PouchDB:", data);
            const id = data.id || uuidv4();
            await db.put({
                ...data,
                _id: id,
                isSynced: false,
            });
            toast.success("Color guardado, se sincronizará cuando vuelva a tener conexión a internet");
        } catch (error) {
            console.error("Error al guardar color en PouchDB:", error);
            throw new Error("Error al guardar color en PouchDB");
        }
    },
    

    syncColors: async () => {
        try {
            // Obtiene todos los documentos de PouchDB
            const allDocs = await db.allDocs({ include_docs: true });
            const unsyncedColors = allDocs.rows
                .map((row) => row.doc)
                .filter((color: any) => !color.isSynced); // Filtra solo los colores no sincronizados
    
            if (unsyncedColors.length === 0) {
                console.log("No hay datos para sincronizar.");
                return;
            }
    
            console.log(`Sincronizando ${unsyncedColors.length} colores...`);
    
            for (const color of unsyncedColors) {
                try {
                    if (color) {
                        const colorData = color as unknown as IColor;
    
                        // Verifica si el color ya existe en el servidor
                        const existingColors = await ColorService.getColors();
                        const colorExists = existingColors.some(
                            (serverColor: IColor) => serverColor.id === colorData.id
                        );
    
                        if (!colorExists) {
                            // Si el color no existe, lo crea en el servidor
                            await ColorService.createColor({
                                id: colorData.id,
                                colorName: colorData.colorName,
                                colorCod: colorData.colorCod,
                                status: colorData.status,
                            });
    
                            // Actualiza el campo isSynced en PouchDB
                            await db.put({
                                ...color,
                                isSynced: true, // Actualiza el estado de sincronización
                                _id: color._id,
                                _rev: color._rev, // Mantiene la revisión actual
                            });
    
                            console.log(`Color con id ${color._id} sincronizado.`);
                        } else {
                            console.log(`Color con id ${color._id} ya existe en el servidor.`);
                        }
                    }
                } catch (error) {
                    console.error("Error al sincronizar color:", error);
                }
            }
    
            toast.success("Sincronización completada.");
        } catch (error) {
            console.error("Error al sincronizar datos:", error);
            throw new Error("Error al sincronizar datos. Intente nuevamente.");
        }
    },
    
    

    getColors: async () => {
        try {
          const response = await doGet("/color", { showToast: false });
          const colors = response.data.data; // Accede al arreglo de colores
          
          console.log(typeof colors); // Debería imprimir "object" (arreglo en JS es un objeto)
          console.log(colors); // Verifica que sea el arreglo de colores esperado
          
          // Modificar los datos y guardarlos en PouchDB
          await db.bulkDocs(
            colors.map((color: any) => ({
              ...color,
              _id: color.id, // Usar el ID como clave en PouchDB
            }))
          );
      
          return colors; // Devuelve los colores originales
        } catch (error) {
          console.error("Error al obtener colores:", error);
          throw new Error("An error occurred while fetching colors. Please try again.");
        }
    },
      
      

    fetchColorsFromPouchDB: async () => {
        try {
          const allDocs = await db.allDocs({ include_docs: true });
          const colors = allDocs.rows.map((row) => row.doc);
          return colors;
        } catch (error) {
          throw new Error('Error al obtener datos de PouchDB');
        }
      },


      updateColor: async (id: string, data: IColor) => {
        try {
            // Intentar actualizar en el servidor
            const response = await doPut(`/color/${id}`, data);
    
            // Si la actualización en el servidor es exitosa, actualiza también en PouchDB
            const existingDoc = await db.get(id);
            await db.put({
                ...existingDoc,
                ...data,
                isSynced: true, 
            });
    
            return response.data;
        } catch (error) {
            console.warn("No se pudo actualizar en el servidor, guardando en PouchDB");
            try {
                // Actualizar localmente si el servidor no está disponible
                const existingDoc = await db.get(id);
                await db.put({
                    ...existingDoc,
                    ...data,
                    isSynced: false, // Asegurarse de que no está sincronizado
                });
    
                toast.success("Actualización guardada localmente. Se sincronizará más tarde.");
            } catch (pouchError) {
                console.error("Error al actualizar localmente en PouchDB:", pouchError);
                throw new Error("No se pudo actualizar el color ni localmente ni en el servidor.");
            }
        }
    },
    

    changeColorStatus: async (id: string) => {
        try {
            const response = await doPutId(`/color/changeStatus/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while disabling color. Please try again.");
        }
    },

    

};


export default ColorService;
