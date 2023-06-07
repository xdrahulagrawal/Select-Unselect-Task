import React from 'react'
import { Link } from 'react-router-dom';
import headerStyle from '../assests/styles/index.module.scss'

function Header() {

    const logoutHandler = () => {
        localStorage.removeItem('auth')
    }

    return (
        <div className={headerStyle['header-container']}>
            <Link to='/'><h2 className='item'>SNDKCORP</h2></Link>
            <h3>Rahul</h3>
            <ul className={headerStyle['header-list']}>
                <li><Link to='/login' onClick={logoutHandler}> Logout</Link></li>
                <li><Link to='/newtask'>Add Task</Link></li></ul>
        </div>
    )
}

export default Header