// src/services/AuthService.ts
import { doPost, doGet, doPut, doPutId } from "../config/Axios";
import { IColor, IColorPouchDB } from "../interfaces/IColor";
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
            // Obtén todos los documentos de PouchDB
            const allDocs = await db.allDocs({ include_docs: true });
            const unsyncedColors = allDocs.rows
                .map((row) => row.doc)
                .filter((color: any) => !color.isSynced); // Filtra solo los colores no sincronizados
    
            if (unsyncedColors.length === 0) {
                console.log("No hay datos para sincronizar.");
                return;
            }
     
            console.log(`Sincronizando ${unsyncedColors.length} colores...`);
    
            // Obtén los colores existentes en el servidor
            const existingColors = await ColorService.getColors();
    
            for (const color of unsyncedColors) {
                try {
                    if (color) {
                        const colorData = color as unknown as IColor;
    
                        // Encuentra el color correspondiente en el servidor
                        const existingColor = existingColors.find(
                            (serverColor: IColor) => serverColor.id === colorData.id
                        );
    
                        if (existingColor) {
                            // Actualiza el estado si es diferente
                            if (existingColor.status !== colorData.status) {
                                await ColorService.changeColorStatus(colorData.id);
                                console.log(`Estado del color con id ${colorData.id} actualizado.`);
                            }
    
                            // Verifica otros cambios
                            const hasChanges =
                                existingColor.colorName !== colorData.colorName ||
                                existingColor.colorCod !== colorData.colorCod;
    
                            if (hasChanges) {
                                await ColorService.updateColor(colorData.id, {
                                    id: colorData.id,
                                    colorName: colorData.colorName,
                                    colorCod: colorData.colorCod,
                                    status: colorData.status,
                                });
                                console.log(`Color con id ${colorData.id} actualizado.`);
                            }
                        } else {
                            // Si el color no existe en el servidor, lo crea
                            await ColorService.createColor({
                                id: colorData.id,
                                colorName: colorData.colorName,
                                colorCod: colorData.colorCod,
                                status: colorData.status,
                            });
                            console.log(`Color con id ${colorData.id} creado.`);
                        }
    
                        // Marca el color como sincronizado en PouchDB
                        await db.put({
                            ...color,
                            isSynced: true, // Actualiza el estado de sincronización
                            _id: color._id,
                            _rev: color._rev, // Mantiene la revisión actual
                        });
                    }
                } catch (error) {
                    console.error(`Error al sincronizar color con id`, error);
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
            const colors = response.data.data;
    
            // Modificar los datos y guardarlos en PouchDB
            for (const color of colors) {
                try {
                    const existingDoc = await db.get(color.id);
                     // Si existe, actualiza
                        await db.put({
                            ...existingDoc,
                            ...color,
                            _id: color.id,
                          });
                } catch (error) {
                  if ((error as any).status === 404) {
                       await db.put({
                            ...color,
                           _id: color.id,
                          });
                  }
                }
            }
    
            return colors;
        } catch (error) {
            console.error("Error al obtener colores:", error);
            throw new Error("An error occurred while fetching colors. Please try again.");
        }
    },
      
      

    fetchColorsFromPouchDB: async () => {
        try {
            const allDocs = await db.allDocs({ include_docs: true });
            let colors = allDocs.rows.map((row) => row.doc as IColorPouchDB);
    
            // Filtra los colores para eliminar duplicados basándonos en el nombre
            const uniqueColors = colors.filter((color, index, self) =>
                index === self.findIndex((c) => (
                    c.colorName === color.colorName
                ))
            );
    
            return uniqueColors;
        } catch (error) {
            console.error('Error al obtener datos de PouchDB', error);
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
    

    changeColorStatus: async (id: string, data?: IColor) => {
        try {
            console.log("Cambiando estado del color con id", data);

            // Intentar actualizar en el servidor primero
            const response = await doPutId(`/color/changeStatus/${id}`);
            
            // Si la actualización en el servidor es exitosa, reflejar el cambio en PouchDB
            const existingDoc = await db.get(id) as IColor;
            console.log("existingDoc", existingDoc);
            await db.put({
                ...existingDoc,
                status: !existingDoc.status, // Cambia el estado localmente
                isSynced: true, // Marca como sincronizado
                _rev: existingDoc._rev, // Mantén la revisión de PouchDB
            });
    
            return response.data;
        } catch (error) {
            console.warn("No se pudo actualizar en el servidor, guardando cambio en PouchDB");
            try {
                // Actualizar localmente en PouchDB si el servidor no está disponible
                const existingDoc = await db.get(id) as IColor;
                await db.put({
                    ...existingDoc,
                    status: !existingDoc.status, // Cambia el estado localmente
                    isSynced: false, // Asegurar que no está sincronizado
                    _rev: existingDoc._rev, // Mantén la revisión de PouchDB
                });
    
                toast.success("Estado actualizado localmente. Se sincronizará más tarde.");
            } catch (pouchError) {
                console.error("Error al actualizar localmente en PouchDB:", pouchError);
                throw new Error("No se pudo actualizar el estado del color localmente.");
            }
        }
    },
    

};


export default ColorService;
