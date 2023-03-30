import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import reactMarkdown from "react-markdown";
import { useDispatch, useSelector } from 'react-redux';

import { fetchPostComments } from '../redux/slices/comments';

export const FullPost = () => {
  const [data, setData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)
  const {id} = useParams()
  const dispatch = useDispatch()
  const {comments} = useSelector(state => state.comments)
  const isCommentsLoading = comments.status === 'loading'

  React.useEffect(()=>{
    
    dispatch(fetchPostComments(id))

    axios.get(`/posts/${id}`).then(res => {
      setData(res.data)
      setIsLoading(false)
    }).catch(err => {
      console.warn(err)
      alert('Error getting post')
    })
  }, [])

  // React.useEffect(()=>{
    
  //   axios.get(`/posts/${id}/comments`).then(res => {
  //     setData(res.data)
  //     setIsLoading(false)
  //   }).catch(err => {
  //     console.warn(err)
  //     alert('Error getting post')
  //   })
  // }, [])

  if (isLoading){
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}`: ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={comments.items}
        isLoading={isCommentsLoading}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
