import { Box, Container, Grid, Button, List, Paper, Typography, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../theme'
import { useAuth } from '../../../store/slices/auth';
import Space from '../../../components/space';
import { ITeam, ITeamCreateRequest, ITeamsRequest } from '../../../interfaces/team';
import TeamCard from '../../../components/team-card';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddModal from '../../../components/data-grid/addModal';
import { IFieldInit, useAddData } from '../../../components/data-grid/useAddData';
import { useApi, useDataApi } from '../../../api/hook';
import api from '../../../api';


const ProfileMePage = () => {
  const { colors } = useTheme();
  const { user } = useAuth();

  const myTeams = useDataApi<ITeamsRequest, ITeam[]>([], api.team.getMy);
  const createTeam = useApi<ITeamCreateRequest, void>(api.team.create);

  const addObject = useAddData(addFields);
  const [showAdd, setShowAdd] = useState(false);
  
  
  const addTeam = () => {
    createTeam.fetchData(addObject.dto())
    .then(() => addObject.setInit())
    .then(() => myTeams.fetchData())
  }

  useEffect(() => {
    myTeams.fetchData();
  }, []);

  return (
    <Box sx={{minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Container>
        <Paper sx={{padding: "40px"}}>
          <div>
            <Typography variant='h2'>{user?.name} {user?.surname} <span style={{color: colors.highligh}}>{user?.rating}</span></Typography>
            <Space h='10px'/>
            <Typography color={colors.gray[100]} variant='h5'>{user?.email}</Typography>
          </div>
            <Grid container display='flex' spacing={2} mt={10}>
              <Grid item xs={6}>
                <Grid display='flex' justifyContent='space-between'>
                  <Typography variant='h3'>Мои команды</Typography>
                  <Button variant='contained' color='secondary' onClick={() => setShowAdd(true)}>
                    <GroupAddIcon sx={{marginRight: '5px'}}/>
                    Создать
                  </Button>
                </Grid>
                <List>
                  {myTeams.isLoading
                  ? Array(2).fill(null).map(() => <Skeleton
                      animation='wave'
                      variant='rounded'
                      width='100%'
                      height={200}
                      style={{
                        marginBottom: '10px'
                      }}
                    />)
                  :myTeams.data.map((e) => (
                    <TeamCard data={e}/>
                  ))}
                </List>
              </Grid>
              <Grid item xs={6} sx={{textAlign: 'center'}}>
                <Typography variant='h1'>Что нибудь еще </Typography>
              </Grid>
            </Grid>
        </Paper>
      </Container>
      <AddModal open={showAdd} setOpen={setShowAdd} addObject={addObject} onSubmit={addTeam}/>
    </Box>
  )
}

export default ProfileMePage


const addFields: IFieldInit[] = [
  {
    field: 'title',
    name: 'Название',
    type: 'text',
    defaultValue: '',
    required: true,
  },
  {
    field: 'info',
    name: 'Дополнительная информация',
    type: 'text',
    defaultValue: '',
  },
  {
    field: 'contacts',
    name: 'Контакты',
    type: 'text',
    defaultValue: '',
    required: true,
  },
  {
    field: 'preview',
    name: 'привьюшка',
    type: 'text',
    defaultValue: 'default',
  },
];