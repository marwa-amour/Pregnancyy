import '../../styles/validate.css'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import TextField from './TextField';
import * as Yup from 'yup';

export default function SignInForm() {

  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const maximum=new Date();
  var minimum=new Date(maximum.getFullYear(),maximum.getMonth(),parseInt(maximum.getDate())-279);
    
  const validate = Yup.object({
    firstName: Yup.string().required('Firstname Required!').min(4),
    lastName: Yup.string().required('Lastname Required!').min(4),
    email: Yup.string().email('Email is invalid!').required('Email Required!'),
    password: Yup.string()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,'At least one special character and one number')
      .min(8, 'Password must be minimum 8 digits!')
      .required('Password Required!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match!')
      .required('Confirm password is reqired!'),
    profilePicture: Yup.string()
      .default('https://media.istockphoto.com/id/1309468161/vector/pregnant-young-woman.jpg?s=612x612&w=0&k=20&c=NPsKnNIGSjQBXpRVDCdCTjf7uvghLAwUH5Se7ncE5jk='),
    menstrualCycle:Yup.date()
      .required("menstrualCycle Required")
      .min(minimum)
      .max(maximum),
    height: Yup.number()
      .min(140, 'Height must be minimum 140 cm!')
      .max(200,'Height must be maximum 200 cm!')
      .required('Height must be required!'),
    weight: Yup.number()
      .min(40, 'Weight must be minimum 40 Kg!')
      .max(150,'Weight must be maximum 150 Kg!')
      .required('Weight must be required!'),
  });
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture:'',
    menstrualCycle:'',
    height: '',
    weight: ''
  };
 
  const sign = async(values)=>{
    await signUp(values.firstName,values.lastName, values.email, values.password,values.profilePicture, values.menstrualCycle, parseInt(values.height), parseInt(values.weight));
    return navigate('/');
  }

  return (
    <div className="Auth-signup-form">
      <img src="https://zappa-shortlinkit-staticfiles.s3.amazonaws.com/production/images/illustrations/progressive_app.svg" alt='sign in'></img>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values) => {
          sign(values);
        }}
      >
        {(formik) => (
          <div>
            <h1 className="">Signup</h1>
            <Form className="Auth-form form p-3">
              <TextField type="text" label="First name" name="firstName" placeholder=""/>
              <TextField type="text" name="lastName" label="Last name" placeholder=""/>
              <TextField type="email" name="email" label="Email" placeholder="loremipsum@gmail.com"/>
              <TextField type="text" name="password" label="Password" placeholder="qwert@123"/>
              <div className="mb-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  className={`form-control shadow-none ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword &&
                    'is-invalid'
                  }`}
                  type="text"
                  name="confirmPassword"
                  placeholder="confirm password..."
                  {...formik.getFieldProps('confirmPassword')}
                />
                <ErrorMessage component="div" name="confirmPassword" className="error"/>
              </div>
              <TextField type="text" name="profilePicture" label="Profile picture" placeholder=""/>
              <TextField type="date" name="menstrualCycle" label="MenstrualCycle" placeholder=""/>
              <TextField type="number" name="height" label="Height" placeholder="156"/>
              <TextField type="number" name="weight" label="Weight" placeholder="60"/>
              <button className="btn btn-dark m-3" type="submit">Register</button>
              <button className="btn btn-primary m-3" type="reset">Reset</button>
            </Form>
            <p>Already have an account ? <Link to={`/signin`}>Sign In</Link> now!</p>
          </div>
        )}
      </Formik>
    </div>
  );
  
}
