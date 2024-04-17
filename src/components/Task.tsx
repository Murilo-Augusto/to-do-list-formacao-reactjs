import styles from './Task.module.css'
import { Trash } from '@phosphor-icons/react'
import { TaskType } from '../App'

interface TaskProps extends TaskType {
  handleToggleCompleted: (id: number, value: boolean) => void;
  handleDeleteTask: (id: number) => void;
}

export function Task({ id, title, completed, handleToggleCompleted, handleDeleteTask }: TaskProps) {

  return (
    <li className={styles.task} data-completed={completed} >
      <div className={styles.checkboxWrapper}>
        <input type="checkbox" id="inputCheck" onChange={() => handleToggleCompleted(id, completed)} checked={completed}/>
        <label htmlFor="inputCheck"></label>
      </div>
      <p className={styles.taskTitle}>
        {title}
      </p>
      <button className={styles.btnDelete} title='Deletar task' onClick={() => handleDeleteTask(id)}>
        <Trash />
      </button>  
    </li>
  )
}