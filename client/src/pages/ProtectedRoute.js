import React from 'react'
import { useAppContext } from '../context'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children }) => {
    const { user } = useAppContext()
    if (!user) {
        return <Navigate to='/register' />
    }
    return children
}

export default ProtectedRoute