import initialState from "../store/initialState";

const reducer = (state = initialState, action) => {
    //console.log(state, action);
    switch (action.type) {
        /*
        case "PRUEBA":
            return { ...state, contador: state.contador + 1 };
        case "LOGUEAR":
            return { ...state, logueado: true };
        case "AGREGAR":
            let idNuevo = state.tareas[state.tareas.length - 1].id + 1;
            let tareaNueva = { id: idNuevo, title: action.payload.txt, completed: false };
            return { ...state, tareas: [...state.tareas, tareaNueva] };
        */            
        default:
            return state;
    }
}

export default reducer;