import React from 'react'
import { Header } from '../../components/header'
import { useAuth } from '../../store/slices/auth'
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material'
import {useTheme} from "../../theme";
import Footer from '../../components/footer';
import Space from '../../components/space';

const PublicWrapper = () => {
  const { user } = useAuth();
  const { colors } = useTheme();

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