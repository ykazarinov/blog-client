import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tabs } from '@mui/material';
import {Tab} from '@mui/material';
import {Grid} from '@mui/material';
import { useNavigate} from "react-router-dom";


import { orderBy } from 'lodash';


import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
const dispatch = useDispatch()
const userData = useSelector(state => state.auth.data)
const {posts, tags} = useSelector(state => state.posts)

const isPostLoading = posts.status === 'loading'
const isTagsLoading = tags.status === 'loading'

const navigate = useNavigate()
const [tabIndex, setTabIndex] = React.useState(0);
const [popularPosts, setPopularPosts] = React.useState([]);
const [newPosts, setNewPosts] = React.useState([]);

React.useEffect(()=>{
  navigate(`?sortProperty=${tabIndex}`);
}, [])

const handleTabChange = (event, newTabIndex) => {
  setTabIndex(newTabIndex);
  
    navigate(`?sortProperty=${newTabIndex}`);
 
  
};







  React.useEffect(()=> {
    dispatch(fetchPosts())
    dispatch(fetchTags())
    
   
  }, [])

  React.useEffect(()=>{
   
    setPopularPosts(orderBy(posts.items, 'viewsCount', 'desc'))
    setNewPosts(orderBy(posts.items, 'createdAt', 'desc'))
      
  
    
  }, [posts])




  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={tabIndex} aria-label="basic tabs example"  onChange={handleTabChange} >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        {tabIndex === 0 && (
          <Grid xs={8} item>
          
            {(isPostLoading && newPosts.length < 1 ? [...Array(5)]: newPosts).map((obj, index) => isPostLoading ? <Post key ={index} isLoading={true}/> : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}`: ''} 
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
                key ={index}
              />
            ))}
           
          </Grid>
         )}

         {tabIndex === 1 && (
          
          <Grid xs={8} item>

            {(isPostLoading && popularPosts.length < 1 ? [...Array(5)]:  popularPosts).map((obj, index) => isPostLoading ? <Post key ={index} isLoading={true}/> : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}`: ''} 
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
                key ={index}
              />
            ))} 

          </Grid>
          
 
         )}
       
       
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
