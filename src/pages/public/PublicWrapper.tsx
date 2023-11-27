import React, { useEffect } from 'react'
import { Header } from '../../components/header'
import { setUser, useAuth } from '../../store/slices/auth'
import { Navigate, Outlet } from 'react-router-dom';
import { Container } from '@mui/material'
import {useTheme} from "../../theme";
import Footer from '../../components/footer';
import Space from '../../components/space';
import { PATH } from '../../consts';
import '../style.css';
import { useApi, useDataApi } from '../../api/hook';
import { IUser } from '../../interfaces/user';
import api from '../../api';
import { useDispatch } from 'react-redux';

const PublicWrapper = () => {
  const { user } = useAuth();
  const profile = useApi<any, IUser>(api.auth.getProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    profile.fetchData()
    .then((data) =>{
      if (!data) return;
      dispatch(setUser(data))
    });
  }, []);

  if (!user) return <div></div>
  return (
    <div className='background' style={{minHeight: '100vh'}}>
      <Container>
        <Header user={user!}/>
        <Space h='20px' />
        <Outlet />
        <Footer />
      </Container>
    </div>
  )
}

export default PublicWrapper