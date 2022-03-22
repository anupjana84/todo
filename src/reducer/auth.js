import {SET_USER, IS_AUTHTHENTICATED} from '../action/action.types'

const initialState = {
    user:null,
    loading: true,
    isAuthenticated: false
};

export default (state = initialState, action) => {
    
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload.user,
                loading: false,
                isAuthenticated:Object.keys(action.payload.user).length !== 0,
            }
        case IS_AUTHTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload,
                loading: false
            } 
    
        default:
            return state
    }
}