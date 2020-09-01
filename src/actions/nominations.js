import {
    GET_NOMINATIONS,
    SET_NOMINATIONS
} from './ActionTypes';
import {toast} from 'react-toastify';

export const setNominations = (data, oldData) => {
   return (dispatch) => {
        if(data.length>5) {
            toast.error("Nomination Limit Exceeded", {
                containerId: 'toastMessage'
            })
            data.pop();
            dispatch(setData(data));
        } else {
            toast.success("Nomination successfully updated", {
                containerId: 'toastMessage'
            })
            dispatch(setData(data));
        }
   }
}

export const setData = data => {
    return {
        type: SET_NOMINATIONS,
        nominations: data
    }
}