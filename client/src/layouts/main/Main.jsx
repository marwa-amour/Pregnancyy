import { Routes, Route } from "react-router-dom";

// Components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// Pages
import HomePage from "../../pages/HomePage";
import Error404Page from "../../pages/Error404Page";
import PostsPage from "../../pages/PostsPage";
import PostDetailsPage from "../../pages/PostDetailsPage";
import SignInPage from "../../pages/SignInPage";
import ProfilePage from "../../pages/ProfilePage";
import SignUpPage from "../../pages/SignUpPage";
import WeeksPage from "../../pages/WeeksPage";
import SportsPage from "../../pages/SportsPage";
import SportDetailsPage from "../../pages/SportDetailsPage";
import MyFavorite from "../../pages/MyFavorite";
import AdminPage from "../../pages/AdminPage";
export default function Main() {
  return (
    <div className='Main'>
      <Header/>
      
      <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/signin" element={ <SignInPage/> } />
          <Route path="/signup" element={ <SignUpPage/> }  />
          <Route path="/profile" element={ <ProfilePage/> } />
          <Route path="/posts/:postId" element={ <PostDetailsPage/> } />
          <Route path="/posts" element={ <PostsPage/> } />
          <Route path="/weeks" element={ <WeeksPage/> } />
          <Route path="/sports" element={ <SportsPage/> } />
          <Route path="/sports/:sportId" element={ <SportDetailsPage/> } />
          <Route path='/myFavoritePosts' element={ <MyFavorite/> } />
          <Route path="*" element={<Error404Page />} />
          <Route path="/admin" element={<AdminPage />} />
          
      </Routes>
      
      <Footer/>
    </div>
  )
}
