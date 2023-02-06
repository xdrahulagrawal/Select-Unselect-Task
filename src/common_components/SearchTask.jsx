import React from 'react'
import searchTaskStyle from '../assests/styles/index.module.scss'


function SearchTask({ children, heading }) {
    return (
        <div className={searchTaskStyle['complete-task-container']}>
            <h2>{heading}</h2>
            {children}
        </div>
    )
}

export default SearchTask