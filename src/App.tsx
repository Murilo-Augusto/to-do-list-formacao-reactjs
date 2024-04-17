import {PlusCircle} from '@phosphor-icons/react'
import styles from './App.module.css';
import { Header } from './components/Header';
import Clipboard from './assets/Clipboard.svg'
import { Task } from './components/Task';
import './global.css'
import { useState } from 'react';

export interface TaskType {
  id: number;
  title: string;
  completed: boolean;
}
export function App() {
  const [inputValue, setInputValue] = useState('')
  const [tasks, setTasks] = useState<TaskType[]>([])
  console.log(tasks)

  function handleCreateTask() {
    if(inputValue === '') return

    setTasks( tasks => [...tasks, { id: Math.random(), title: inputValue, completed: false}])
    setInputValue('')
  }
  
  function handleToggleCompleted(id: number, value: boolean) {
    setTasks(tasks => {
      const updatedTasks = [...tasks]
      const taskIndex = updatedTasks.findIndex(task => task.id === id)
      updatedTasks[taskIndex].completed = !value
      console.log(updatedTasks[taskIndex])

      return updatedTasks
    })
  }

  function handleDeleteTask(id: number) {
    setTasks(tasks => tasks.filter(task => task.id !== id))
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <main>
          <div className={styles.input}>
            <input
              placeholder='Adicione uma nova tarefa'
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <button
              onClick={handleCreateTask}
            >
              Criar <PlusCircle /></button>
          </div>
          
          <div className={styles.container}>
            <div className={styles.counters}>
              <div className={styles.created}>
                <span>Tarefas criadas</span>
                <span>{tasks.length}</span>
              </div>
              <div className={styles.done}>
                <span>Concluídas</span>
                <span>{tasks.length == 0 ? 0 : `${tasks.filter(task => task.completed).length} de ${tasks.length}`}</span>
              </div>
            </div>

            {tasks.length === 0 && (<div className={styles.blankList}>
              <img src={Clipboard} alt="" />
              <p><strong>Você ainda não tem<br />tarefas cadastradas</strong>
              <br />Crie tarefas e organize<br />seus itens a fazer</p>
            </div>)}

            <div className={styles.list}>
              {tasks.sort((a, b) => {
                if(a.completed > b.completed) return 1
                else if(a.completed < b.completed) return -1

                return a.title < b.title ? -1 : 0
              }).map(task => <Task key={task.id} {...task} handleToggleCompleted={handleToggleCompleted} handleDeleteTask={handleDeleteTask}/>)}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}