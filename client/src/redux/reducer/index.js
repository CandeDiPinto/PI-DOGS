const initialState = {
    allDogs: [],
    allDogsB: [],
    dogDetail: [],
    temperament: [],
  };

  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_ALL_DOGS": {
        return {
          ...state,
          allDogs: action.payload, //en el estado allDogs, manda todo lo que llegue del llamado a la función
          allDogsB: action.payload,
        };}}}