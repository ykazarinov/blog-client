import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from 'react-redux';
import Layout from './Layouts/main';
import { Home, FullPost, Registration, AddPost, Login, TagPage } from "./pages";
import  Dashboard  from "./pages/Dashboard"
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(()=>{
    dispatch(fetchAuthMe())
  },[])
  return (
    <>

      <Container maxWidth="lg">
       <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} /> 
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tag/:tag" element={<TagPage />}  />
        </Route>
       
       </Routes>
      </Container>
      
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
