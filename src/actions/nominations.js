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
            var sendData = {
                id: authToken,
                data: data
            }
            db.collection('nominations').doc(authToken).set(sendData)
            .then(doc => {
                console.log("doc", doc)
                toast.success("Nomination successfully updated", {
                    containerId: 'toastMessage'
                })
                dispatch(setData(data));
            })
        }
   }
}

export const getNominations = () => {
    return (dispatch) => {
        db.collection('nominations').doc(authToken).get()
        .then(doc => {
            if(doc.exists) {
                console.log("action", doc.data());
                dispatch(setData(doc.data().data));
            } else {
                console.log("error");
                // toast.success("Oh snap! Database error.", {
                //     containerId: 'toastMessage'
                // })
                dispatch(setData([]));
            }
        })
        .catch(err => {
            console.log(err);
            toast.error("Ah snap! Server error.", {
                containerId: 'toastMessage'
            })
            dispatch(setData([]));
        })
    }
}

export const setData = data => {
    return {
        type: SET_NOMINATIONS,
        nominations: data
    }
}