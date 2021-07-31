import Header from "./components/Header";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import {useState,useEffect} from "react";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks]= useState([])


useEffect(()=>{
  //gettask is asynch cuz it call fetchtask which returns a promise
  const getTasks =  async()=>{
    const tasksFromServr = await fetchTasks()
    setTasks(tasksFromServr)

  }
  getTasks();
},[])

//FETCH TASKS

const fetchTasks = async()=>{
  const res = await fetch ('http://localhost:5000/tasks')
  const data = await res.json()
  return data
}

//FETCH SINGLE TASK

const fetchTask = async(id)=>{
  const res = await fetch (`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data
}

//ADD TASK

const addTask = async(task)=>{

  const res = await fetch('http://localhost:5000/tasks',{
    method:'POST',
    //since we adding data, we need to specify header as we need to specify our content-type
    headers:{
      'Content-type': 'application/json'
    },
    //set body which we are sending (data) which we are wrapping in json.stringify turning javascript object to json string
    body: JSON.stringify(task),
  })

  //new tasks added, new data
  const data = await res.json(); //it is a promise
  setTasks([...tasks,data]);

  // const id = Math.floor(Math.random()*10000)+1
  // const newTask = {id, ...task}
  // setTasks([...tasks,newTask]);

}

//DELETE TASK
const deleteTask=async(id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE',
  })

  setTasks(tasks.filter((task)=>task.id!==id))
}

//TOGGLE REMINDER
const toggleReminder = async (id)=>{
  //which one we want to get?
  const taskToToggle = await fetchTask(id)
  //updated task
  const updTask = { ...taskToToggle,reminder:!taskToToggle.reminder}
  
  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    //update
    method: 'PUT',
    //sending data
    headers:{
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTask)
  })
  const data =await res.json();
  setTasks(
    tasks.map((task)=>task.id===id ? {...task,reminder:data.reminder}:task))
}

 

  return (
    <Router>
    <div className="container">

       <Header title="Task Tracker" onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
       
        
        <Route path = '/' exact render={(props)=>(
          <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length>0? 
        (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>):('No Task to show')}
          </>
        )}/>
        <Route path='/about' component ={About}/>
        <Footer/>
    </div>
    </Router>
  );
}

export default App;
