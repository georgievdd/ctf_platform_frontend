import { Box, Card, Container, Grid, Paper, Typography, Button, Stack, useMediaQuery } from "@mui/material";
import { ITeam } from "../../interfaces/team";
import { useTheme } from "../../theme";
import Space from "../space";
import './style.css'
import { useEffect } from "react";

const TeamCard = ({data, onClick} : {
  data: ITeam,
  onClick: any,
}) => {

  const matches = useMediaQuery('(min-width:1180px)');

  const { colors } = useTheme();
  const text = {
    fontSize: '20px',
    fontWeight: '600',
    color: colors.secondary[50]
  }
  const descript = { 
    color: '#6E7F80',
    fontSize: '16px',
  };
  const highlight = {
    color: colors.highligh,
  }
  return (
    <div style={{marginBottom: '15px'}}>
      <Paper sx={{
        padding: '15px',
        borderRadius: "10px",
        backgroundColor: colors.primary[200]
      }} elevation={6}>
        <Grid container>
          <Grid item xs={matches ? 3 : 12}><img
            src='https://ctftime.org/media/events/hackit_ctf_ctftime.png'
            className='teame-img'
          /></Grid>
          <Grid item xs={matches ? 6 : 12}><Box>
            <Typography style={text}><span style={descript}>Команда:</span> {data.title}</Typography>
            <Typography style={text}><span style={descript}>Из:</span> {data.info}</Typography>
            <Typography style={text}><span style={descript}>Рейтинг:</span> <span style={highlight}>{data.rating}</span></Typography>
            <Typography style={text}><span style={descript}>Количество человек в команде:</span> {data.members.length}</Typography>
            <Typography style={text}><span style={descript}>Контакты:</span> {data.contacts}</Typography>
          </Box></Grid>
          <Grid item xs={matches ? 3 : 12}>
            <Stack height='100%'>
              <Space h={'100%'}/>
              <Space h={'100%'}/>
              <Button variant="contained" onClick={e => {
                e.preventDefault();
                onClick(data);
              }}>Вступить</Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default TeamCard;