import '../../styles/validate.css'
import React, { useEffect,useState} from 'react'
import { getAllWeeks} from '../../services/weekService';
import {Pagination} from '@mui/material';

export default function AllWeeks() {

  const [weeks,setWeeks] = useState();
  const [wrdData,setWrdData]=useState(1);
  const [vl,setVl] = useState(1);

  useEffect(() => {
    const fetchAllWeeks = async () => {
      const response = await getAllWeeks();
      const weeksArray = response.data.data;
      setVl(6);
      setWeeks(weeksArray);
      setWrdData(weeksArray[0]);
    };
    fetchAllWeeks();
  },[])

  
const hand = (e,p)=>{
  setVl(p-1);
  setWrdData(weeks[p-1])
}

  return (

    <div className='AllWeeks main'>
      
      <img src={wrdData.image} alt="" className='slide' width="500" /> 
      <div className='direction'>
        <h1>{wrdData.title}</h1>
        <p>{wrdData.whatHappen}</p>
        <span className='pagination'>
          <Pagination count={40} variant="outlined" defaultPage={vl} shape="rounded" size="large" color="secondary" onChange={hand}/>
        </span>
      </div>
      
    </div>
      
  )
}
