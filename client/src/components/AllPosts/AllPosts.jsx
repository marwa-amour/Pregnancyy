import '../../styles/validate.css'
import React, { useEffect, useState } from 'react'
import { getAllPosts, deletePost, searchPost} from '../../services/postService';
import { Link } from 'react-router-dom';
import AddPost from './AddPost/AddPost';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { filterByObject } from '../../utils/authUtils';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';
export default function AllMovies() {


  const [posts,setPosts] = useState(null);
  const [postswithnewfiter,setNew]=useState(1);
  const [topping, setTopping] = useState("All");
  const [search,setSearch]= useState('');
  const [error,setError]= useState("");
  
  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await getAllPosts();
      const postsArray = response.data.data;
      setPosts(postsArray);
      setNew(postsArray);
    };
    fetchAllPosts();
  },[])
  
 
  const onOptionChange = e => {
    setTopping(e.target.value);
    if(e.target.value==='All'){
    console.log(postswithnewfiter)
      setNew(posts);
    }
    else{
      setNew(filterByObject(posts,postsFilter));
    }
    console.log(postswithnewfiter)
  }
  var postsFilter = [
    {keyName:'catagories',type:'contains',value:topping}
  ]


  const handleClick = async() => {
    try{
      const reasult=await searchPost(search);
      console.log(reasult.data.data);
      setNew(reasult.data.data);
      setSearch(' ');
      setError("");
    }catch(error){
      const err=JSON.parse(JSON.stringify(error.response.data));
      setSearch(' ')
      setError(err.error);
    } 
  }

  return (
    <div className='AllPosts'>
      {
        !posts 
        ? 'Loading posts, Please wait ...'
        : <React.Fragment>
            <div className='myPosts'>
              {
                postswithnewfiter.map((post) => (

                  <MDBCard className='mb-3'>
                    <Link className="card" key={post._id} to={`/posts/${post._id}`}>
                      <MDBCardImage position='top' src={post.image} alt='...' />
                      <MDBCardBody>
                        <MDBCardTitle>{post.title}</MDBCardTitle>
                        <MDBCardText>{post.explaintite}</MDBCardText>
                      </MDBCardBody>
                    </Link>
                    <ProtectedRoute allowedRoles={['Admin']}>
                    <button className='delete' onClick={()=>deletePost(post._id)}>delete Post</button>
                    </ProtectedRoute>
                  </MDBCard>
                  
                ))
              }
            </div>

            <div className='myFilters'>
              <div className='search'>
                <h5>search title text:</h5>
                <input type='text' name='search' onChange={(e)=>setSearch(e.target.value)}></input>
                <button type='submit' onClick={handleClick}><img src='https://img.icons8.com/?size=2x&id=nEaCzRRWyzwN&format=gif'></img></button>
                <span>{error}</span> 
              </div>  
              
              <hr></hr>
              
              <h5>Sort by:</h5>
              <label className="container" htmlFor="all">
                <input type="radio" name="topping" value="all" id="all" checked={topping === "all"} onChange={onOptionChange}/>
                <span className="checkmark">All</span>
              </label>

              <label className="container" htmlFor="1st trimester">
                <input type="radio" name="topping" value="1st trimester" id="1st trimester" checked={topping === "1st trimester"} onChange={onOptionChange}/>
                <span className="checkmark">1st trimester</span>
              </label>

              <label className="container" htmlFor="2st trimester">
                <input type="radio" name="topping" value="2st trimester" id="2st trimester" checked={topping === "2st trimester"} onChange={onOptionChange}/>
                <span className="checkmark">2st trimester</span>
              </label>

              <label className="container" htmlFor="3st trimester">
                <input type="radio" name="topping" value="3st trimester" id="3st trimester" checked={topping === "3st trimester"} onChange={onOptionChange}/>
                <span className="checkmark">3st trimester</span>
              </label>

              <hr></hr>
              
              <div className='addPost'><ProtectedRoute allowedRoles={['Admin']}><AddPost/></ProtectedRoute></div>

            </div>
          </React.Fragment>
      }
    </div>
  )
}
