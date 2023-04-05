import React from 'react';
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import { AccountMenu } from '../AccountMenu';

import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import interfaceData from "../../assets/data/interface.json"

import logo from '../../assets/img/logo.png'

export const Header = () => {
    const isAuth = useSelector(selectIsAuth);



  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            
              
            <img src={logo} alt = 'François le Coq'/>


           
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
               
                
               




              <AccountMenu />


            










              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">{interfaceData.find((el) => el.lang === 'fr')?.inscription.header.login}</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">{interfaceData.find((el) => el.lang === 'fr')?.inscription.header.registration}</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
