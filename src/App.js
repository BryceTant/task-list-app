import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

const App = () => {

  const [displayAddTask, setDisplayAddTask] = useState(false)

  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch the tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // Fetch a single task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // Add task function
  const addTask = async (task) => {
    const res = await fetch(
      'http://localhost:5000/tasks',
      {method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(task)
      }
    )
    const data = await res.json()
    setTasks([...tasks, data])
  }

  // Delete task Function
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Switch reminder on or off
  const switchReminder = async (id) => {
    const taskToSwitch = await fetchTask(id)
    const updatedTask = { ...taskToSwitch, reminder: !taskToSwitch.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`,
    {method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setDisplayAddTask(!displayAddTask)}
      displayAdd={displayAddTask}
      />
      <Route path='/' exact render={(props) => (
        <>
          {displayAddTask && <AddTask onAdd={addTask}/>}
          <Tasks tasks = {tasks}
          onDelete={deleteTask}
          onToggle={switchReminder}
          />
        </>
      )}
      />
      <Route path='/about' component={About}/>
      <Footer />
    </div>
    </Router>
  )
}

export default App