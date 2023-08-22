import React,{useState,useEffect,useContext} from 'react';
import '../../../styles/validate.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../../services/userService';
import { getUserById } from '../../../services/userService';
import { AuthContext } from '../../../context/authContext';

export default function PostCard(props) {

  const { userData,update } = useContext(AuthContext);
  const [user,setUser]=useState(null);
  const [role,setRole] = useState(null);
  useEffect(() => {
    const fetchAllMyUsers = async () => {
      const response = await getUserById(props.fav);
      const myUserArray = response.data.data;
      setUser(myUserArray);
      setRole(user.role)
    };
    fetchAllMyUsers();
  },[role])   
      
  const handleEpandRow = async(userId) => {
    if(userId!==userData.id){
      console.log(userId)
      props.fDelete();
      const response = await deleteUser(userId);
      console.log(response);
    }
  }

  const changeRole = async(role) => {
    if(role==='Admin'){
      setRole('User')
    }
    else{
      setRole('Admin')
    }
    await update(user.id,user.firstName,user.lastName,user.email,user.password,role,user.menstrualCycle,user.profilePicture, user.myScore,parseInt(user.height),parseInt(user.weight))
  }
    
  return (
    <React.Fragment>
    {!user?
      'loading':
      <tr key={user._id}>

        <td>
            <img style={{width:"100px"}} src={user.profilePicture} alt="" />
        </td>
        <td className='p'>
            {user._id}
        </td>
        <td className='p'>
            {user.firstName} {user.lastName}
        </td>
        <td className='p'>
            {user.email}
        </td>
        <td className='p'>
            <button onClick={changeRole}>{user.role}</button> 
        </td>
        {(user._id===userData.id)?
        <td></td>:
        <td>
          {console.log(`${userData.id}   ${user._id}`)}
            <Button className='delete' variant="link" onClick={()=>handleEpandRow(user._id)}>delete</Button>
        </td>
        }
      </tr>
                
    }
    </React.Fragment>
  )
}
