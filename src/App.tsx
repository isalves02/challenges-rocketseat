import { useState, FormEvent } from "react";
import { Header       		 } from "./components/Header"; 
import { TaskListItem     	 } from "./components/TaskListItem"; 

import { PlusCircle, ClipboardText } from "phosphor-react";

import styles from "./App.module.css";

import "./global.css";


function App() {
	const [tasks, setTasks] = useState(['']); 
    const [newTask, setNewTask] = useState(''); 

	const [countCreatedTasks, setCountCreatedTasks] = useState(0);
	const [countFinishedTasks, setCountFinishedTasks] = useState(0);

    
    function handleAddNewTask (event: FormEvent) {
        event.preventDefault();

		if (tasks.length) {
			setTasks([...tasks, newTask]);
		}

		setCountCreatedTasks(tasks.length);
    }
	
	const isTaskEmpty = newTask.length === 0;  

	function deleteTask (taskToDelete: string) {
		let tasksWithoutDeletedOne = tasks.filter(task => {
			return task != taskToDelete
		})

		setTasks(tasksWithoutDeletedOne);
	}


	return (
		<>
			<div>
				<Header />
				
				<form action="" className={styles.taskForm} onSubmit={handleAddNewTask}> 
					<input 
						type="text" 
						placeholder="Adicione uma nova tarefa" 
						name="inputTask"
						onChange={ (event) => setNewTask(event.target.value)}
					/>

					<button 
						type="submit" 
						disabled={isTaskEmpty}>
							Criar <PlusCircle size={20} />
					</button>
				</form>

				<div className={styles.taskList}>
					<div className={styles.info}>
						<p className={styles.created}>
							Tarefas criadas 
							<span className={styles.counter}>{countCreatedTasks}</span>
						</p>   

						<p className={styles.finished}>
							Concluídas
							<span className={styles.counter}>{countFinishedTasks}</span>
						</p>        
					</div>
					

					<div className={styles.list}>

						{ tasks.length > 1 ? 
							<ul className={styles.notEmpty}>
								{tasks.map((task, index) => (
									task != "" ?
										<TaskListItem 
											key={index+task} 
											content={task} 

											onDeleteTask={deleteTask}

											countCreatedTasks={countCreatedTasks} 
											countFinishedTasks={countFinishedTasks} 
											
											setCountCreatedTasks={setCountCreatedTasks}
											setCountFinishedTasks={setCountFinishedTasks} 
										/>
									: null
								))}
							</ul>
						: 
							<div className={styles.empty}>
								<ClipboardText size={56} />

								<h1>Você ainda não tem tarefas cadastradas</h1>
								<p>Crie tarefas e organize seus itens a fazer</p>
							</div> 
						} 	
					</div>
				</div>
			</div>
		</>
	)
}

export default App
