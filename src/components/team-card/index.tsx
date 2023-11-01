import { Box, Card, Container, Grid, Paper, Typography, Button, Stack } from "@mui/material";
import { ITeam } from "../../interfaces/team";
import { useTheme } from "../../theme";
import Space from "../space";


const TeamCard = ({data, onClick} : {
  data: ITeam,
  onClick: any,
}) => {

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
          <Grid item xs={3}><img
            src='https://ctftime.org/media/events/hackit_ctf_ctftime.png'
            style={{
              height: 'auto',
              width: 'auto', 
              maxHeight: '150px',
              borderRadius: '10px',
            }}
          /></Grid>
          <Grid item xs={6}><Box>
            <Typography style={text}><i style={descript}>Команда:</i> {data.name}</Typography>
            <Typography style={text}><i style={descript}>Из:</i> {data.info}</Typography>
            <Typography style={text}><i style={descript}>Рейтинг:</i> <span style={highlight}>{data.rating}</span></Typography>
            <Typography style={text}><i style={descript}>Количество человек в команде:</i> {data.members.length}</Typography>
            <Typography style={text}><i style={descript}>Контакты:</i> {data.contacts}</Typography>
          </Box></Grid>
          <Grid item xs={3}>
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