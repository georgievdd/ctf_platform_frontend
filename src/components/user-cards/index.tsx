import React, { ReactNode } from 'react'
import { IUser } from '../../interfaces/user'
import { Paper, Grid, Typography, Divider, Container } from '@mui/material'
import Space from '../space';
import { useTheme } from '../../theme';

const UserCards = ({users, pagination} : {users: IUser[], pagination: ReactNode}) => {

  console.log(users)

  const { colors } = useTheme();

  const fs: React.CSSProperties = {
    fontSize: '15px',
  }
  const border: React.CSSProperties = {
    borderRight: '1px solid gray',
  }

  return (
    <Container sx={{width: '100%'}}>
      <Paper sx={{textAlign: 'center', mb: 2}}>
          <Grid sx={{p: 1}} container justifyContent='space-evenly'>
            <Grid item xs={3} sx={border}><Typography>Имя</Typography></Grid>
            <Grid item xs={3} sx={border}><Typography>Фамилия</Typography></Grid>
            <Grid item xs={3} sx={border}><Typography>Рейтинг</Typography></Grid>
            <Grid item xs={3}><Typography>Контакты</Typography></Grid>
          </Grid>
      </Paper>
        {users.map((user, idx) => (
      <Paper sx={{mb: 2, textAlign: 'center'}}>
            <Grid key={user.id} sx={{p: 1}} container justifyContent='space-evenly'>
              <Grid item xs={3} sx={border}><Typography sx={fs}>{user.name}</Typography></Grid>
              <Grid item xs={3} sx={border}><Typography sx={fs}>{user.surname}</Typography></Grid>
              <Grid item xs={3} sx={border}><Typography sx={{...fs, color: colors.highligh}}>{user.rating}</Typography></Grid>
              <Grid item xs={3}><Typography sx={{fontSize: '12px'}}>{user.email}</Typography></Grid>
            </Grid>
      </Paper>
          ))}
    <Space h={'10px'} />
    {pagination}
    <Space h={'10px'} />
  </Container>
  )
}

export default UserCards