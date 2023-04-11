import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form'

import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";

import interfaceData from "../../assets/data/interface.json"

export const Login = () => {
  

  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const {
    register, 
    handleSubmit, 
    setError, 
    formState: {errors, isValid}
  } = useForm({
    defaultValues : {
      email: 'sidorov1@test.com',
      password: '12345'
    },
    mode: 'onChange'
  })

const onSubmit = async (values) => {
  const data = await dispatch(fetchAuth(values))
  // dispatch(fetchAuth(values))

  if(!data.payload){
    return alert('Failed to login!')
  }
  if('token' in data.payload){
    window.localStorage.setItem('token', data.payload.token)
  }
}

React.useEffect(()=>{
 
}, [])

if(isAuth) {
  return <Navigate to='/' />
}

  return (
    <Paper classes={{ root: styles.root }} >
      <Typography classes={{ root: styles.title }} variant="h5">
      {interfaceData.find((el) => el.lang === 'fr')?.inscription.autorisationPage.login}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={styles.field}
        label={interfaceData.find((el) => el.lang === 'fr')?.inscription.autorisationPage.emailPlaceholder}
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type= 'email'
        {...register('email', {required: interfaceData.find((el) => el.lang === 'fr')?.inscription.autorisationPage.emailHelp})}
        fullWidth
      />
      <TextField 
        className={styles.field} 
        type='password'
        label={interfaceData.find((el) => el.lang === 'fr')?.inscription.autorisationPage.passwordPlaceholder}
        error={Boolean(errors.email?.message)}
        helperText={errors.password?.message}
        {...register('password', {required: interfaceData.find((el) => el.lang === 'fr')?.inscription.autorisationPage.passwordHelp})}
      fullWidth />
      <Button type='submit' size="large" variant="contained" fullWidth>
      {interfaceData.find((el) => el.lang === 'fr')?.inscription.autorisationPage.enterButton}
      </Button>
      </form>
    </Paper>
  );
};
