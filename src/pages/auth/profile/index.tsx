import { Box, Container, Grid, Button, List, Paper, Typography, Skeleton, TextField, Input, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme as useThemeColors } from '../../../theme';
import { setUser, useAuth } from '../../../store/slices/auth';
import Space from '../../../components/space';
import { ITeam, ITeamCreateRequest, ITeamsRequest } from '../../../interfaces/team';
import TeamCard from '../../../components/team-card';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddModal from '../../../components/data-grid/addModal';
import { IFieldInit, useAddData } from '../../../components/data-grid/useAddData';
import { useApi, useDataApi } from '../../../api/hook';
import api from '../../../api';
import { useInput } from '../../../hooks';
import { IUser, IUserEditRequest } from '../../../interfaces/user';
import { debounce } from 'lodash';
import { showAlert } from '../../../datafunc';
import { useDispatch } from 'react-redux';
import EditTeamCard from '../../../components/team-card/EditCard';
import { useEditTeam } from '../../../components/team-card/useEdit';

const ProfileMePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { colors } = useThemeColors();
  const { user } = useAuth();
  const name = useInput('');
  const surname = useInput('');
  const addObject = useAddData(addFields);
  const [showAdd, setShowAdd] = useState(false);
  const editTeamObject = useEditTeam();

  const myTeams = useDataApi<ITeamsRequest, ITeam[]>([], api.team.getMy);
  const createTeam = useApi<ITeamCreateRequest, void>(api.team.create);
  const udateProfile = useApi<IUser, IUser>(api.auth.editProfile);
  const updateTeam = useApi<ITeam, ITeam>(api.team.edit);
  
  const editTeam = () => {
    updateTeam.fetchData({...editTeamObject.value!!, 
      title: editTeamObject.title.value, 
      preview: editTeamObject.preview.value,
      contacts: editTeamObject.contacts.value,
      info: editTeamObject.info.value,
      code: undefined,
    }, 'Успешно обновлено')
    .then(result => result && myTeams.fetchData());
  }
  
  
  const editProfile = useCallback(debounce((editData: IUser) => {
    udateProfile.fetchData(editData, 'успешно обновлено')
    .then(data => data&&dispatch(setUser(editData)));
  }, 1000), []);
  const addTeam = () => {
    createTeam.fetchData(addObject.dto())
    .then(() => addObject.setInit())
    .then(() => myTeams.fetchData())
  }

  useEffect(() => {
    if ((user?.name !== name.value || user?.surname !== surname.value) && surname.value && name.value) {
      editProfile({...user!!, name: name.value, surname: surname.value})
    }
  }, [name.value, surname.value]);
  useEffect(() => {
    myTeams.fetchData();
  }, []);
  useEffect(() => {
    if (user) {
      name.updateValue(user.name);
      surname.updateValue(user.surname);
    }
  }, [user]);
  const inputStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    fontSize: '35px',
    fontWeight: 'bold',
    fontFamily: [
      'Montserrat', 
      'sans-serif',
    ].join(','),
    padding: 0,
    margin: 0,
    color: theme.palette.text.primary,
  };
  return (
    <Box sx={{minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Container>
        <Paper sx={{padding: "40px"}}>
          <div>
            <input {...name} style={{...inputStyle, width: `${calculateWidth(name.value.length)}ch`}}/>
            <input {...surname} style={{...inputStyle, width: `${calculateWidth(surname.value.length)}ch`}}/>
            <Typography sx={{display: 'inline-block'}} variant='h2'><span style={{color: colors.highligh}}>{user?.rating}</span></Typography>
            <Space h='10px'/>
            <Typography color={colors.gray[100]} variant='h5'>{user?.email}</Typography>
          </div>
            <Grid container display='flex' spacing={2} mt={10} /*justifyContent='center'*/>
              <Grid item xs={6}>
                <Grid display='flex' justifyContent='space-between'>
                  <Typography variant='h3'>Мои команды</Typography>
                  <Button variant='contained' color='success' onClick={() => setShowAdd(true)}>
                    <GroupAddIcon sx={{marginRight: '5px'}}/>
                    Создать
                  </Button>
                </Grid>
                <List>
                  {myTeams.isLoading
                  ? Array(2).fill(null).map((e, i) => <Skeleton
                    key={[234, 321][i]}
                    animation='wave'
                    variant='rounded'
                    width='100%'
                    height={200}
                    style={{
                      marginBottom: '10px',
                      borderRadius: '10px'
                    }}
                  />)
                  :myTeams.data.map((e) => (
                    <TeamCard key={e.title} data={e} editOnCLick={() => {editTeamObject.updateValues(e)}} showCode/>
                  ))}
                </List>
              </Grid>
              {editTeamObject.value && <Grid item xs={6} mt={5.6}>
                <EditTeamCard key={'fdgh'} dataObject={editTeamObject} editOnCLick={editTeam}/>
              </Grid>}
            </Grid>
        </Paper>
      </Container>
      <AddModal open={showAdd} setOpen={setShowAdd} addObject={addObject} onSubmit={addTeam}/>
    </Box>
  )
}

export default ProfileMePage


const calculateWidth = (width: number) => Math.round(((width) * (145/153))) + 1;
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