export const initialState = {
    isMobileView : false,
    users: [null, null, null],
    showModal:  false,
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
         case "ADD_USER": 
         let newUsersArray = [...state.users];
         console.log(newUsersArray);
         for(let i=0;i<newUsersArray.length;i++){
             if(newUsersArray[i] === null){
                 newUsersArray[i] = action.payload;
                 break;
             }
         }
         return {
            ...state,
            users: newUsersArray,
        }
        case "OPEN_MODAL": return {
            ...state,
            showModal: true,
        }
        default: return state;
    }
}