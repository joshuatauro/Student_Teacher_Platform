import logo from './logo.svg';
import './App.css';
import PostPreview from './Components/PostPreview';
import Landing from './Pages/Landing';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import SinglePost from './Pages/SingleQuestion';
import SingleQuestion from './Pages/SingleQuestion';
import Navbar from './Components/Navbar';
import SideNav from './Components/sidenav';
import SearchQuestions from './Pages/Search';
import Signup from './Pages/SignUp';
import Login from './Pages/Login';
import User from './Pages/User';
import Publish from './Pages/CreatePost';
import Placements from './Pages/Placements';
import Resources from './Pages/Resources';
import { useState } from 'react';


const SearchRoute = () => {
  return(
    <>
      <Navbar />
      <div className="grid lg:grid-cols-new-layout max-w-[1600px] m-auto ">
        <SideNav tab={1} />
        <SearchQuestions />
      </div>
    
  </>
  )
}

const FeedRoutes = () => {
  return (
    <div className=''>
     <Navbar />
      <div className="grid lg:grid-cols-new-layout max-w-[1600px] m-auto ">
        <SideNav tab={1} />
        <Landing />
      </div>
    </div>
  )
}

const QuestionRoute = () => {
  return (
    <>
      <Navbar />
      <div className="grid lg:grid-cols-new-layout max-w-[1600px] m-auto ">
        <SideNav tab={1} />
        <SinglePost />
      </div>
    </>
  )
}

// const PublishRoute = () => {
//   return(
//     <>
//       <Navbar />
//       <div className="grid lg:grid-cols-layout max-w-[1600px] m-auto ">
//         <SideNav />
//           <Publish />
//         <TagsBar />
//       </div>
//     </>
//   )
// }

// const UserRoute = () => {
//   return(
//     <>
//       <Navbar/>
//       <div className="grid lg:grid-cols-layout max-w-[1600px] m-auto ">
//         <SideNav tab={3} />
//           <User />
//         <TagsBar />
//       </div>
//     </>
//   )
// }

// const UsersRoute = () => {
//   return (
//     <>
//       <Navbar/>
//       <div className="grid grid-cols-layout ">
//         <SideNav tab={3} />
//           <Users />
//         <TagsBar />
//       </div>
//     </>
//   )
// }

// const TagRoute = () => {
//   return(
//     <>
//     <Navbar />
//     <div className="grid lg:grid-cols-layout max-w-[1600px] m-auto ">
//       <SideNav tab={1} />
//         <Routes>
//           <Route path='/' element={<TagQuestions />} />
//         </Routes>
//         <TagsBar />
//     </div>
//   </>
//   )
// }


const UserRoute = () => {
  return(

    <>
      <Navbar />
      <div className="grid lg:grid-cols-new-layout max-w-[1600px] m-auto ">
        <SideNav tab={1} />
        <User />
      </div>
    </>
    )
}

const PostCreateRoute = () => {
  return(

    <>
      <Navbar />
      <div className="grid lg:grid-cols-new-layout max-w-[1600px] m-auto ">
        <SideNav tab={3} />
        <Publish />
      </div>
    </>
    )
}

const PlacementRoute = ({tab}) => {
  return(

    <>
      <Navbar />
      <div className="grid lg:grid-cols-new-layout max-w-[1600px] m-auto ">
        <SideNav tab={tab} />
        <Placements />
      </div>
    </>
    )
}

const ResourceRoutes = () => {
  return(

    <>
      <Navbar />
      <div className="grid lg:grid-cols-new-layout max-w-[1600px] m-auto ">
        <SideNav tab={2} />
        <Resources />
      </div>
    </>
    )
}

function App() {
  const [tab, setTab] = useState(1)
  return (
    <div className="App bg-white font-inter min-h-screen">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedRoutes tab={1} />} />   
        <Route path="/question/:qid" element={<QuestionRoute tab={1} />} />       
        <Route path="/search" element={<SearchRoute tab={1} />} />  
        <Route path="/signup" element={<Signup />} />    
        <Route path="/login" element={<Login  />} /> 
        <Route path="/user/:username" element={<UserRoute />} />
        <Route path="/post" element={<PostCreateRoute tab={4} />} />           
        <Route path="/placements" element={<PlacementRoute tab={3} />} />
        <Route path="/resources" element={<ResourceRoutes tab={2} />} />                                  
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
