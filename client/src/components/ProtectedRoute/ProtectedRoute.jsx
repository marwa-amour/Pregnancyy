import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';

export default function ProtectedRoute(props) {
  
  const { allowedRoles } = props;
  const { isAuthenticated, userData } = useContext(AuthContext);

  const pleaseLogin =
    <React.Fragment>
      <p>Your have to be logged in to view this content !</p>
      <div>Click <Link to='/signin'>here</Link> to login.</div>
    </React.Fragment>

  const notAllowed = 
    <React.Fragment>
      <p></p>
    </React.Fragment>

  const noRolesSet =
    <React.Fragment>
      <p>!! This page can not be accesed by anybody because 'allowed roles' are not set !!</p>
    </React.Fragment>

  const result = () => {
    if (!allowedRoles) {
      return noRolesSet
    }

    if (!isAuthenticated) {
      return pleaseLogin
    }

    if (allowedRoles[0]==='all' || allowedRoles.includes(userData.role)) {
      return (
        <React.Fragment>
          {props.children}
        </React.Fragment>
      )
    } else {
      return notAllowed
    }
  }

  return (
    <React.Fragment>
      { result() }
    </React.Fragment>
  )

}
