import React, { useEffect, useState } from 'react'
import { getMyPostList } from '../../services/myFavService';
import PostCard from './PostCard/PostCard';
import '../../styles/validate.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
export default function MyFavoritePosts() {

  const [myList,setMyList] = useState('');

  const fetchAllMyPosts = async () => {
    try{
      const response = await getMyPostList();
      const myPostsArray = response.data.data;
      setMyList(myPostsArray);

    }catch(error){
      console.log(error)
    }
  };
  useEffect(() => {
    
    if(!myList){
      fetchAllMyPosts();
    }
    console.log(myList);

  },[myList])
    
  return (
    <div className='FavoritePage'>
    {!myList 
    ? <h1>don't have any post in your favorite list !!</h1>:
    <Container>
      <Row>
        <Col sm={12}>
          <Table responsive variant="white">
            <thead>
                <tr>
                  <th>Post's image</th>
                  <th>Post's title</th>
                  <th>My comment</th>
                  <th>Delele/show</th>
                </tr>
            </thead>
            <tbody>
              <React.Fragment>
                {
                  myList.map((list) => (
                        <PostCard key={list._id} fav={list._id} post={list.postId} comment={list.myComment} fDelete={fetchAllMyPosts}></PostCard>
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
