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

import interfaceData from "../../assets/data/interface.json"

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
    const data = await dispatch(fetchRegister(values))
    // dispatch(fetchAuth(values))
  
    if(!data.payload){
      return alert(interfaceData.find((el) => el.lang === 'fr')?.inscription.registrationPage.failedToRegister)
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
      alert(interfaceData.find((el) => el.lang === 'fr')?.inscription.registrationPage.fileUploadError)
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
      {interfaceData.find((el) => el.lang === 'fr')?.inscription.registrationPage.makeAccount}
      </Typography>
     
      <form onSubmit={handleSubmit(onSubmit)}>


      <div className={styles.avatar}>
        <Button onClick={()=> inputFileRef.current.click()}>
          {!imageUrl ? 
          <Avatar sx={{ width: 100, height: 100 }} /> :
          <Avatar sx={{ width: 100, height: 100 }} src={`http://localhost:4444${imageUrl}`} alt='Avatar' />
        }
          
        </Button>
        <input ref={inputFileRef} type="file"  onChange={handleChangeFile} hidden  />
        {imageUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
        {interfaceData.find((el) => el.lang === 'fr')?.inscription.registrationPage.delete}
        </Button>
         {/* <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" /> */}
         </>
      )}
      </div>


     <TextField         
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', {required:  interfaceData.find((el) => el.lang === 'fr')?.inscription.registrationPage.fullNameHelp})} 
        className={styles.field} 
        label={interfaceData.find((el) => el.lang === 'fr')?.inscription.registrationPage.fullNamePlaceholder} 
        fullWidth 
      />
      <TextField         
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type= 'email'
        {...register('email', {required: interfaceData.find((el) => el.lang === 'fr')?.inscription.registrationPage.emailHelp})} 
        className={styles.field} 
        label={interfaceData.find((el) => el.lang === 'fr')?.inscription.registrationPage.emailPlaceholder}
        fullWidth 
      />
      <TextField         
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        type= 'password'
        {...register('password', {required: interfaceData.find((el) => el.lang === 'fr')?.inscription.registrationPage.passwordHelp})} 
        className={styles.field} 
        label={interfaceData.find((el) => el.lang === 'fr')?.inscription.registrationPage.passwordPlaceholder}
        fullWidth 
      />
      <Button 
        disabled={!isValid} 
        type='submit' 
        size="large" 
        variant="contained" 
        fullWidth
      >
        {interfaceData.find((el) => el.lang === 'fr')?.inscription.registrationPage.registrationButton}
      </Button>
     </form>
    </Paper>
  );
};
