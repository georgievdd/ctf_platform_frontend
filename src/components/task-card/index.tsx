import React from 'react'
import { ITask } from '../../interfaces/task'
import { Paper, Typography, Grid, Divider, Box, colors } from '@mui/material'

const divider: React.CSSProperties = {
  borderRight: '1px solid black',
}

const TaskCard = ({data}: {data: ITask}) => {
  return (
    <Paper sx={{mb: 2, padding: '10px'}}>
      <Grid display='flex' container>
        <Grid sx={divider} item xs={1} display='flex' alignItems='center' textAlign='center'><Typography>{data.id}</Typography></Grid>
        <Grid item xs={9} sx={divider}><Box>
          <Typography variant='h3'>{data.title}</Typography>
          <Typography>{data.description}</Typography>
        </Box></Grid>
        <Grid item xs={2} display='flex' alignItems='center' textAlign='center'><Typography color={colors.red[600]}>{data.complexity}</Typography></Grid>
      </Grid>
    </Paper>
  )
}

export default TaskCard