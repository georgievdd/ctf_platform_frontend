import React from 'react'
import { ITask } from '../../interfaces/task'
import { Paper, Typography, Grid, Divider, Box, colors } from '@mui/material'
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../consts';

const divider: React.CSSProperties = {
  borderRight: '1px solid black',
}

const TaskCard = ({data}: {data: ITask}) => {
  const navigate = useNavigate();
  return (
    <Paper sx={{mb: 2, padding: '10px'}}>
      <Grid display='flex' container>
        <Grid sx={divider} item xs={1} display='flex' alignItems='center' justifyContent='center'><Typography>{data.id}</Typography></Grid>
        <Grid item xs={9} sx={divider} paddingLeft={1} paddingRight={1}><Box>
          <Grid display='flex' justifyContent='space-between'>
            <div>
              <Typography variant='h4' sx={{cursor: 'pointer'}} onClick={() => navigate(`${PATH.PUBLIC.TASK}/${data.id}`)}>{data.title}</Typography>
              <Typography>{data.description}</Typography>
            </div>
            <Grid display='flex' justifyContent='space-between' alignItems='center'>
              <BeenhereIcon color='success'/>
              <Typography>x{Math.round(Math.random()*1000)}</Typography>
            </Grid>
          </Grid>
        </Box></Grid>
        <Grid item xs={2} display='flex' alignItems='center' justifyContent='center'><Typography sx={{fontWeight: 600}} color={colors.red[600]}>{data.complexity}</Typography></Grid>
      </Grid>
    </Paper>
  )
}

export default TaskCard