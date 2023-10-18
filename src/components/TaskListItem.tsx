import styles from "./TaskListItem.module.css";
import { ChangeEvent } from "react";
import { Trash       } from "phosphor-react";

interface TaskList {
    content: string;
    countFinishedTasks: number;

    onDeleteTask: (task: string) => void;
    setCountFinishedTasks: (countFinishedTasks:number) => void;
}


export function TaskListItem ({ content, countFinishedTasks,  setCountFinishedTasks, onDeleteTask }:TaskList) {

   function handleFinishedTask (event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) 
            setCountFinishedTasks(countFinishedTasks + 1);
        else
            setCountFinishedTasks(countFinishedTasks - 1);
    }

    function handleDeleteTask () {
        onDeleteTask(content);
        // console.log(content);
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