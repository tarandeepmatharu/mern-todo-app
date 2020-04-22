import React,{useState,useEffect,useRef} from 'react';
import './App.css';
import Task from './Task';
import {getData, postData} from './fetch';  
function App(props) {
  const [response,setResponse]=useState([]);
 
  const form=useRef(null);
  var text="";

  useEffect(()=>{
    async function getInitialData(){
        const result=await getData("http://localhost:8080");
        setResponse(result);
      }
    
    getInitialData();
    
  },[response.length]);

 async function addTask(event,text){
    const result=await postData("http://localhost:8080/addTask",{task:text});
    form.current.reset();
    setResponse(result);
  }

    


  return (
    <div className="container">
    <header className="App-header">
     <h4 className="Header-text">React Todo</h4>
    </header>
      <div className="Tasks-container">
       {
         response.map((value,index)=><Task text={value.task} key={index} setResponse={(response)=>setResponse(response)} />)
       }
       
         <form ref={form}>
         <div className="input-button-container">
        <input className="add-task"  placeholder="Enter the task" onKeyUp={(e)=>{text=e.target.value}} />
        <button type="submit" className="add-task-button" onClick={(e)=>addTask(e,text)} >Add</button>
        </div>
        </form>
        
      </div>
    </div>
  );
}

export default App;
