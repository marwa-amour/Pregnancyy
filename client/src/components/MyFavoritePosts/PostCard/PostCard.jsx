import React,{useState,useEffect} from 'react';
import { getPostById } from '../../../services/postService';
import {deletePostFromList} from '../../../services/myFavService';
import '../../../styles/validate.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function PostCard(props) {

  const [post,setPost]=useState(null);
  
  useEffect(() => {
    const fetchAllMyPosts = async () => {
      const response = await getPostById(props.post);
      const myPostsArray = response.data.data;
      setPost(myPostsArray);
    };
    fetchAllMyPosts();
  },[])   
      
  const handleEpandRow = async(userId) => {
    console.log(userId)
    props.fDelete();
    const response = await deletePostFromList(userId);
    console.log(response);
  }
    
  return (
    <React.Fragment>
    {!post?
      'loading':
      <tr key={post._id}>

        <td>
          <img src={post.image} alt="" />
        </td>
        <td className='p'>
          {post.title}
        </td>
        <td className='p'>
          {props.comment}
        </td>
        <td>
          <Button className='delete' variant="link" onClick={()=>handleEpandRow(props.fav)}></Button>
          <Link to={`/posts/${post._id}`}><Button className='show' variant="link"></Button></Link>
        </td>
      
      </tr>
                
    }
    </React.Fragment>
  )
}
