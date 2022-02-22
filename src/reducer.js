export const initialState = {
    isMobileView : false,
    users: [],
}

export const reducer = (state, action) =>{
    switch(action.type){
        case "SCREEN_SIZE_MOBILE": return {
            ...state,
            isMobileView: true,
        }
         case "SCREEN_SIZE_DESKTOP": return {
            ...state,
            isMobileView: false,
        }
         case "ADD_USER": return {
            ...state,
            users: [...state.users, action.payload],
        }
    }
}