import React, { useState, useReducer, useContext } from 'react'
import reducer from './reducer';
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_BEGIN,
    UPDATE_USER_FAILURE,
    ADD_JOB_BEGIN,
    ADD_JOB_SUCCESS,
    ADD_JOB_FAILURE,
    CLEAR_JOB_FORM,
    HANDLE_CHANGE,
    GET_JOBS_BEGIN,
    GET_JOBS_FAILURE,
    GET_JOBS_SUCCESS,
    DELETE_JOB_BEGIN,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_FAILURE,
    SET_EDIT_JOB,
    DONE_EDIT_JOB,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS
} from './action';
import axios from 'axios';
/*
TODO:

FIXME:

DONE:
- incorrect invalidation of token when alljobs page is visited [FIX: remv body from get call]
*/
const SERVER_URL = 'http://localhost:4242/'
const JOB_API_URL = 'api/v1/jobs/'
const USER_API_URL = 'api/v1/auth/'
const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const location = localStorage.getItem('location')
const initialState = {
    isLoading: false,
    showAlert: false,
    isEditing: false,
    editJobId: '',
    alertText: '',
    alertType: '',
    showSidebar: false,
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: location || '',
    jobLocation: location || '',
    job_id: '',
    company: '',
    jobId: '',
    position: '',
    link: '',
    event: '',
    eventDate: new Date(),
    jobTypeOptions: ['Full-time', 'Part-time', 'Remote', 'Internship'],
    jobType: 'Internship',
    statusOptions: ['Pending', 'Applied', 'Offered', 'Rejected', 'Scheduled'],
    status: 'Pending',
    search: '',
    searchStatus: 'All',
    searchType: 'All',
    sort: 'Latest',
    sortOptions: ['Latest', 'Oldest'],
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
    stats: {},
    monthlyApplications: []
}

const AppContext = React.createContext(initialState)

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const AUTH_HEADER = {
        headers: {
            Authorization: `Bearer ${state.token}`
        }
    }
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
    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserFromLocalStorage = ({ user, token, location }) => {
        localStorage.removeItem('user', JSON.stringify(user))
        localStorage.removeItem('token', token)
        localStorage.removeItem('location', location)
    }


    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post(`http://localhost:4242/api/v1/auth/register`, currentUser)
            console.log(response)
            const { user, token, location } = response.data
            addUserToLocalStorage({ user, token, location })
            dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token, location } })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: REGISTER_USER_FAILURE,
                payload: { message: error.response.data.message }
            })
        }
        clearAlert()
    }
    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const response = await axios.post(`http://localhost:4242/api/v1/auth/login`, currentUser)
            console.log(response)
            const { user, token, location } = response.data
            addUserToLocalStorage({ user, token, location })
            dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token, location } })
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: LOGIN_USER_FAILURE,
                payload: { message: error.response.data.message }
            })
        }
        clearAlert()
    }
    const toggleSidebar = () => {
        console.log("toggle sidebar")
        dispatch({ type: TOGGLE_SIDEBAR });
    }
    const logoutUser = () => {
        const { user, token, location } = state
        removeUserFromLocalStorage({ user, token, location })
        dispatch({ type: LOGOUT_USER })
    }
    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const response = await axios.patch('http://localhost:4242/api/v1/auth/updateuser', currentUser, AUTH_HEADER)
            const { user, location, token } = response.data
            addUserToLocalStorage({ user, token, location })
            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token, location } })
        } catch (error) {
            console.log(error.response)
            if (error.response.status === 401) {
                logoutUser()
            }

            dispatch({
                type: UPDATE_USER_FAILURE,
                payload: { message: error.response.data.message }
            })

        }
        clearAlert()
    }
    const addJob = async (job) => {
        dispatch({ type: ADD_JOB_BEGIN })
        try {

            job = state.isEditing ? { ...job, _id: state.editJobId } : job
            const response = (state.isEditing ? await axios.patch(`${SERVER_URL + JOB_API_URL + state.job_id}`, job, AUTH_HEADER) : await axios.post(`${SERVER_URL + JOB_API_URL}`, job, AUTH_HEADER))
            const jobResponse = response.data
            dispatch({
                type: ADD_JOB_SUCCESS,
                payload: { job: jobResponse, successMessage: (state.isEditing ? 'Job updated!' : 'Job added!') }
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: ADD_JOB_FAILURE,
                payload: { message: error.response.data.message }
            })
        }
        clearAlert();
    }

    const setEditJob = async (job_id) => {
        const currentJob = state.jobs.find(job => job._id === job_id)
        dispatch({ type: SET_EDIT_JOB, payload: { job: currentJob } })

    }

    const doneEditJob = () => {
        dispatch({ type: DONE_EDIT_JOB })
        dispatch({ type: CLEAR_JOB_FORM })
    }

    const getJobs = async () => {
        let url = `${SERVER_URL + JOB_API_URL}?status=${state.searchStatus}&jobType=${state.searchType}`
        if (state.search !== '') {
            url = url + `&search=${state.search}`
        }
        dispatch({ type: GET_JOBS_BEGIN })
        try {

            const response = await axios.get(url, AUTH_HEADER)
            const jobs = response.data ? response.data : []
            console.log("Jobs: ", jobs)
            dispatch({ type: GET_JOBS_SUCCESS, payload: { jobs } })
        } catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                logoutUser()
            }
            dispatch({
                type: GET_JOBS_FAILURE,
                payload: { message: error.response.data.message }
            })
        }
        clearAlert();
    }

    const deleteJob = async (job_id) => {
        dispatch({ type: DELETE_JOB_BEGIN })
        try {
            const response = await axios.delete(`${SERVER_URL + JOB_API_URL + job_id}`, AUTH_HEADER)
            dispatch({ type: DELETE_JOB_SUCCESS, payload: { job: response.data } })
        } catch (error) {
            console.log(error)
            dispatch({
                type: DELETE_JOB_FAILURE,
                payload: { message: error.response.data.message }
            })
        }
        clearAlert()
    }
    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN })
        try {
            const { data } = await axios.get(`${SERVER_URL + JOB_API_URL}stats`, AUTH_HEADER)
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.stats,
                    monthlyApplications: data.monthlyApplications,
                },
            })
        } catch (error) {
            console.log(error.response)
            if (error.response.status === 401)
                logoutUser()
        }

        clearAlert()
    }
    const handleChange = ({ name, value }) => {
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
    }
    const clearJobForm = () => {
        dispatch({ type: CLEAR_JOB_FORM })
    }
    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS })
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                registerUser,
                loginUser,
                addUserToLocalStorage,
                removeUserFromLocalStorage,
                toggleSidebar,
                logoutUser,
                updateUser,
                addJob,
                getJobs,
                clearJobForm,
                clearFilters,
                handleChange,
                setEditJob,
                doneEditJob,
                deleteJob,
                showStats
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