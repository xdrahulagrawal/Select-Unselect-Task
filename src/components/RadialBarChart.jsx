import React, { useEffect, useMemo, useState } from 'react';
import Chart from "react-apexcharts";
import radialBarChartStyle from "../assests/styles/radialchart.module.scss"

function RadialBarChart({ flag }) {
    const [pendingTask, setPendingTask] = useState(0)
    const [completeTask, setCompleteTask] = useState(0)

    /** Get all task from localstorage and find the length of complete and pending task */
    useEffect(() => {
        const getTasks = JSON.parse(localStorage.getItem('task'));
        const completeTask = getTasks?.filter(task => task.complete === true)?.length
        const pendingTask = getTasks?.filter(task => task.complete === false)?.length
        setPendingTask(pendingTask)
        setCompleteTask(completeTask);
    }, [flag]);

    const percentageTask = completeTask * 100 / (completeTask + pendingTask) || 0

    const options = useMemo(() => ({
        series: percentageTask ? [percentageTask.toFixed(2)] : [0],
        colors: percentageTask === 0 ? ['transparent'] : ['#ED5684'],
        chart: {
            type: 'radialBar',
        },
        labels: ['Task'],
        plotOptions: {
            expandOnClick: false,
            radialBar: {
                hollow: {
                    size: '70%',
                }
            },
        },
        states: {
            hover: {
                filter: {
                    type: "none",
                },
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: "none",
                },
            },
        },
        stroke: {
            lineCap: "round",
        },
    }), [percentageTask])


    return (
        <div className={radialBarChartStyle['radical-container']}>
            <h2 className={radialBarChartStyle['radical-container-item1']}>Task Analytics</h2>
            <div className={radialBarChartStyle['radical-container-item2']}>
                <div className={radialBarChartStyle['radical-container-subitem1']}>
                    <h3>Total Task : {pendingTask + completeTask || 0}</h3>
                    <h3>Pending Task : {pendingTask || 0}</h3>
                    <h3>Complete Task: {completeTask || 0}</h3>
                </div>
                <Chart options={options} series={options.series} type="radialBar" height={245} />
            </div>
        </div>
    )
}

export default RadialBarChart