import {
    GET_NOMINATIONS,
    SET_NOMINATIONS
} from './ActionTypes';
import {toast} from 'react-toastify';
import {db} from '../firebase';

const authToken = localStorage.getItem('authToken');

export const setNominations = (data, oldData) => {
    console.log(data, oldData)
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