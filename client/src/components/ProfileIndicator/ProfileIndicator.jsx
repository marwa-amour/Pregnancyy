import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import LoggedIn from './LoggedIn/LoggedIn';
import NotLoggedIn from './NotLoggedIn/NotLoggedIn';

export default function ProfileIndicator() {

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className='ProfileIndicator'>
      {
        isAuthenticated
        ? <LoggedIn/>
        : <NotLoggedIn/>
      }
    </div>
  )
}
