import '../../styles/validate.css';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {PregnancyCalculator} from '../../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import TextField from './TextField';
import * as Yup from 'yup';

export default function ProfileDetails() {
  
  const navigate = useNavigate();

  const { userData,update } = useContext(AuthContext);

  const validate = Yup.object({
    firstName: Yup.string().min(4),
    lastName: Yup.string().min(4),
    email: Yup.string().email('Email is invalid!'),
    password: Yup.string()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,'At least one special character and one number')
      .min(8, 'Password must be minimum 8 digits!'),
    height: Yup.number()
      .min(140, 'Height must be minimum 140 cm!')
      .max(200,'Height must be maximum 200 cm!'),
    weight: Yup.number()
      .min(40, 'Weight must be minimum 40 Kg!')
      .max(150,'Weight must be maximum 150 Kg!'),
  });
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    height: '',
    weight: ''
  };
 
  const sign = async(values)=>{

    if(!values.firstName){
        values.firstName=userData.firstName;
    }
    if(!values.lastName){
        values.lastName=userData.lastName;
    }
    if(!values.email){
        values.email=userData.email;
    }
    if(!values.height){
        values.height=userData.height;
    }
    if(!values.weight){
        values.weight=userData.weight;
    }

    console.log(values)
    await update(userData.id,values.firstName,values.lastName,values.email,values.password,userData.role,userData.menstrualCycle,userData.profilePicture, userData.myScore,parseInt(values.height),parseInt(values.weight));
    alert('your profile is updated');
    return navigate('/');
  
  }

  let d;
  d=userData.menstrualCycle;
  d=d?.split('-');

  return (
    <ProtectedRoute allowedRoles={['all']}>
    <div className="profileDetails">
    { userData
    ? <React.Fragment>

        <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                <div className="my-4">
                    <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false">Profile</a>
                        </li>
                    </ul>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validate}
                        onSubmit={(values) => {
                        sign(values);
                        }}
                    >
                    {(formik) => (
                    <Form>
                        <div className="row mt-5 align-items-center">
                            <div className="col-md-3 text-center mb-5">
                                <div className="avatar avatar-xl">
                                    <img src={userData.profilePicture} alt="..." className="avatar-img rounded-circle" />
                                    <div className='score'>
                                        My Score
                                        <br/>
                                        <span>{userData.myScore}</span>
                                        <img src="https://img.icons8.com/?size=2x&id=46877&format=png" alt="score"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row align-items-center">
                                    <div className="col-md-7">
                                        <h4 className="mb-1">{userData.firstName} {userData.lastName}</h4>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-7" style={{padding:'40px'}}>
                                        <label>weeks left</label>    
                                        <input type="text" className="small mb-0 text-muted" style={{width:'250px'}} value={`${parseInt(PregnancyCalculator(0,parseInt(d[0]),parseInt(d[1]),parseInt(d[2].slice(0,2)))/7)} WEEKS PREGNANT`}></input> 
                                        <label>First Trimester Ends(12 Weeks)</label>    
                                        <input type="text" className="small mb-0 text-muted" style={{width:'250px'}} value={PregnancyCalculator(1,parseInt(d[0]),parseInt(d[1]),parseInt(d[2].slice(0,2)))}></input> 
                                        <label>Second Trimester Ends(27 Weeks)</label>
                                        <input type="text" className="small mb-0 text-muted" style={{width:'250px'}} value={PregnancyCalculator(2,parseInt(d[0]),parseInt(d[1]),parseInt(d[2].slice(0,2)))}></input>
                                        <label>Estimated Due Date(40 Weeks)</label>
                                        <input type="text" className="small mb-0 text-muted" style={{width:'250px'}} value={PregnancyCalculator(3,parseInt(d[0]),parseInt(d[1]),parseInt(d[2].slice(0,2)))}></input>
                                        <br/><br/>
                                        <small>{`(In order to be able to get more scores, you have to do sports, read posts and comment on them)`}</small>
                                    
                                        <br></br>
                                    </div>
                                    <div className="col">
                                        <p className="text-muted">
                                            You should drink three liters a day for a healthy pregnancy
                                            <br></br><br></br>
                                            <div style={{display:'flex'}}>
                                                <h3 style={{padding:'30px',flex:'70%',textAlign:'center'}}>
                                                    <span>{parseInt((userData.weight*30)/1000)} L</span><br></br>
                                                    <span>{parseInt((userData.weight*30)%1000)} ml</span>
                                                </h3>
                                                <img style={{flex:'30%',height:'100px',weight:'50px'}} src='https://img.icons8.com/?size=2x&id=46941&format=png' alt='water'></img>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="form-row">

                            <div className="form-group col-md-6">
                                <TextField
                                    type="text"
                                    label="First name"
                                    name="firstName"
                                    placeholder={userData.firstName}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <TextField
                                    type="text"
                                    name="lastName"
                                    label="Last name"
                                    placeholder={userData.lastName}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                                <TextField
                                    type="email"
                                    name="email"
                                    label="Email"
                                    placeholder={userData.email}
                                />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <TextField
                                    type="number"
                                    name="height"
                                    label="Height"
                                    placeholder={userData.height}
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <TextField
                                    type="number"
                                    name="weight"
                                    label="Weight"
                                    placeholder={userData.weight}
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <TextField
                                    type="text"
                                    name="password"
                                    label="New Password"
                                    placeholder=""
                                />
                            </div>
                        </div>
               
                        <button type="submit" className="btn btn-primary">Save Change</button>
                    </Form>
                    )}
                    </Formik>
                </div>
            </div>
        </div>

    </React.Fragment>
    : 'Something went wrong...'
    }
    </div>
    </ProtectedRoute>
  )
}
