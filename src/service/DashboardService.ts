import { doGet } from "../config/Axios";
import { IViews, IViewsRange } from "../interfaces/Dashboard/ViewsIterface";


export const DashboardService = {
  getAllViewsStats: async (): Promise<IViews> => {
    try {
      const response = await doGet("/stats/visits");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllCountUsers : async () => {
    console.log("getAllCountUsers");
    try {
      const response = await doGet("/stats/users/count");
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllUsersLogged : async () => {
    try {
      const response = await doGet("/stats/users/logged-in-today");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllUsersLoggedOut : async () => {
    try {
      const response = await doGet("/stats/users/not-logged-in");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
getVisitStatsInRange: async (startDate: string, endDate: string): Promise<IViewsRange> => {
  console.log("Servicio llamado con fechas:", startDate, endDate);
  try {
    const response = await doGet(
      `/stats/visits/range?startDate=${startDate}&endDate=${endDate}`
    );
    console.log("Respuesta recibida:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en el servicio:", error);
    throw error;
  }
},



};