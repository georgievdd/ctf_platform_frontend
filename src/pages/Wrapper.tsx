import React from 'react'
import { AuthNavbar } from '../components/navbar'
import { useAuth } from '../store/slices/auth'
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material'

const Wrapper = () => {

  const { user } = useAuth();

  return (
    <div>
      <AuthNavbar user={user!}/>
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}

export default Wrapper