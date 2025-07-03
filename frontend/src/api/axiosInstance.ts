import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface TokenPair {
  access: string;
  refresh: string;
}

const baseURL = import.meta.env.VITE_API_URL;

// Crear la instancia de Axios. No incluyas el token de forma estática aquí.
// El interceptor se encargará de añadirlo dinámicamente.
const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función auxiliar para obtener los tokens de forma segura
const getTokens = (): TokenPair | null => {
  try {
    const storedTokens = localStorage.getItem("tokens");
    return storedTokens ? JSON.parse(storedTokens) : null;
  } catch (error) {
    console.error("Error parsing tokens from localStorage:", error);
    return null;
  }
};


axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = getTokens(); // Siempre lee los tokens más recientes
    
    if (tokens?.access) {
      // Asegúrate de que el header exista antes de asignarlo, aunque Axios lo maneja bien
      config.headers.Authorization = `Bearer ${tokens.access}`;
    } else {
      // Si no hay token, asegúrate de que el header de autorización no esté presente
      // Esto es útil si una solicitud previamente había añadido un token y ahora no hay.
      delete config.headers.Authorization;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const tokens = getTokens(); // Vuelve a leer los tokens para el refresh

    // Manejar el error 401: Token expirado o inválido
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      tokens?.refresh // Solo intenta refrescar si tenemos un refresh token
    ) {
      originalRequest._retry = true; // Marca la solicitud para evitar bucles infinitos

      try {
        // Realiza la solicitud de refresh token *sin el interceptor de AxiosInstance*
        // para evitar un bucle de autenticación si el refresh token también falla 401.
        // Se usa una nueva instancia de axios o axios directamente.
        const refreshResponse = await axios.post(`${baseURL}/api/token/refresh/`, { // Asegúrate que esta sea la URL correcta para tu refresh token
          refresh: tokens.refresh,
        });

        const newAccess = refreshResponse.data.access;
        const newRefresh = refreshResponse.data.refresh || tokens.refresh; // Si el endpoint de refresh devuelve un nuevo refresh token, úsalo

        // Actualiza los tokens en localStorage
        const updatedTokens: TokenPair = { access: newAccess, refresh: newRefresh };
        localStorage.setItem("tokens", JSON.stringify(updatedTokens));

        // Actualiza el header de autorización en la instancia de axios global
        // Esto es útil si necesitas hacer otras llamadas a la API que no pasen por el interceptor de reintento inmediato.
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
        
        // Actualiza el header de autorización en la solicitud original reintentada
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        }

        // Reintenta la solicitud original con el nuevo token de acceso
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        // Si el refresh token falla (ej. 401, 400), elimina los tokens y redirige al login
        console.error("Error al refrescar el token:", refreshError);
        localStorage.removeItem("tokens");
        // Puedes usar una librería de enrutamiento como react-router-dom para una navegación más limpia
        window.location.href = "/login"; 
        return Promise.reject(refreshError);
      }
    }

    // Para cualquier otro error 401 que no sea de token expirado o si ya se reintentó,
    // o para otros códigos de error, simplemente rechaza la promesa.
    // Considera qué hacer con 401s si no hay refresh token (ej. redirigir a login si no hay token al inicio)
    if (error.response?.status === 401) {
        localStorage.removeItem("tokens");
        window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;