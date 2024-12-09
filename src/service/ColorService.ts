// src/services/AuthService.ts
import { doPost, doGet, doPut, doPutId } from "../config/Axios";
import { IColor } from "../interfaces/IColor";
import PouchDB from 'pouchdb';
const db = new PouchDB('colorsDB');


const ColorService = {

    createColor: async (data: IColor) => {
        try {
            const response = await doPost("/color", data);
            return response.data;
        } catch (ex) {
            throw new Error("An error occurred while creating color. Please try again.");  
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
            const response = await doPut(`/color/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while updating color. Please try again.");
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
