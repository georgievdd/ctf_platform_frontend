import { Tooltip, Box, Container, Grid, Paper, Typography, Button, Stack, useMediaQuery, IconButton } from "@mui/material";
import { ITeam } from "../../interfaces/team";
import { useTheme } from "../../theme";
import Space from "../space";
import './style.css'
import {ReactComponent as CaptainMark} from '../../res/marks/captain.svg'
import { addStringBuffer, addTokenToBuffer } from "../../datafunc";
import EditIcon from '@mui/icons-material/Edit';
const Mark = ({code}:{code: string}) => (
  <Tooltip title="По инвайт коду участники будут вступать в вашу команду">
    <Button style={{
      position: 'absolute',
      right: '0',
      margin: 0,
      padding: 0,
      marginRight: '-1px', // какая то дурацкая белая полоска
    }} onClick={() => addStringBuffer(code)}>
      <CaptainMark />
    </Button>
  </Tooltip>
)

const Edit = ({onClick}: any) => (
  <Button style={{
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '50px',
    height: '50px',
    borderRadius: '10px'
  }} onClick={onClick}>
    <EditIcon />
  </Button>
)


const TeamCard = ({data, inviteOnClick, editOnCLick, showCode} : {
  data: ITeam,
  showCode?: boolean,
  editOnCLick?: () => void,
  inviteOnClick?: (data: ITeam) => void,
}) => {
  const matches = useMediaQuery('(min-width:1180px)');
  const { colors, theme } = useTheme();
  const text = {
    fontSize: '20px',
    fontWeight: '600',
    color: theme.palette.text.primary,
  }
  const descript = {
    color: colors.gray.DEFAULT,
    fontSize: '16px',
  };
  const highlight = {
    color: colors.highligh,
  }
  return (
    <div style={{marginBottom: '15px', position: 'relative'}}>
      {showCode && data.code && <Mark code={data.code}/>}
      {editOnCLick && data.code && <Edit onClick={editOnCLick}/>}
      <Paper sx={{
        padding: '15px',
        borderRadius: "10px",
      }} elevation={6}>
        <Grid container>
          <Grid item xs={matches ? (inviteOnClick ? 3 : 4) : 12}><img
            src={require(`../../res/img/team/${data.preview}.svg`)}
            className='teame-img'
          /></Grid>
          <Grid item xs={matches ? (inviteOnClick ? 6 : 8) : 12}><Box>
            <Typography style={text}><span style={descript}>Команда:</span> {data.title}</Typography>
            <Typography style={text}><span style={descript}>Из:</span> {data.info}</Typography>
            <Typography style={text}><span style={descript}>Рейтинг:</span> <span style={highlight}>{data.rating}</span></Typography>
            <Typography style={text}><span style={descript}>Количество человек в команде:</span> {data.members.length}</Typography>
            <Typography style={text}><span style={descript}>Контакты:</span> {data.contacts}</Typography>
          </Box></Grid>
          {inviteOnClick && <Grid item xs={matches ? 3 : 12}>
            <Stack height='100%'>
              <Space h={'100%'}/>
              <Space h={'100%'}/>
              <Button variant="contained" onClick={e => {
                e.preventDefault();
                inviteOnClick(data);
              }}>Вступить</Button>
            </Stack>
          </Grid>}
        </Grid>
      </Paper>
    </div>
  );
};

export default TeamCard;