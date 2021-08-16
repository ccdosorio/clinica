import authHeader from "../../services/auth-header";
const API_URL =
  "https://88xin9j4p9.execute-api.us-east-1.amazonaws.com/dev/api/";

const config = {
  headers: authHeader(),
};

// LISTAR EJECUTIVOS RESPECTO AL USUARIO LOGUEADO
export const getAllExecutiveId = (idusuario) => {
  return fetch(API_URL + `executive/sesion/${idusuario}`, config);
};

// LISTAR CLIENTES RESPECTO AL USUARIO LOGUEADO
export const getAllCustomerId = (idusuario) => {
  return fetch(API_URL + `customercalendar/sesion/${idusuario}`, config);
};

// LISTAR TODOS LOS EJECUTIVOS PARA ADMINISTRADORES
export const getAllExecutive = () => {
  return fetch(API_URL + "executive-all/sesion/", config);
};

// LISTAR TODOS LOS CLIENTES PARA ADMINISTRADORES
export const getAllCustomer = () => {
  return fetch(API_URL + "customer-calendar/all/sesion/", config);
};

// LISTAR LOS TIPOS DE ACTIVIDADES
export const getAllActivity_type = () => {
  return fetch(API_URL + "activity_type/all", config);
};

// LISTAR LOS DIFERENTES RESULTADOS DE LA ACTIVIDAD
export const getAllActivity_result = () => {
  return fetch(API_URL + "activity_result/all", config);
};

// CONSULTAR ACTIVIDAD
export const getAllActividad = (idusuario) => {
  return fetch(API_URL + `activity-all/sesion/${idusuario}`, config);
};

// LISTAR LOS DIFERENTES RESULTADOS DE LA ACTIVIDAD
export const getIdactividad = (idactividad) => {
  return fetch(API_URL + `activity/${idactividad}`, config);
};

export const addActividad = (response) => {
  console.log("DATAAA ADD ACTIVIDAD-->", response);
  return fetch(API_URL + "activity-add/sesion", response);
};

// EDITRA ACTIVIDAD

export const updateActividad = (response) => {
  console.log("DATAAA UPDATE ACTIVIDAD-->", response);
  return fetch(API_URL + `activity-update/season`, response);
};

// ELIMINAR ACTIVIDAD
export const deleteActividad = (response) => {
  console.log("porque no entra--Z", response);
  return fetch(API_URL + `activity-delete`, response);
};

// APIS PROPIOS DEL CALENDARIO

/*export const getAllEvents = () => {
    return axios.get("/api/calendar/events/all");
}

export const addNewEvent = (event) => {
  //  console.log("DATAAA ADD EVENT2-->",event)
    return axios.post("/api/calendar/events/add",event);
}

export const updateEvent = (event) => {
    return axios.post("/api/calendar/events/update",event);
}

export const deleteEvent = (event) => {
    return axios.post("/api/calendar/events/delete",event);
}*/

/*}


export default new CalendarService();*/
