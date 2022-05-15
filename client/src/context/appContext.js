import React, { useState, useReducer, useContext } from 'react'
import reducer from './reducer';
import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS } from './action';
import axios from 'axios';


const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    token: null,
    userLocation: '',
    jobLocation: ''
}

const AppContext = React.createContext(initialState)
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            })
        }, 3000)
    }
    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            console.log(process.env.EXPRESS_SERVER_URL)
            const response = await axios.post(`http://localhost:4242/api/v1/auth/register`, currentUser)
            console.log(response)
            const { user, token, location } = response.data
            dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token, location } })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: REGISTER_USER_FAILURE,
                payload: error.response.data.message
            })
        }
        clearAlert()
    }
    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                registerUser,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

// make sure use
const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useAppContext, initialState };