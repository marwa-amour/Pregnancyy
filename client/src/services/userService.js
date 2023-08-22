import http from "./httpService";

export async function getAllUsers() {
  const response = http.get('/users');
  return response;
}
export async function getUserById(userId) {
  const response = http.get(`/users/${userId}`);
  return response;
}
export const updateScore= async(userId,firstName,lastName,email,password,role,menstrualCycle,profilePicture,myScore,height,weight)=>{
    const response = await http.put(`/users/addScore/${userId}`, {firstName,lastName,email,password,role,menstrualCycle,profilePicture,myScore,height,weight});
    return response.data;
}

export const updateUser= async(userId,firstName,lastName,email,password,role,menstrualCycle,profilePicture,myScore,height,weight)=>{
  const response = await http.put(`/users/${userId}`, {firstName,lastName,email,password,role,menstrualCycle,profilePicture,myScore,height,weight});
  return response.data;
}

export const Fileload=async(data)=>{
  const response = await http.post('image',{data});
  console.log(response.data)
  return response.data;
}

export async function deleteUser(userId) {
  const response = http.delete(`/users/${userId}`);
  return response;
}
