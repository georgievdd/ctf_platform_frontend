import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Pagination
} from '@mui/material';
import { IUser } from '../../../interfaces/user';
import Space from '../../../components/space';
import SearchInput from '../../../components/search-input';
import { useInput } from '../../../hooks';
import UserCards from '../../../components/user-cards';
import User from '../../../services/user';

const UserPage = () => {

  const [data, setData] = useState<IUser[]>([]);
  const input = useInput('');

  useEffect(() => {
    (async() => setData(await User.getAll()))()
    // (async() => console.log(await User.getAll()))()
  }, []);
  
  return (
    <div>
      <Grid container>
        <Grid item xs={8}>
          <UserCards users={data} pagination={(
            <Grid display='flex' justifyContent='center'>
              <Pagination count={10} color="secondary" size='large'/>
            </Grid>
          )}/>
        </Grid>
        <Grid item xs={4}><SearchInput {...input} placeholder={'Поглатители циферок'} /></Grid>
      </Grid>
    </div>
  )
}

export default UserPage;