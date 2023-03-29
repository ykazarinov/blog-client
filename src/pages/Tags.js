import React from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { MiniPost } from '../components/MiniPost';
import { useDispatch, useSelector } from 'react-redux';
// import { filter } from 'lodash';

export const Tags = () =>{
    const {tag} = useParams()
    const {posts, tags} = useSelector(state => state.posts)
    const isPostLoading = posts.status === 'loading'
    const [tagPosts, setTagPosts] = React.useState([]);


    React.useEffect(()=>{
        setTagPosts(posts.items.filter(elem=>elem.tags.find(mytag=> mytag === tag)))
       }, [])

    return<>
        <h2>{`#${tag}`}</h2>
        <Grid container spacing={4}>
            

        {(isPostLoading && tagPosts.length < 1 ? [...Array(5)]: tagPosts).map((obj, index) => isPostLoading ? <MiniPost key ={index} isLoading={true}/> : (
              <MiniPost
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}`: ''} 
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                
                key ={index}
              />
            ))}


            {/* <Grid xs={8} item>111</Grid>
            <Grid xs={4} item>222</Grid> */}
        </Grid>
        
    </>
}