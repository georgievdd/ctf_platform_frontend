import React from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../../api';
import { taskRaw } from '../../../../api/task';
import { ITask } from '../../../../interfaces/task';
import { useDataApi } from '../../../../api/hook';
import { Button, Grid, Input, Paper, Typography, useTheme } from '@mui/material';
import { useTheme as useThemeColors } from '../../../../theme';
import { Spacer } from '@nextui-org/react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const TaskId = () => {
  const {id} = useParams() as {id: string};
  const task = useDataApi<string, ITask>(taskRaw, api.task.getOne);
  const {colors} = useThemeColors();
  const theme = useTheme();
  return (
    <div>
      <Paper sx={{padding: 5}}>
        <Typography variant='h2'>{task.data.title} <span style={{color: colors.highligh}}>{task.data.complexity}</span></Typography>
        <Spacer/>
        <Typography variant='h4'>{task.data.description}</Typography>
        <Spacer/>
        <Grid display='flex'>
          <Button variant='contained'>
            <Typography>{task.data.body}</Typography>
            <FileDownloadIcon/>
          </Button>
        </Grid>
        <Spacer/>
        <Grid container display='flex' justifyContent='center'>
          <Grid item spacing={5} display='flex' xs={6}>
            <Input
              placeholder='Ваш ответ'
              type='text'
              required
              style={{width: "100%", marginRight: '10px'}}
            />
            <Button variant='contained' color={theme.palette.mode === 'dark' ? 'success' : 'secondary'}>
              Проверить
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default TaskId