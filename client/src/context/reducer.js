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
    CLEAR_JOB_FORM,
    ADD_JOB_BEGIN,
    ADD_JOB_SUCCESS,
    ADD_JOB_FAILURE,
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
} from "./action"

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertText: "Please provide all fields!",
            alertType: "danger"
        }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }
    if (action.type === REGISTER_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Successfully registered! Redirecting to Dashboard...'
        }
    }
    if (action.type === REGISTER_USER_FAILURE) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message
        }
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Successfully logged in! Redirecting to Dashboard...'
        }
    }

    if (action.type === LOGIN_USER_FAILURE) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message
        }
    }
    if (action.type === UPDATE_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!',
        }
    }
    if (action.type === UPDATE_USER_FAILURE) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message
        }
    }
    if (action.type === ADD_JOB_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === ADD_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            company: action.payload.job.company,
            position: action.payload.job.position,
            jobLocation: action.payload.job.location,
            event: action.payload.job.event,
            eventDate: action.payload.job.eventDate,
            jobId: action.payload.job.jobId,
            job_id: action.payload.job._id,
            status: action.payload.job.status,
            jobType: action.payload.job.jobType,
            link: action.payload.job.link,
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.successMessage
        }
    }
    if (action.type === ADD_JOB_FAILURE) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message
        }
    }
    if (action.type === SET_EDIT_JOB) {
        return {
            ...state,
            isEditing: true,
            editJobId: action.payload.job._id,
            company: action.payload.job.company,
            position: action.payload.job.position,
            jobLocation: action.payload.job.location,
            event: action.payload.job.event,
            eventDate: action.payload.job.eventDate,
            jobId: action.payload.job.jobId,
            job_id: action.payload.job._id,
            status: action.payload.job.status,
            jobType: action.payload.job.jobType,
            link: action.payload.job.link
        }
    }
    if (action.type === DONE_EDIT_JOB) {
        return {
            ...state,
            isEditing: false,

        }
    }

    if (action.type === CLEAR_JOB_FORM) {
        return {
            ...state,
            isLoading: false,
            company: '',
            position: '',
            jobLocation: '',
            event: '',
            eventDate: '',
            jobId: '',
            job_id: '',
            status: '',
            jobType: '',
            link: '',
            editJobId: ''
        }
    }
    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar
        }
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...state,
            user: null,
            token: null,
            userLocation: '',
            jobLocation: ''
        }
    }
    if (action.type === HANDLE_CHANGE) {
        return {
            ...state,
            [action.payload.name]: action.payload.value
        }
    }
    if (action.type === GET_JOBS_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: true,
            alertType: 'info',
            alertText: 'Loading Jobs...'
        }
    }
    if (action.type === GET_JOBS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            jobs: action.payload.jobs,
            totalJobs: action.payload.jobs.length,
            showAlert: false
        }
    }
    if (action.type === GET_JOBS_FAILURE) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message
        }
    }

    if (action.type === DELETE_JOB_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }
    if (action.type === DELETE_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Job Deleted!',
            company: '',
            position: '',
            jobLocation: '',
            event: '',
            eventDate: '',
            jobId: '',
            job_id: '',
            status: '',
            jobType: '',
            link: ''
        }
    }
    if (action.type === DELETE_JOB_FAILURE) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.message
        }
    }
    if (action.type === SHOW_STATS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === SHOW_STATS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            stats: action.payload.stats,
            monthlyApplications: action.payload.monthlyApplications,
        }
    }
    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            search: '',
            searchStatus: 'All',
            searchType: 'All',
            sort: 'Latest',
        }
    }

    throw new Error(`no such action :${action.type}`)
}
export default reducer