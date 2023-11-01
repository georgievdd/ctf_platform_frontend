import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {useTheme} from "../../theme";
import SearchAppBar from "../../components/search-input";
import SearchInput from "../../components/search-input";
import {useInput} from "../../hooks";
import Space from "../../components/space";
import { ITeam } from '../../interfaces/team';
import TeamCard from '../../components/team-card';
import { Container, Grid, Pagination } from '@mui/material';
import TeamCardModal from '../../components/team-card/modal';

const teams: ITeam[] = [
  {
    id: '1',
    name: "Чупапиксы",
    members: [],
    rating: '4.4',
    info: 'НИЯУ МИФИ ИИКС ЭП',
    contacts: '8 800 555 35 35',
    preview: 'default',
    captain: {
      id: '12312312',
      team: 'goodWars',
      name: 'Denis',
      surname: 'Frilov',
      admin: true,
      email: '12312312@example.com',
      rating: '10'
    }
  },
  {
    id: '1',
    name: "Чупапиксы",
    members: [],
    rating: '4.4',
    info: 'НИЯУ МИФИ ИИКС ЭП',
    contacts: '8 800 555 35 35',
    preview: 'default',
    captain: {
      id: '12312312',
      team: 'goodWars',
      name: 'Denis',
      surname: 'Frilov',
      admin: true,
      email: '12312312@example.com',
      rating: '10'
    }
  },
  {
    id: '1',
    name: "Чупапиксы",
    members: [],
    rating: '4.4',
    info: 'НИЯУ МИФИ ИИКС ЭП',
    contacts: '8 800 555 35 35',
    preview: 'default',
    captain: {
      id: '12312312',
      team: 'goodWars',
      name: 'Denis',
      surname: 'Frilov',
      admin: true,
      email: '12312312@example.com',
      rating: '10'
    }
  },
  {
    id: '1',
    name: "Чупапиксы",
    members: [],
    rating: '4.4',
    info: 'НИЯУ МИФИ ИИКС ЭП',
    contacts: '8 800 555 35 35',
    preview: 'default',
    captain: {
      id: '12312312',
      team: 'goodWars',
      name: 'Denis',
      surname: 'Frilov',
      admin: true,
      email: '12312312@example.com',
      rating: '10'
    }
  },
  {
    id: '1',
    name: "Чупапиксы",
    members: [],
    rating: '4.4',
    info: 'НИЯУ МИФИ ИИКС ЭП',
    contacts: '8 800 555 35 35',
    preview: 'default',
    captain: {
      id: '12312312',
      team: 'goodWars',
      name: 'Denis',
      surname: 'Frilov',
      admin: true,
      email: '12312312@example.com',
      rating: '10'
    }
  },
  {
    id: '1',
    name: "Чупапиксы",
    members: [],
    rating: '4.4',
    info: 'НИЯУ МИФИ ИИКС ЭП',
    contacts: '8 800 555 35 35',
    preview: 'default',
    captain: {
      id: '12312312',
      team: 'goodWars',
      name: 'Denis',
      surname: 'Frilov',
      admin: true,
      email: '12312312@example.com',
      rating: '10'
    }
  },
];

const Team = () => {

  const { colors } = useTheme();
  const input = useInput('');
  const modalInput = useInput('');
  const [open, setOpen] = useState(false);
  const [modalTeam, setModalTeam] = useState<null | ITeam>(null);
  const showModal = (data: ITeam) => {
    setModalTeam(data);
    setOpen(true);
  }
  const modalOnclick = () => {
    console.log(modalInput.value);
    setModalTeam(null);
    setOpen(false);
    modalInput.onChange({target: {value: ''}});
  }
  return (
    <div>
      <Grid container>
        <TeamCardModal open={open} setOpen={setOpen} team={modalTeam} onClick={modalOnclick} input={modalInput}/>
        <Grid item xs={8}><Container sx={{width: '100%'}}>
          {
            teams.map((team, idx) => (
              <TeamCard 
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

export default Team