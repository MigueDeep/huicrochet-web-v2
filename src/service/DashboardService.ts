import { doGet } from "../config/Axios";
import { IRevuenes } from "../interfaces/Dashboard/RevuenesInterface";
import { IViews, IViewsRange } from "../interfaces/Dashboard/ViewsIterface";
import { IOrder } from "../interfaces/IOrder";

export const DashboardService = {
  getAllViewsStats: async (): Promise<IViews> => {
    try {
      const response = await doGet("/stats/visits", { showToast: false });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllCountUsers: async () => {
    console.log("getAllCountUsers");
    try {
      const response = await doGet("/stats/users/count", { showToast: false });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllUsersLogged: async () => {
    try {
      const response = await doGet("/stats/users/logged-in-today", {
        showToast: false,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getAllUsersLoggedOut: async () => {
    try {
      const response = await doGet("/stats/users/not-logged-in", {
        showToast: false,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getVisitStatsInRange: async (
    startDate: string,
    endDate: string
  ): Promise<IViewsRange> => {
    console.log("Servicio llamado con fechas:", startDate, endDate);
    try {
      const response = await doGet(
        `/stats/visits/range?startDate=${startDate}&endDate=${endDate}  `
      );
      console.log("Respuesta recibida:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error en el servicio:", error);
      throw error;
    }
  },

  getIncomesStatsInRange: async (
    startDate: string,
    endDate: string
  ): Promise<IViewsRange> => {
    console.log("Servicio llamado con fechas:", startDate, endDate);
    try {
      const response = await doGet(
        `/stats/revenues/range?startDate=${startDate}&endDate=${endDate}  `
      );
      console.log("Respuesta recibida ingresos:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error en el servicio:", error);
      throw error;
    }
  },

  getIncomesStas: async (): Promise<IRevuenes> => {
    try {
      const response = await doGet("/stats/revenues", { showToast: false });
      console.log("Respuesta recibida:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getLastOrders: async (): Promise<IOrder> => {
    try {
      const response = await doGet("/order/last-5", { showToast: false });
      console.log("Respuesta recibida:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
