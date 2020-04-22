import React from 'react';
import './App.css';
import {getData,postData} from './fetch';
export default function Task(props){
  
    async function handleDelete(){
        await postData("http://localhost:8080/deleteTask",{task:props.text});
       props.setResponse(await getData("http://localhost:8080/"));    
      }  
 
    return(
        <div className="single-task-container">
            <div className="text-container"><h2 >{props.text}</h2></div>
           <button className="delete-button"  onClick={()=>handleDelete()}><span role="img" aria-label="jsx-a11y/accessible-emoji">&#x274C;</span></button>

            </div>
        
        );
}