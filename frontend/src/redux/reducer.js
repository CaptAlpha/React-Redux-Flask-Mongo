import * as types from './actionType';

const initialState = {
    users: [],
    user:{},
    msg:""


}

const userReducer = (state = initialState, action) => 
{
    switch (action.type){
        case types.GET_USER:
            return {
                ...state,
                users: action.payload,
            };
        
        default:
            return state;
    }
}


export default userReducer;