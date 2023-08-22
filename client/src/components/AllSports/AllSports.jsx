import React, { useEffect, useState } from 'react'
import { getAllSports} from '../../services/sportService';
import { Link } from 'react-router-dom';

export default function AllWeeks() {

  const [sports,setSports] = useState(null);

  useEffect(() => {
    const fetchAllSports = async () => {
      const response = await getAllSports();
      const sportsArray = response.data.data;
      setSports(sportsArray);
    };
    fetchAllSports();
  },[])

  return (
    <div className='AllSports'>
      {
        !sports 
        ? 'Loading sports, Please wait ...':
        <React.Fragment>
          <h1>OL circle cards</h1>
          <ol>
              {
                sports.map((sport,index) => (
                  <Link className='poster-link' key={sport._id} to={`/sports/${sport._id}`}>
                    <li >
                      <div className="icon"><i><img src="https://img.icons8.com/?size=2x&id=xwBhS8UBrRQt&format=png" alt="" /></i></div>
                      <div className="title">{sport.name}</div>
                    </li>
                  </Link>
                ))
              }
          </ol>
        </React.Fragment>
      }
    </div>
  )
}
