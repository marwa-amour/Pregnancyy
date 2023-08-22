import React, {useState,useEffect} from 'react'
import {getAllUsers} from '../../services/userService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import UserCard from './UserCard/UserCard';
import '../../styles/validate.css'
export default function Admin() {

    const [users,setUsers] = useState(null);
    const fetchAllMyUsers = async () => {
        try{
            const response = await getAllUsers();
            const usersArray = response.data.data;
            setUsers(usersArray);
    
        }catch(error){
          console.log(error)
        }
    };
    useEffect(() => {
        
        if(!users){
          fetchAllMyUsers();
        }
        console.log(users);
    
    },[users])
    // useEffect(() => {
    //     const fetchAllUsers = async () => {
    //       const response = await getAllUsers();
    //       const usersArray = response.data.data;
    //       setUsers(usersArray);
    //     //   setDelete(users[1]._id)
    //     };
    //     fetchAllUsers();
    // },[deleteOne])

    // const handleEpandRow = async(userId) => {
    //     setDelete(userId);
    //     console.log(deleteOne)
    //     const response = await deleteUser(deleteOne);
    //     console.log(response);
    // }

  return (
    <div className='Admin'>
        {
        !users
        ? 'Loading users, Please wait ...'
        : <Container>
            <Row>
            <Col sm={12}>
                <Table responsive variant="dark">
                <thead>
                    <tr>
                        <th>image</th>
                        <th>User Id</th>
                        <th>User's Name</th>
                        <th>User's Email</th>
                        <th>Role</th>
                        <th>Delele</th>
                    </tr>
                </thead>
                <tbody>
                    <React.Fragment>
                    {
                        users.map((user) => (
                            
                            <UserCard key={user._id} fav={user._id} fDelete={fetchAllMyUsers}></UserCard>
                        ))
                    }
                    </React.Fragment>
                </tbody>
                </Table>
            </Col>
            </Row>
      </Container>
      }
    </div>
  )
}
