import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../../../context/authContext';
import '../../../../styles/validate.css'

export default function Timer(props) {

  const { addScore } = useContext(AuthContext);
  const { userData } = useContext(AuthContext);
  const [seconds,setSeconds]= useState(props.time%60);
  const [minutes,setMinutes]= useState(Math.floor(props.time/60));
  const [isAcive,setActive]= useState(false);

  var timer;
  
  useEffect(()=>{
    if(isAcive){
      
    timer= setInterval(()=>{

      if(seconds>0){
        props.fColor('rgb(204,153,255)');
        if(seconds<=5){
          props.fColor('rgb(255,153,153');
        }
        setSeconds(seconds-1)
        setActive(isAcive-1)
        
      }
      if(seconds===1){
        
        if(minutes===0){  
          timeIsDone();
          props.fColor('rgb(182, 224, 212)')
          alert("Done!");      
          clearInterval(timer);
        }
        else{
          setMinutes(minutes-1);
          setSeconds(59);
          setActive(isAcive-1)
        }
      }

    },1000)
  }
    return ()=> clearInterval(timer);
  },[isAcive])


  const timeIsDone=async()=>{
    try{
      await addScore(userData.id,userData.firstName,userData.lastName,userData.email,userData.password,userData.role,userData.menstrualCycle,userData.profilePicture, userData.myScore,userData.height,userData.weight);
        
    }catch(err){
      console.log(err);
    }
  }

  const start=()=>{
    setSeconds(props.time%60);
    setMinutes(Math.floor(props.time/60));
    setActive(props.time);
  }


  return (
    <div  className="timer">
      <h1>{minutes<10?"0"+minutes:minutes}:{seconds<10?"0"+seconds:seconds}</h1>
      <br/>
      <br/>
      <button onClick={start}>Start</button>
    </div> 
  )
}
