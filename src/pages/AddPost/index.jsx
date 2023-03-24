import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from "react-router-dom";
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';


export const AddPost = () => {
  const navigate = useNavigate()
  // const imageUrl = '';
  const isAuth = useSelector(selectIsAuth)
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setimageUrl] = React.useState('');
  const inputFileRef = React.useRef(null)

  const handleChangeFile = async (event) => {
    try{
      const formData= new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const {data} = await axios.post('/upload', formData)
      setimageUrl(data.url)
    }
    catch(err){
      console.warn(err)
      alert('File upload error!')
    }
  };

  const onClickRemoveImage = () => {
    setimageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try{
      setIsLoading(true)
      const fields = {
        title,
        text,
        imageUrl,
        tags
        // tags: tags.split(',')
      }
      const {data} = await axios.post('/posts', fields)
      const id = data._id
      navigate(`/posts/${id}`)
    }catch(err){
      console.warn(err)
      alert('Error creating post!')
    }
    
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if(!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />
  }

 

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={()=> inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
         <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
         </>
      )}
      {/* {imageUrl && (
       
      )} */}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange= {(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField         
        value={tags}
        onChange= {(e) => setTags(e.target.value)} 
        classes={{ root: styles.tags }} 
        variant="standard" 
        placeholder="Тэги" 
        fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
