import React from 'react'
import tabelHeadStyle from '../assests/styles/table.module.scss'

function TableHead() {
    return (
        <thead className={tabelHeadStyle['thead-container']}>
            <tr>
                <th>S.no</th>
                <th>Task</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
    )
}

export default TableHead