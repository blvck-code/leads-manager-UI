import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from './types';
import {createMessage, returnErrors} from './messages'
import axios from 'axios';
import {tokenConfig} from './auth'

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
    axios
        .get('https://leads-manager-backend.herokuapp.com/api/leads/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// DELETE LEAD
export const deleteLead = (id) => (dispatch, getState) => {
    axios
        .delete(`https://leads-manager-backend.herokuapp.com/api/leads/${id}/delete`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage('Lead Deleted', 200))
            dispatch({
                type: DELETE_LEAD,
                payload: id
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// ADD LEAD
export const addLead = (name, email, message) => (dispatch, getState) => {

    const lead = JSON.stringify({name, email, message})
        
    axios
        .post("https://leads-manager-backend.herokuapp.com/api/leads/create", lead, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage('Lead Added', 200))
            dispatch({
                type: ADD_LEAD,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}