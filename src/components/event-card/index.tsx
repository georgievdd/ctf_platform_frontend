import React from 'react'
import { IEvent } from '../../interfaces/event'
import { Grid, Paper, Typography, Button } from '@mui/material'
import { useTheme, Theme } from '@mui/material/styles';

const divider = (theme: Theme) => ({
  borderRight: `1px solid ${theme.palette.text.primary}`,
});


const EventCard = ({data}: {data: IEvent}) => {

  const theme = useTheme();

  return (
    <div>
      <Paper sx={{p: 2, mb: 2}}>
        <Grid display='flex' container>
          <Grid item xs={4} sx={{...divider(theme), p: 1}}>
            <Typography variant='h6' sx={{fontSize: 20}}>{data.title}</Typography>
            <Typography variant='h6' style={textStyle}>{data.description}</Typography>
          </Grid>
          <Grid item xs={1.5} sx={{...divider(theme), p: 1}} textAlign='center'>
            <Typography variant='h6'>Начало</Typography>
            <Typography variant='h6' color={theme.palette.info.light}>{data.startTime.split('T')[0].replaceAll('-', '.')}</Typography>
            <Typography variant='h6' color={theme.palette.info.light}>{data.startTime.split('T')[1].split('.')[0]}</Typography>
          </Grid>
          <Grid item xs={2} sx={{...divider(theme), p: 1}} textAlign='center'>
            <Typography variant='h6'>Длительность</Typography>
            <Typography variant='h6' color={theme.palette.info.light}>{getTimeDif(data.startTime, data.endTime)}</Typography>
          </Grid>
          <Grid item xs={1.5} sx={{...divider(theme), p: 1}} display='flex' justifyContent='center' alignItems='center'>
            <Typography variant='h6'>
              <Typography color={theme.palette.error.dark} variant='h6' display='inline-block'>{data.tasks.length}</Typography> задач{getConjugation(data.tasks.length)}
            </Typography>
          </Grid>
          <Grid item xs={3} display='flex' justifyContent='center' alignItems='center'>
            <div>
              <Button variant='contained' color='success'>
                Зарегистрироваться
              </Button>
              <Typography textAlign='center' color={theme.palette.warning.light}>
                x{Math.round(Math.random() * 100)}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default EventCard

const getTimeDif = (begin: string, end: string) => {
  const a = new Date(end) as any
  const b = new Date(begin) as any
  const dif = (new Date(end) as any) - (new Date(begin) as any);
  const hours = dif /  3600000;
  const minutes = (dif - 3600000 * hours) / 60000;
  const seconds = (dif - 3600000 * hours - 60000 * minutes) / 1000;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const textStyle: React.CSSProperties = {
  // whiteSpace: 'nowrap',
  padding: 0,
  margin: 0,
  WebkitLineClamp: 2,
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: 'gray',
  WebkitBoxOrient: 'vertical',
  lineHeight: '100%',
}

const getConjugation = (n: number) => n === 1 ? 'а' : (n == 4 || n == 5 ? 'и' : 'ч')