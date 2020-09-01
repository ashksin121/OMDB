import { combineReducers } from 'redux';
import Nominations from './nominations';

const reducer = combineReducers({
    nominationState: Nominations
})

export default reducer;