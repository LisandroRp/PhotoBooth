import axios from 'axios';
export const GET_ALBUMES = 'GET_ALBUMES';
export const GET_FOTOS = 'GET_FOTOS';
export const GET_USUARIOS = 'GET_USUARIOS';


export const getAlbumes = () => {
  try {
    return async dispatch => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/albums");
      if (response.data) {
        dispatch({
          type: GET_ALBUMES,
          payload: response.data
        });
      } else {
        alert('Hubo un error al traer los Albumes');
      }
    };
  } catch (error) {
    alert('Hubo un error al traer los Albumes');
    console.log(error);
  }
};
export const getFotos = () => {
  try {
    return async dispatch => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/photos");
      if (response.data) {
        dispatch({
          type: GET_FOTOS,
          payload: response.data
        });
      } else {
        alert("Hubo un problema trayendo las fotos")
      }
    };
  } catch (error) {
    alert("Hubo un problema trayendo las fotos")
    console.log(error);
  }
};
export const getUsuarios = () => {
  try {
    return async dispatch => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      if (response.data) {
        dispatch({
          type: GET_USUARIOS,
          payload: response.data
        });
      } else {
        alert("Hubo un problema trayendo a los usuarios")
      }
    };
  } catch (error) {
    alert("Hubo un problema trayendo a los usuarios")
    console.log(error);
  }
};