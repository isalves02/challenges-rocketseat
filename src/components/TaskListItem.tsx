import styles from "./TaskListItem.module.css";
import { ChangeEvent } from "react";
import { Trash       } from "phosphor-react";

interface TaskList {
    taskProps: TaskInfo[];
    countCreatedTasks: number;
    countFinishedTasks: number;

    onDeleteTask: (task: string) => void;
    setCountCreatedTasks: (countCreatedTasks:number) => void;
    setCountFinishedTasks: (countFinishedTasks:number) => void;
}

interface TaskInfo {
    content: string;
    isChecked: boolean;
}


export function TaskListItem ({ 
    taskProps, 
    countCreatedTasks,
    countFinishedTasks,
    setCountCreatedTasks,  
    setCountFinishedTasks, 
    onDeleteTask }:TaskList) {


   function handleFinishedTask (event: ChangeEvent<HTMLInputElement>) {
       taskProps.filter(task => {
            if (event.target.checked) {
                if (task.content == event.target.value) {
                    return task.isChecked = true;
                }  

                setCountFinishedTasks(countFinishedTasks + 1);
            } else {
                if (task.content == event.target.value) {
                    return task.isChecked = false;
                } 

                setCountFinishedTasks(countFinishedTasks - 1);
            }
        })
    }

    function handleDeleteTask (content: string) {
        onDeleteTask(content);
        setCountCreatedTasks(countCreatedTasks - 1);

        if (countFinishedTasks > 0)
            setCountFinishedTasks(countFinishedTasks - 1);
    }

 
    return (
        <>
            { taskProps.map((task, index) => {
                return (
                    task.content != "" ?
                        <li 
                            key={index+task.content}
                            className={styles.listItem}>

                            <input 
                                type="checkbox" 
                                name="task" 
                                value={task.content} 
                                checked={task.isChecked}
                                onChange={handleFinishedTask} 
                            />

                            <label>{task.content}</label>

                            <button 
                                type="button" 
                                onClick={() => handleDeleteTask(task.content)}
                                className={styles.removeTask}>
                                    <Trash />
                            </button>
                        </li>
                    : null 
                ); 
            }) }

        </>
    );
}