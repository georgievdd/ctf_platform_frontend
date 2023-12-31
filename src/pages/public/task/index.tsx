import React from 'react';
import { useDataApi } from '../../../api/hook';
import { ITask, ITaskRequest } from '../../../interfaces/task';
import api from '../../../api';
import { taskRaw, tasksRaw } from '../../../api/task';
import {
  Grid,
  Container,
  Skeleton,
  Pagination,
  Typography,
} from '@mui/material';
import SearchInput from '../../../components/search-input';
import TaskCard from '../../../components/task-card';
import Space from '../../../components/space';
import { useInput } from '../../../hooks';

//! тип фотки от complexity

const TASK = () => {

  const tasks = useDataApi<ITaskRequest, ITask[]>(tasksRaw, api.task.getAll);
  const input = useInput('');

  return (
    <div>
      {/* <Typography sx={{textAlign: 'center', marginBottom: 5}} variant='h5'>Задания прошедших соревнований, доступные для тренировок</Typography> */}
      <Grid container>
        <Grid item xs={8}><Container sx={{width: '100%'}}>
            {tasks.isLoading 
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
            :tasks.data.map((team, idx) => (
            <TaskCard
              key={team.title + idx}
              data={team}
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

export default TASK