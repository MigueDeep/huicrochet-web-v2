import axios from "axios";
import toast from "react-hot-toast";

const instance = axios.create({
  baseURL: "http://localhost:8080/api-crochet",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },    
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(response.data.message);
    toast.success(response.data.message);
    return response;
  },
  (error) => {

    // if (error.response) {
    //   const { status } = error.response;
    //   if (status === 401) {
    //     toast.error("El usuario no está autenticado");
    //   } else if (status === 400) {
    //     toast.error('Error');
    //   } else if (status === 403) {
    //     toast.error("No tienes permiso para acceder a esta función");
    //   } else if (status === 404) {
    //     toast.error("Recurso no encontrado");
    //   } else if (status === 500) {
    //     toast.error("Error interno del servidor");
    //   } else if (status === 503) {
    //     toast.error("Servicio no disponible");
    //   } else {
    //     toast.error("Error desconocido");
    //   }
    // } else {
    //   toast.error("Error de conexión");
    // }

    return Promise.reject(error);
  }
);

export const doGet = (url: string) => {
  return instance.get(url);
};

export const doGetId = (url: string, id: string) => {
  return instance.get(`${url}${id}`);
};

export const doPost = (url: string, data: any) => {
  return instance.post(url, data);
};

export const doPut = (url: string, data: any) => {
  return instance.put(url, data);
};

export const doPutId = (url: string) => {
  return instance.put(url);
};

export const doDelete = (url: string) => {
  return instance.delete(url);
};
