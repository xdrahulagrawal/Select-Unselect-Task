import React from 'react'
import { Link } from 'react-router-dom'
import tableBodyStyle from '../assests/styles/table.module.scss'

function TableBody({ tasks, status, deleteTaskHandle, moveTask, text }) {
    return (
        <tbody>
            {tasks?.map((task, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task?.name}</td>
                    <td>{task?.description}</td>
                    <td>{status}</td>
                    <td className={tableBodyStyle['table-td-container']}>
                        <Link to='/newtask' state={{ task }}> <button className={tableBodyStyle['primary']} >Edit</button></Link>
                        <button className={tableBodyStyle['danger']} onClick={() => deleteTaskHandle(task?.id)}>Delete</button>
                        <button className={tableBodyStyle['success']} onClick={() => moveTask(task)}>Move {text}</button>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default TableBody