import '../../../styles/validate.css';
import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { Link } from 'react-router-dom';

export default function LoggedIn() {
  
  const { userData, signOut } = useContext(AuthContext);
  
  return (
    <div className='LoggedIn'>
       <Link to='/myFavoritePosts'><i><img src="https://img.icons8.com/?size=2x&id=46527&format=png" alt='my favorite'/></i></Link> 

      <Link className="name" to='/profile'><img className="profie" src={userData.profilePicture} alt="profile"></img> <u><h5>{userData.firstName}</h5></u></Link>
       
      <Link to='/'><img className='signout-icon' onClick={()=>signOut()} src='https://img.icons8.com/?size=512&id=42923&format=png' title='sign out'alt='sign out'/></Link>
    </div>
  )
}
