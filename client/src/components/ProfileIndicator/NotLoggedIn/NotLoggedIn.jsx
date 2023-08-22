import '../../../styles/validate.css';
import React from 'react'
import { Link } from 'react-router-dom';

export default function NotLoggedIn() {
  return (
    <div className='NotLoggedIn'>
      <Link to="/signin"><i><img src="https://img.icons8.com/?size=512&id=42778&format=png" alt='signin'/></i></Link>
    </div>
  )
}
