import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import reactMarkdown from "react-markdown";
import { useDispatch, useSelector } from 'react-redux';

import { fetchPostComments } from '../redux/slices/comments';

export const FullPost = () => {
  const [currentPost, setCurrentPost] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)
  const {id} = useParams()
  const dispatch = useDispatch()
  const {comments} = useSelector(state => state.comments)
  const isCommentsLoading = comments.status === 'loading'

  React.useEffect(()=>{
    
    dispatch(fetchPostComments(id))

    axios.get(`/posts/${id}`).then(res => {
      setCurrentPost(res.data)
      setIsLoading(false)
    }).catch(err => {
      console.warn(err)
      alert('Error getting post')
    })
  }, [])

  const {data} = useSelector(state => state.auth)

  if (isLoading){
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={currentPost._id}
        title={currentPost.title}
        imageUrl={currentPost.imageUrl ? `http://localhost:4444${currentPost.imageUrl}`: ''}
        user={currentPost.user}
        createdAt={currentPost.createdAt}
        viewsCount={currentPost.viewsCount}
        
        tags={currentPost.tags}
        isFullPost
      >
        <ReactMarkdown children={currentPost.text} />
      </Post>
      <CommentsBlock
        items={comments.items}
        isLoading={isCommentsLoading}
      >
        {data &&
        <AddComment />
        }
      </CommentsBlock>
    </>
  );
};
