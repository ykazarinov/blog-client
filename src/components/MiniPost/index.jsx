import React from 'react';
import {Link} from 'react-router-dom'
import clsx from 'clsx';

import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useDispatch } from 'react-redux';

import styles from './MiniPost.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import axios from "../../axios";


export const MiniPost = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  // commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,

}) => {
  const dispatch = useDispatch()
  const [commentsCount, setCommentsCount] = React.useState(0)


  React.useEffect(()=>{
    if(id){
       axios.get(`/posts/${id}/comments`).then(res => {
      setCommentsCount(res.data.length)

    }).catch(err => {
      console.warn(id, err)
      alert('Error getting comments')
    })
    }
   
  }, [id])

  if (isLoading) {
    return <PostSkeleton />;
  }





  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h3 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h3>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
