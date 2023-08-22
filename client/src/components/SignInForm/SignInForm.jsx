import '../../styles/validate.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
export default function SignInForm() {

  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        await signIn(email,password);
        return navigate('/');   
      }catch(err){
        console.log(err);
        return navigate('/signin');   
      }  
  } 

  return (
    <div className="Auth-signin-form">
      <img src="https://zappa-shortlinkit-staticfiles.s3.amazonaws.com/production/images/user/custom_login.svg" alt='signin'></img>
      <form className="Auth-form" onSubmit={(e)=>handleSubmit(e)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label htmlFor='email'>Email address</label>
            <input
              type="email"
              name='email'
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor='password'>Password</label>
            <input
              type="password"
              name='password'
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Signin
            </button>
          </div>
          <p>If you don't have an account? <Link to={`/signup`}>Sign Up</Link> now!</p>
        </div>
      </form>
    </div>
  )
}
