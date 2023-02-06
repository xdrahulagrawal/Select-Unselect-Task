import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes(props) {
    const auth = localStorage.getItem('auth')
    if (auth) {
        return props.children
    }
    return <Navigate to='/login' />

}

export default ProtectedRoutes