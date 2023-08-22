import '../../../styles/validate.css';
import React, { useEffect, useState, useContext } from 'react'
import { getPostById } from '../../../services/postService';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';
import { addPostToList } from '../../../services/myFavService';
import { AuthContext } from '../../../context/authContext';

export default function PostDetails(props) {

  const { userData,addScore } = useContext(AuthContext);
  const { postId } = props;
  const [post,setPost] = useState('');
  const [myComment,setMyComment]= useState('');
  const [error,setError]= useState("");

  useEffect(() => {
    const fetchPost = async (postId) => {
      try {
        const response = await getPostById(postId);
        const fetchedPost = response.data.data;
        setPost(fetchedPost);
      } catch(error) {
        if (error.response) {
          console.log('We have an error:', error.response.data);
        } else {
          console.log('We have an error:', error.message);
        }
      }
    };
    fetchPost(postId);
  },[postId])


  const handleClick = async() => {
    try{
      await addPostToList(postId,myComment);
      setMyComment(' ');
      setError("");
      alert("added in your Favorite post")
    }catch(error){
      const err=JSON.parse(JSON.stringify(error.response.data));
      setMyComment(' ')
      setError(err.error);
    }
    try{
      await addScore(userData.id,userData.firstName,userData.lastName,userData.email,userData.password,userData.role,userData.menstrualCycle,userData.profilePicture, userData.myScore,userData.height,userData.weight);
    }catch(err){
      console.log(err);
    }
  }


  return (
    <ProtectedRoute allowedRoles={['Admin','User']}>
      <article className="post">
        {
        !post?
        <div>Loading post data, Please wait...</div>:
        <React.Fragment>
          <div>
            <img className="absolute-bg" src={post.image} alt="poster-img"></img>
          </div>
    
          <div className="post__content">
            <h1 className="post__header"><span>{post.title}</span></h1>
            <p className="post__text">{post.explaintite}</p>
            <hr></hr>
            <ol className="olcards">
              <li>
                <div className="content">
                  <div className="text">{((post.body).split('\n'))[0]}</div>
                </div>
              </li>
              <li>
                <div className="content">
                  <div className="text">{((post.body).split('\n'))[1]}</div>
                </div>
              </li>
              <li>
                <div className="content">
                  <div className="text">{((post.body).split('\n'))[2]}</div>
                </div>
              </li>
            </ol>

            <div className='comment'>
              <div>
                <textarea onChange={(e)=>setMyComment(e.target.value)}>Write your comment</textarea>
                <span>{error}</span>   
              </div>
              <button type='button' onClick={handleClick}><i><img src='https://img.icons8.com/?size=2x&id=diQEglEIKvnX&format=gif'></img></i></button>
            </div>

          </div> 
        </React.Fragment>
        }


      </article>

    </ProtectedRoute>
  )
  
}
