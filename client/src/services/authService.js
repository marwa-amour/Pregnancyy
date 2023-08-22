import http from '../services/httpService';
import Cookies from 'js-cookie';

export const signIn = async (email, password) => {
  const response = await http.post('/auth/signin', { email, password });
  return response.data;
};

export const signOut = async () => {
  Cookies.remove('token');
};
export const signUp = async (firstName, lastName, email, password, profilePicture, menstrualCycle, height, weight) => {
    const response = await http.post('/auth/signup', { firstName, lastName, email, password,profilePicture, menstrualCycle, height, weight },{withCredentials:true});
    console.log(response)
    return response.data;
  };
// export const signUp = async (firstName, lastName, email, password, menstrualCycle, profilePicture, height, weight) => {
//   const response = await http.post('/auth/signup', { firstName, lastName, email, password, menstrualCycle, profilePicture, height, weight });
//   return response.data;
// };