import { useState, useEffect, useCallback } from 'react';
import TableBody from '../common_components/TableBody';
import TableHead from '../common_components/TableHead';
import showtaskStyle from '../assests/styles/table.module.scss'
import InputField from '../common_components/InputField';
import SearchTask from '../common_components/SearchTask';



function ShowTask({ setFlag, flag }) {
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completeTasks, setCompleteTasks] = useState([]);
    const [pendingTaskSearch, setPendingTaskSearch] = useState('');
    const [completeTaskSearch, setCompleteTaskSearch] = useState('');


    const getAllTask = () => {
        setFlag(!flag)
        getAllCompleteTasks();
        getAllPendingTasks();
    }

    /** Get all task from localstorage  after that filter and search only complete task*/
    const getAllCompleteTasks = () => {
        const getTasks = JSON.parse(localStorage.getItem('task'));
        const completeTask = getTasks?.filter(task => Boolean(task.complete));
        const result = completeTask?.filter(task => {
            if (!completeTaskSearch) {
                return task
            } else if (task.name.toLowerCase().includes(completeTaskSearch.toLowerCase())) {
                return task;
            }
        });
        setCompleteTasks(result)
    }

    /** Get all task from localstorage  and filter only pending task*/
    const getAllPendingTasks = () => {
        const getTasks = JSON.parse(localStorage.getItem('task'));
        const pendingTask = getTasks?.filter(task => Boolean(!task.complete));
        const result = pendingTask?.filter(task => {
            if (!pendingTaskSearch) {
                return task
            } else if (task.name.toLowerCase().includes(pendingTaskSearch.toLowerCase())) {
                return task;
            }
        });
        setPendingTasks(result)
    }

    /** delete task using filter method */
    const deleteTaskHandle = (id) => {
        const deleteTask = pendingTasks?.filter(task => task?.id !== id)
        localStorage.setItem('task', JSON.stringify(deleteTask))
        getAllTask();
    }


    /**Get all tasks  from localstorage */
    useEffect(() => {
        getAllCompleteTasks();
        getAllPendingTasks();
    }, [completeTaskSearch,pendingTaskSearch])


    /**Get all tasks  from localstorage and find the index afterthat update the complete status as well as localstorage  */
    const MoveTaskInPendingState = useCallback((task) => {
        const getTasks = JSON.parse(localStorage.getItem('task')) || [];
        if (task?.id) {
            const taskIndex = getTasks.findIndex((e) => [task].find((u) => u.id === e.id))
            if (taskIndex || taskIndex === 0) {
                getTasks[taskIndex] = { ...task, complete: false };
                localStorage.setItem('task', JSON.stringify(getTasks))
            }
        }
        getAllTask();
    }, [flag])

    /**Get all tasks  from localstorage and find the index afterthat update the complete status as well as localstorage  */

    const MoveTaskInCompleteState = useCallback((task) => {
    const getTasks = JSON.parse(localStorage.getItem('task')) || [];
        if (task?.id) {
            const taskIndex = getTasks.findIndex((e) => [task].find((u) => u.id === e.id))
            if (taskIndex || taskIndex === 0) {
                getTasks[taskIndex] = { ...task, complete: true };
                localStorage.setItem('task', JSON.stringify(getTasks))
            }
        }
        getAllTask();
    }, [flag]);

    return (
        <>
            <SearchTask heading='Complete Task'>
                <InputField
                    placeholder="Search complete task :"
                    name='completeTaskSearch'
                    label="completeTaskSearch"
                    onChange={(e) => setCompleteTaskSearch(e?.target.value)}
                />
            </SearchTask>
            <table className={showtaskStyle['table-container']}>
                <TableHead />
                <TableBody tasks={completeTasks} status='Complete' deleteTaskHandle={deleteTaskHandle} moveTask={MoveTaskInPendingState} text='pending' />
            </table>
            {!completeTasks?.length && <h2 className={showtaskStyle['no-result']}>No result find</h2>}
            <hr />

            <SearchTask heading='Pending Task'>
                <InputField
                    placeholder="Search pending task :"
                    name='pendingTaskSearch'
                    label="pendingTaskSearch"
                    onChange={(e) => setPendingTaskSearch(e?.target.value)}
                />
            </SearchTask>
            <table className={showtaskStyle['table-container']}>
                <TableHead />
                <TableBody tasks={pendingTasks} status='Pending' deleteTaskHandle={deleteTaskHandle} moveTask={MoveTaskInCompleteState} text='Complete' />
            </table>
            {!pendingTasks?.length && <h2 className={showtaskStyle['no-result']}>No result find</h2>}
        </>
    );
}

export default ShowTask;