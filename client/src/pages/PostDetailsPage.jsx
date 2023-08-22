import PostDetails from '../components/AllPosts/PostDetails/PostDetails';
import './Page.css'
import { useParams } from 'react-router-dom'

export default function MovieDetailsPage() {

  const { postId } = useParams();

  return (
    <div className='PostDetails Page'>
        <PostDetails postId={postId}/>
    </div>
  )
}