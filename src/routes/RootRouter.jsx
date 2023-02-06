import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Singup from '../pages/Singup';
import ProtectedRoutes from './ProtectedRoutes';
import NewTask from '../pages/NewTask';
import NoMatch from '../pages/NoMatch';


function RootRouter() {
    return (
        <>
            <div >
                <Routes>
                    <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
                    <Route path='/signup' element={<Singup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/newtask' element={<NewTask />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </div>
        </>
    )
}


export default RootRouter