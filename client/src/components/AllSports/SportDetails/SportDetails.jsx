import React,{useState,useEffect} from 'react'
import { getSportById } from '../../../services/sportService';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';
import Timer from './Timer/Timer';
import '../../../styles/validate.css';

export default function SportDetails(props) {
  const { sportId } = props;
  const [sport,setSport] = useState(null);
  const [color,setColor]=useState('rgb(182, 224, 212)')

  useEffect(() => {
    const fetchSport = async (sportId) => {
      try {
        const response = await getSportById(sportId);
        const fetchedSport = response.data.data;
        setSport(fetchedSport);
      } catch(error) {
        if (error.response) {
          console.log('We have an error:', error.response.data);
        } else {
          console.log('We have an error:', error.message);
        }
      }
    };
    fetchSport(sportId);

  },[sportId]);

  

  return (
    <ProtectedRoute allowedRoles={['Admin','User']}>
      <div className='SportDetails'>
        <div className='container'>
        {
          !sport
          ? <div>Loading sport data, Please wait...</div>
          : <React.Fragment>
            <div  style={{ backgroundColor: color}} className='first'>
                <h1>{sport.name}</h1>
                <img className='poster' src={sport.image} alt='sport poster'/>
                <Timer time={sport.timeplay} fColor={setColor}/>
              </div>
              <p  style={{ backgroundColor: color}} >{sport.body}</p>
            </React.Fragment>
        }
        </div>
      </div>
     
    </ProtectedRoute>
  )
}
