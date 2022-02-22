export const initialState = {
    isMobileView : false,
}

export const reducer = (state, action) =>{
    switch(action.type){
        case "screenSizeMobile": return {
            ...state,
            isMobileView: true,
        }
         case "screenSizeDesktop": return {
            ...state,
            isMobileView: false,
        }
    }
}