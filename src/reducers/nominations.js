import {
    GET_NOMINATIONS,
    SET_NOMINATIONS
} from '../actions/ActionTypes'

const initialState = {
    nominations: []
}

const nominationReducer = (state = initialState, action) => {
    let localState = Object.assign({}, state);
    switch(action.type) {
        case SET_NOMINATIONS:
            localState.nominations = action.nominations.length>0 ? action.nominations : localState.nominations
            return localState;
        default:
            return state;
    }
}

export default nominationReducer;