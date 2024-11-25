import { API_URL } from "../common/conts/url";

export const environment = {
    apihotelUrl: `${API_URL.develop}/hotel`,
    // apivueloUrl: `${API_URL.develop}/vuelo`,
    apiPaqueteTuristicoUrl: `${API_URL.develop}/paqueteTuristico`,
    apiServicioAdicionalUrl: `${API_URL.develop}/servicioAdicional`,
    apiAuthUrl: {
        login: `${API_URL.develop}/auth/login`,
        register: `${API_URL.develop}/auth/register`,
    },
    apivueloUrl: {
        crud: `${API_URL.develop}/vuelo`,
    }
    //AGREGAR URLS DE OTROS CONTROLADORES
}