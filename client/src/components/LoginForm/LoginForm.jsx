import React, {useState, useEffect} from 'react'
import '../../styles/validate.css';
import {PregnancyCalculator} from '../../utils/authUtils';
import { Link } from 'react-router-dom';
import { getAllPosts} from '../../services/postService';

export default function LoginForm() {

  const d=new Date();
  const [date,setDate] = useState(`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`);
  const [classes,setClass] = useState('none');
  const [days,setDays] = useState('none');
  const [posts,setPosts] = useState(null);
  const [popularPosts,setPopular] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await getAllPosts();
      const postsArray = response.data.data;
      setPosts(postsArray);
      // setPopular(postsArray);
      mostpopular();
    };
    fetchAllPosts();
    
  },[classes])
 
  const mostpopular = () =>{
    const popular=[...posts].sort((a,b)=>(b.likes>a.likes)?1:-1).splice(0,3);
    setPopular(popular);
    console.log(popularPosts);
  }

  const handleClick = () => {
    if(PregnancyCalculator(0,parseInt(date.split('-')[0]),parseInt(date.split('-')[1]),parseInt(date.split('-')[2].slice(0,2)))>=0){
      setDays('block');
      console.log(days)
    }
    else{
      setDays('none');
    }
    setClass('block')
  }
  
  return (
    <div className='HomePage'>
      <div className='LoginForm'>
        <div className='aboutUs'>

          <h1>Pregnancy</h1>
          <h3>We're here for you</h3>
          <p>Have questions about Getting Pregnant, how to have a Healthy Pregnancy? We'll help guide you through every pregnancy possibility.</p>
          <button><a href='/posts'>learn more</a></button>
          
        </div>
        <div className='photo1'></div>
      </div>

      <h2 className="divider line glow" key ='1' contentEditable>Pregnancy Calculator</h2>
    
      <div className='calculator'>
        <div className='photo2'></div>
        <form>
          <p><label htmlFor="date">First day of Last Menstrual Period </label></p>
          <input type="date" name='date' onChange={(e)=>setDate(e.target.value)} placeholder='enter day number'/>
          <br/><br/>
          <button type='button' onClick={handleClick}><img src='https://img.icons8.com/?size=512&id=42873&format=png'/></button>
          <div className={classes}>
            <div className={`${days} daysLeft`}><h1>{PregnancyCalculator(0,parseInt(date.split('-')[0]),parseInt(date.split('-')[1]),parseInt(date.split('-')[2]))}</h1><p>daysLeft</p></div>
            <br></br>
            <h5>{parseInt(PregnancyCalculator(0,parseInt(date.split('-')[0]),parseInt(date.split('-')[1]),parseInt(date.split('-')[2]))/7)} WEEKS PREGNANT</h5>
            <p><Link to="/weeks">You can learn more about what happen in every week</Link></p>
            
            <ul>
              <input type="text" value={PregnancyCalculator(1,parseInt(date.split('-')[0]),parseInt(date.split('-')[1]),parseInt(date.split('-')[2]))}></input><br/>
              <p>First Trimester Ends(12 Weeks)</p>
              <input type="text" value={PregnancyCalculator(2,parseInt(date.split('-')[0]),parseInt(date.split('-')[1]),parseInt(date.split('-')[2]))}></input><br/>
              <p>Second Trimester Ends(27 Weeks)</p>
              <input type="text" value={PregnancyCalculator(3,parseInt(date.split('-')[0]),parseInt(date.split('-')[1]),parseInt(date.split('-')[2]))}></input><br/>   
              <p>Estimated Due Date(40 Weeks)</p>
            </ul>
          </div>
        </form>
      </div>

      <h2 className="divider line glow" key ='2' contentEditable>Most popular posts</h2>
      
      <div className='posts'>
      {
        !popularPosts?
        'loading':
        popularPosts.map((post) => (
          <Link className='poster-link' key={post._id} to={`/posts/${post._id}`}>
            <div className='card'>
              <div className="icon"><i><img src={post.image} alt="" /></i></div>
              <div className="title">{post.title}</div>
            </div>
          </Link>
        ))
      }
      </div>
    </div>
  )
}
