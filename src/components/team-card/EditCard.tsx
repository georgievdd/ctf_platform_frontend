import { Tooltip, Box, Container, Grid, Paper, Typography, Button, Stack, useMediaQuery, IconButton } from "@mui/material";
import { ITeam } from "../../interfaces/team";
import { useTheme as useThemeColor } from "../../theme";
import { IUseEditTeam, useEditTeam } from "./useEdit";
import { useTheme } from "@mui/material";
import Carousel from "@dplewis/react-material-ui-5-carousel";
import { ReactComponent as Logo1 } from '../../res/img/team/logo1.svg';
import { ReactComponent as Logo2 } from '../../res/img/team/logo2.svg';
import { useEffect, useState } from "react";

const logosRow = [
  ['logo2', <Logo2 style={{width: '150px', height: 'auto'}}/>],
  ['logo1', <Logo1 style={{width: '150px', height: 'auto'}}/>], 
];

const EditTeamCard = ({dataObject, editOnCLick} : {
  dataObject: IUseEditTeam,
  editOnCLick?: () => void,
}) => {
  const [logos, setLogos] = useState(logosRow);
  useEffect(() => {
    if (logos[0][0] !== dataObject.preview.value) {
      setLogos(logos => [logos[1], logos[0]]);
    }
  }, [dataObject.value?.id]);
  const matches = useMediaQuery('(min-width:1180px)');
  const { colors } = useThemeColor();
  const theme = useTheme();
  const text = {
    fontSize: '20px',
    fontWeight: '600',
    color: theme.palette.text.primary,
    marginRight: '1ch',
  }
  const descript = {
    color: colors.gray.DEFAULT,
    fontSize: '16px',
  };
  const highlight = {
    color: colors.highligh,
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: [
      'Montserrat', 
      'sans-serif',
    ].join(','),
    padding: 0,
    margin: 0,
    color: theme.palette.text.primary,
  };
  return (
    <div style={{marginBottom: '15px', position: 'relative'}}>
      <Paper sx={{
        padding: '15px',
        borderRadius: "10px",
      }} elevation={6}>
        <Grid container>
          <Carousel autoPlay={false} indicators={false} onChange={(index: number) => dataObject.preview.updateValue(logos[index][0] as string)}>
            {logos.map((item, i) => (
              <div>
                {item[1]}
              </div>
            ))}
          </Carousel>
          <Grid item xs={matches ? 8 : 12}><Box>
            <Typography style={{...text, ...descript, display: 'inline-block'}}>Команда:</Typography>
            <input {...dataObject.title} style={{...inputStyle, width: `${calculateWidth(dataObject.title.value.length)}ch`}}/>
            <div/>
            <Typography style={{...text, ...descript, display: 'inline-block'}}>Из:</Typography>
            <input {...dataObject.info} style={{...inputStyle, width: `${calculateWidth(dataObject.info.value.length)}ch`}}/>
            <Typography style={text}><span style={descript}>Рейтинг:</span> <span style={highlight}>{dataObject.value!!.rating}</span></Typography>
            <Typography style={text}><span style={descript}>Количество человек в команде:</span> {dataObject.value!!.members.length}</Typography>
            <Typography style={{...text, ...descript, display: 'inline-block'}}>Контакты:</Typography>
            <input {...dataObject.contacts} style={{...inputStyle, width: `${calculateWidth(dataObject.contacts.value.length)}ch`}}/>
          </Box></Grid>
        </Grid>
        <Box sx={{position: 'absolute', bottom: 0, right: 0}}>
          <Button size='small' variant="contained" color="success" onClick={editOnCLick}>
            Сохранить
          </Button>
        </Box>
      </Paper>
    </div>
  );
};
const calculateWidth = (width: number) => Math.round(((width) * (145/153))) + 1;

export default EditTeamCard;