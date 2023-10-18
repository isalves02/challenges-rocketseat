import styles from "./TaskListItem.module.css";
import { ChangeEvent } from "react";
import { Trash       } from "phosphor-react";

interface TaskList {
    content: string;
    countCreatedTasks: number;
    countFinishedTasks: number;

    onDeleteTask: (task: string) => void;
    setCountCreatedTasks: (countCreatedTasks:number) => void;
    setCountFinishedTasks: (countFinishedTasks:number) => void;
}


export function TaskListItem ({ 
    content, 
    countCreatedTasks,
    countFinishedTasks,
    setCountCreatedTasks,  
    setCountFinishedTasks, 
    onDeleteTask }:TaskList) {

   function handleFinishedTask (event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) 
            setCountFinishedTasks(countFinishedTasks + 1);
        else
            setCountFinishedTasks(countFinishedTasks - 1);
    }

    function handleDeleteTask () {
        onDeleteTask(content);
        setCountCreatedTasks(countCreatedTasks - 1);
        setCountFinishedTasks(countFinishedTasks - 1);
    }


    return (
        <>
            <li className={styles.listItem}>
                <input 
                    type="checkbox" 
                    name="task" 
                    value={content} 
                    onChange={handleFinishedTask} 
                />

                <label>{content}</label>

                <button 
                    type="button" 
                    onClick={handleDeleteTask}
                    className={styles.removeTask}>
                        <Trash />
                </button>
            </li>
        </>
    );
}