import React from 'react'
import InputFieldStyle from '../assests/styles/index.module.scss'

function InputField(props) {
    return (
        <input
            className={InputFieldStyle["input-filed"]}
            autoComplete="off"
            {...props}
        />
    )
}

export default InputField