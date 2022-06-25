const usuarioReducer = (state = { 
                                    nombreCompleto: null, 
                                    token: null 
                                }, action) => {
    switch (action.type) {
        case "cambiarNombreCompleto":
            return { ...state, nombreCompleto: action.payload };
        case "cambiarToken":
            return { ...state, token: action.payload };
        default:
            return state
    }
};
export default usuarioReducer;