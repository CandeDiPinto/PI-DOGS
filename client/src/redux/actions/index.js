import axios from "axios";

const GET_ALL_DOGS = "GET_ALL_DOGS";

export const getAllDogs = () => {
    return async function (dispatch) {
      // ruta de back http://localhost:3001/dogs
      return fetch(`http://localhost:3001/dogs`)  //aca es donde sucede conexion de fyb
        .then((respuesta) => respuesta.json())
        .then((dogs) => {
          dispatch({ type: GET_ALL_DOGS, payload: dogs });
        });
    };
  };