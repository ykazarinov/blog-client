import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axios from '../../axios';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from "react-router-dom";
import {useForm} from 'react-hook-form'

export const Registration = () => {
  const [imageUrl, setimageUrl] = React.useState('');
  const inputFileRef = React.useRef(null)
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const {
    register, 
    handleSubmit, 
    setError, 
    formState: {errors, isValid}
  } = useForm({
    defaultValues : {
      fullName: 'Иван Иванов',
      email: 'ivanov@test.com',
      password: '1234',
      avatarUrl: ''

    },
    mode: 'onChange'
  })
  const onSubmit = async (values) => {
    values.avatarUrl = `http://localhost:4444${imageUrl}`;
    // values.avatarUrl = 'http://localhost.com/uploads/IMG_2571_result.jpg'
                        // 'https://bugs.corp2.net/view_all_bug_page.php'
    const data = await dispatch(fetchRegister(values))
    // dispatch(fetchAuth(values))
  
    if(!data.payload){
      return alert('Failed to register!')
    }
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  const handleChangeFile = async (event) => {
    try{
      const formData= new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const {data} = await axios.post('/upload', formData)
      setimageUrl(data.url)
      // console.log(data.url)
    }
    catch(err){
      console.warn(err)
      alert('File upload error!')
    }
  };

  const onClickRemoveImage = () => {
    setimageUrl('')
  };
  
  React.useEffect(()=>{
   
  }, [])
  
  if(isAuth) {
    return <Navigate to='/' />
  }


  return (
    <Paper classes={{ root: styles.root }} >
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
     
      <form onSubmit={handleSubmit(onSubmit)}>


      <div className={styles.avatar}>
      <Button onClick={()=> inputFileRef.current.click()}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </Button>
        <input ref={inputFileRef} type="file"  onChange={handleChangeFile} hidden  />
        {imageUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
         <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
         </>
      )}
      </div>


     <TextField         
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', {required: 'Enter full Name'})} 
        className={styles.field} 
        label="Полное имя" 
        fullWidth 
      />
      <TextField         
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type= 'email'
        {...register('email', {required: 'Enter your email'})} 
        className={styles.field} 
        label="E-Mail" 
        fullWidth 
      />
      <TextField         
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        type= 'password'
        {...register('password', {required: 'Enter your password'})} 
        className={styles.field} 
        label="Пароль" 
        fullWidth 
      />
      <Button 
        disabled={!isValid} 
        type='submit' 
        size="large" 
        variant="contained" 
        fullWidth
      >
        Зарегистрироваться
      </Button>
     </form>
    </Paper>
  );
};
