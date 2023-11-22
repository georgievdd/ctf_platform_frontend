import React, { useEffect, useState } from 'react'
import SearchInput from "../../../components/search-input";
import {useInput} from "../../../hooks";
import Space from "../../../components/space";
import { ITeam, ITeamSendInviteRequest, ITeamsRequest } from '../../../interfaces/team';
import TeamCard from '../../../components/team-card';
import { Container, Grid, Pagination, Skeleton } from '@mui/material';
import TeamCardModal from '../../../components/team-card/modal';
import { useApi, useDataApi } from '../../../api/hook';
import api from '../../../api';

const TeamPage = () => {

  const teams = useDataApi<ITeamsRequest, ITeam[]>([], api.team.getAll);
  const inviteCode = useApi<ITeamSendInviteRequest, void>(api.team.sendInviteCode);

  useEffect(() => {
    teams.fetchData();
  }, []);

  const input = useInput('');
  const modalInput = useInput('');
  const [open, setOpen] = useState(false);
  const [modalTeam, setModalTeam] = useState<null | ITeam>(null);
  const showModal = (data: ITeam) => {
    setModalTeam(data);
    setOpen(true);
  }
  const modalOnclick = () => {

    inviteCode.fetchData({code: modalInput.value, teamId: modalTeam!!.id})

    modalInput.onChange({target: {value: ''}});
    setModalTeam(null);
    setOpen(false);
  }
  return (
    <div>
      <Grid container>
        <TeamCardModal open={open} setOpen={setOpen} team={modalTeam} onClick={modalOnclick} input={modalInput}/>
        <Grid item xs={8}><Container sx={{width: '100%'}}>
            {teams.isLoading 
            ?Array(5).fill(null).map((e, i) => (
            <Skeleton
              key={i}
              animation='wave'
              variant='rounded'
              width='100%'
              height={200}
              style={{
                marginBottom: '10px'
              }}
            />))
            :teams.data.map((team, idx) => (
            <TeamCard
              key={team.title + idx}
              data={team}
              inviteOnClick={showModal}
            />
            ))}
            <Space h={'10px'} />
            <Grid display='flex' justifyContent='center'>
              <Pagination count={10} color="secondary" size='large'/>
            </Grid>
            <Space h={'10px'} />
        </Container></Grid>
        <Grid item xs={4}><SearchInput {...input} placeholder={'Поглатители циферок'} /></Grid>
      </Grid>
    </div>
  )
}

export default TeamPage