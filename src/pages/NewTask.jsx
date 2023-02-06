import React, { useEffect, useState } from 'react';
import InputField from '../common_components/InputField'
import { v4 as uuid } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import newTaskStyle from '../assests/styles/auth.module.scss'


const initinalState = {
    id: "",
    name: "",
    complete: false,
    description: "",
}
function NewTask() {
    const [newTask, setNewTask] = useState(initinalState);
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()
    const location = useLocation();
    const { state } = location;
    const id = uuid();

    useEffect(() => {
        if (state) {
            const { task } = state;
            setNewTask(task)
        }
    }, [state]);


    const taskHandleChange = (e) => {
        const { name, value } = e.target
        setNewTask({ ...newTask, id, [name]: value })
    };


    const newTaskandleSubmit = () => {
        const { name, description } = newTask;
        if (!name || !description) {
            setErrorMsg('fill all fields')
            return
        }
        if (state?.task?.id) {
            const getTasks = JSON.parse(localStorage.getItem('task')) || [];
            const taskIndex = getTasks.findIndex((e) => [state?.task].find((u) => u.id === e.id))
            if (taskIndex || taskIndex===0) {
                getTasks[taskIndex] = newTask;
                localStorage.setItem('task', JSON.stringify(getTasks))
            }
        } else if (newTask?.name) {
            const getTasks = JSON.parse(localStorage.getItem('task')) || [];
            const mergeTask = [newTask, ...getTasks]
            localStorage.setItem('task', JSON.stringify(mergeTask))
        }
        setErrorMsg('')
        navigate('/')
        setNewTask(initinalState)
    }

    return (
        <>
            <Header />
            <div className={newTaskStyle['auth-container']}>
                <h1 className={newTaskStyle['auth-container-item1']}>{state?.task ? 'Edit' : "Create"} New Task</h1>
                <InputField
                    placeholder="Please enter name :"
                    name='name'
                    value={newTask?.name}
                    onChange={taskHandleChange}
                    label="name"
                />
                <InputField
                    placeholder="Please enter description :"
                    name='description'
                    value={newTask?.description}
                    onChange={taskHandleChange}
                    label="description"
                />
                {errorMsg && <p className={newTaskStyle['error']}>{errorMsg}</p>}
                <button className={newTaskStyle['auth-container-item2']} onClick={newTaskandleSubmit}>{state?.task ? 'Edit' : "Create"}</button>
            </div>
        </>

    );
}

export default NewTask