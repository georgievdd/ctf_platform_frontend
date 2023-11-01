import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {useTheme} from "../../theme";
import Grid from "@mui/material/Grid";
import {Paper} from "@mui/material";

export default function SearchInput(props: {
    value: any,
    onChange: any,
    placeholder: any,
}) {

    const { colors, theme } = useTheme();

    return (
        <Paper sx={{padding: '10px', backgroundColor: (
            theme.palette.mode === 'dark' ? colors.primary[200] : colors.primary[400])}} elevation={3}>
            <Grid display='flex' justifyContent='left'>
                <SearchIcon />
                <input style={{
                    width: '95%',
                    border: 'none',
                    outline: 'none',
                    marginLeft: '5px',
                    fontSize: '18px',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    color: colors.primary[950]
                }} {...props} type='text'/>
            </Grid>
        </Paper>
    );
}