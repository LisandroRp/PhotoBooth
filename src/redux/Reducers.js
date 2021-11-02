import {
    GET_ALBUMES,
    GET_FOTOS,
    GET_USUARIOS
  } from './Acciones';
  
  const initialState = {
    albumes: [],
    fotos: [],
    usuarios: [],
    memory: []
  };
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALBUMES:
        return { ...state, albumes: action.payload };
      case GET_FOTOS:
        return { ...state, fotos: action.payload };
      case GET_USUARIOS:
        return { ...state, usuarios: action.payload, memory: action.payload};
      default:
        return state;
    }
  }
  
  export default reducer;