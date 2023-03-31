import React from "react";
import { useDispatch} from 'react-redux';
import styles from "./AddComment.module.scss";
import axios from "../../axios";
import { useNavigate} from "react-router-dom";
import { TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchPostComments } from '../../redux/slices/comments';

export const AddComment = () => {
  const dispatch = useDispatch()
  const {data} = useSelector(state => state.auth)
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const {id} = useParams()
  const navigate = useNavigate()
  const onSubmit = async () => {
    try{
      setIsLoading(true)
      const fields = {
        text: text,
        postId: id,
      }
      const {data} = await axios.post('/comments', fields)
      dispatch(fetchPostComments(id))
      setText('')
      // const _id = data._id
      // navigate(`/posts/${_id}`)
    }catch(err){
      console.warn(err)
      alert('Error creating comment!')
    }
    
  }


  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={data.avatarUrl}
        />
        <div className={styles.form}>
          <TextField
           value={text}
           onChange= {(e) => setText(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
