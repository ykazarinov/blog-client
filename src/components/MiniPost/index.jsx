import React from 'react';
import {Link} from 'react-router-dom'
import clsx from 'clsx';

import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useDispatch } from 'react-redux';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';


export const MiniPost = ({
  id,
  title,
  createdAt,

  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,

}) => {
  const dispatch = useDispatch()
  if (isLoading) {
    return <PostSkeleton />;
  }



  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
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
