import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {useTheme} from "../../../theme";
import SearchAppBar from "../../../components/search-input";
import SearchInput from "../../../components/search-input";
import {useInput} from "../../../hooks";
import Space from "../../../components/space";
import { ITeam } from '../../../interfaces/team';
import TeamCard from '../../../components/team-card';
import { Container, Grid, Pagination } from '@mui/material';
import TeamCardModal from '../../../components/team-card/modal';
import Team from '../../../services/team';

const teams: ITeam[] = [
  {
    id: '1',
    title: "Чупапиксы",
    members: ['12', '432'],
    rating: 4.4,
    info: 'НИЯУ МИФИ ИИКС ЭП',
    contacts: '8 800 555 35 35',
    preview: 'default',
    captainId: '12312312',
  },
  {
    id: '1',
    title: "Чупапиксы",
    members: ['12', '432'],
    rating: 4.4,
    info: 'НИЯУ МИФИ ИИКС ЭП',
    contacts: '8 800 555 35 35',
    preview: 'default',
    captainId: '12312312',
  },
  {
    id: '1',
    title: "Чупапиксы",
    members: ['12', '432'],
    rating: 4.4,
    info: 'НИЯУ МИФИ ИИКС ЭП',
    contacts: '8 800 555 35 35',
    preview: 'default',
    captainId: '12312312',
  },
  {
    id: '1',
    title: "Чупапиксы",
    members: ['12', '432'],
    rating: 4.4,
    info: 'НИЯУ МИФИ ИИКС ЭП',
    contacts: '8 800 555 35 35',
    preview: 'default',
    captainId: '12312312',
  },
  {
    id: '1',
    title: "Чупапиксы",
    members: ['12', '432'],
    rating: 4.4,
    info: 'НИЯУ МИФИ ИИКС ЭП',
    contacts: '8 800 555 35 35',
    preview: 'default',
    captainId: '12312312',
  },
];

const TeamPage = () => {

  // const [teams, setTeams] = useState<ITeam[]>([]);

  // useEffect(() => {
  //   (async() => {
  //     setTeams(await Team.getAll());
  //   })()
  // }, []);

  const input = useInput('');
  const modalInput = useInput('');
  const [open, setOpen] = useState(false);
  const [modalTeam, setModalTeam] = useState<null | ITeam>(null);
  const showModal = (data: ITeam) => {
    setModalTeam(data);
    setOpen(true);
  }
  const modalOnclick = () => {

    Team.sendInviteCode({code: modalInput.value})

    console.log(modalInput.value);
    modalInput.onChange({target: {value: ''}});
    setModalTeam(null);
    setOpen(false);
  }
  return (
    <div>
      <Grid container>
        <TeamCardModal open={open} setOpen={setOpen} team={modalTeam} onClick={modalOnclick} input={modalInput}/>
        <Grid item xs={8}><Container sx={{width: '100%'}}>
          {
            teams.map((team, idx) => (
              <TeamCard
                key={team.title + idx}
                data={team}
                onClick={showModal}
              />
              ))
            }
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