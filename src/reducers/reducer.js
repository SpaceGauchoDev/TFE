import initialState from "../store/initialState";

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOG_IN": {
                const  newSessionUserData = {logged: true, apiKey: action.payload.apiKey, userId: action.payload.id };
                return { ...state, sessionUserData: newSessionUserData };
        }
        case "REGISTER": {
                const newSessionUserData = {logged: true, apiKey: action.payload.apiKey, userId: action.payload.id };
                return { ...state, sessionUserData: newSessionUserData };
        }
        case "NUMBER_OF_SALES_UPDATE": {
            return { ...state, numberOfUserSales: action.payload.sales };
        }
        case "SALES_UPDATE": {
            return { ...state, userSales: action.payload };
        }
        case "PACKAGES_INFO_UPDATE": {
                return { ...state, packagesInfo: action.payload };            
        }        
        default:
            return state;
    }
}

export default reducer;