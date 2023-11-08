import React, { useEffect } from 'react'
import { Header } from '../../components/header'
import { useAuth } from '../../store/slices/auth'
import { Navigate, Outlet } from 'react-router-dom';
import { Container } from '@mui/material'
import {useTheme} from "../../theme";
import Footer from '../../components/footer';
import Space from '../../components/space';
import User from '../../services/user';
import { PATH } from '../../consts';

const PublicWrapper = () => {
  const { user } = useAuth();
  const { colors } = useTheme();

  useEffect(() => {
    User.getProfile();
  }, []);

  if (!user) return <div></div>
  return (
    <div style={{backgroundColor: colors.primary.DEFAULT, minHeight: '100vh'}}>
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