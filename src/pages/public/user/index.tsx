import React, { useEffect, useState } from 'react';
import {
  Grid,
  Pagination
} from '@mui/material';
import { IUser, IUsersRequest } from '../../../interfaces/user';
import SearchInput from '../../../components/search-input';
import { useInput } from '../../../hooks';
import UserCards from '../../../components/user-cards';
import { IMethod, useDataApi } from '../../../api/hook';
import api from '../../../api';

const UserPage = () => {

  const users = useDataApi<IUsersRequest, IUser[]>([], api.user.getAll);
  const input = useInput('');

  useEffect(() => {
    users.fetchData();
  }, []);
  
  return (
    <div>
      <Grid container>
        <Grid item xs={8}>
          <UserCards users={users.data} pagination={(
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