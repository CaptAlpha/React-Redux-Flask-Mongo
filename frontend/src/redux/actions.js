import * as types from './actionType';
import axios from "axios";

const API = "http://localhost:5000"

const getUsers = (users) => ({
    type: types.GET_USER,
    payload: users
});

export const loadUsers = (users) => {
    return function(dispatch) {
        axios
            .get(`${API}/users`)
            .then(response => {
                dispatch(getUsers(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    };
};