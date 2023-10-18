import  styles  from "./Header.module.css";
import todoLogo from "../assets/logo.svg"; 

export function Header () {
    return (
       <> 
        <header className={styles.header}>
            <img src={todoLogo} alt="ToDo List" width="126" height="48" />
        </header>
       </> 
    )
}