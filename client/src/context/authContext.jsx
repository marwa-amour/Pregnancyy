import { useState, useEffect, createContext } from "react";
import { signIn, signOut, signUp } from '../services/authService';
import { updateScore,updateUser } from '../services/userService'
import { loadUserDataFromCookie } from '../utils/authUtils';
import {toast} from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      const { userData, isAuthenticated } = await loadUserDataFromCookie();
      setUserData(userData);
      setIsAuthenticated(isAuthenticated);
    };
    initializeUser();
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      const data = await signIn(email, password);
      setUserData(data);
      setIsAuthenticated(true);
      toast.success("your logged successfully");
    } catch (error) {
      const err=JSON.parse(JSON.stringify(error.response.data));
      toast.error(`error:${err.error}`);
      // TODO: Handle errors (display error message to the user)
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUserData(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log('handleSignOut error:', error);
      // TODO: Handle errors (display error message to the user)
    }
  };

  const handleSignUp = async (firstName, lastName, email, password, profilePicture, menstrualCycle, height, weight) => {
    try {
      const data = await signUp(firstName, lastName, email, password, profilePicture, menstrualCycle, height, weight);
      setUserData(data);
      setIsAuthenticated(true);
      toast.success("your logged successfully");
    } catch (error) {
      const err=JSON.parse(JSON.stringify(error.response.data));
      toast.error(`error:${err.error}`);
      toast.error('error:',error);

      // TODO: Handle errors (display error message to the user)
    }
  };

  const handleaddScore = async (userId,firstName,lastName,email,password,role,menstrualCycle,profilePicture,myScore,height,weight) => {
    try{
      const data = await updateScore(userId,firstName,lastName,email,password,role,menstrualCycle,profilePicture,myScore,height,weight);
      setUserData(data);
    } catch(error){
      const err=JSON.parse(JSON.stringify(error.response.data));
      toast.error('error:',err);
    }
  }

  const handleupdate = async (userId,firstName,lastName,email,password,role,menstrualCycle,profilePicture,myScore,height,weight) => {
    try{
      const data = await updateUser(userId,firstName,lastName,email,password,role,menstrualCycle,profilePicture,myScore,height,weight);
      console.log(data);
      setUserData(data);
    } catch(error){
      const err=JSON.parse(JSON.stringify(error.response.data));
      toast.error('error:',err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        isAuthenticated,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleSignUp,
        addScore: handleaddScore,
        update:handleupdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};