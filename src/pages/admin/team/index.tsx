import React, { ReactEventHandler, ReactNode, useEffect, useState } from 'react'
import { GridCellParams, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid/models';
import { ITeam, ITeamAddMemberRequest, ITeamBody, ITeamCreateRequest, ITeamDeleteMemberRequest, ITeamsRequest } from '../../../interfaces/team';
import { useDataGrid } from '../../../components/data-grid/useDataGrid';
import { IFieldInit, useAddData } from '../../../components/data-grid/useAddData';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DataGrid from '../../../components/data-grid';
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddModal from '../../../components/data-grid/addModal';
import api from '../../../api';
import { useApi, useDataApi } from '../../../api/hook';
import { IUser } from '../../../interfaces/user';

const AdminTeamPage = () => {

  const teams = useDataApi<ITeamsRequest, ITeam[]>([], api.team.getAll);
  const createTeam = useApi<ITeamCreateRequest, ITeam>(api.team.create);
  const deleteTeam = useApi<string, void>(api.team.deleteTeam);

  const dataState = useDataGrid<ITeam>(teams.data, columns);
  const addObject = useAddData(addFields);
  
  const add = () => {
    createTeam.fetchData(addObject.dto() as ITeamCreateRequest)
  }
  const onDelete = async (ids: string[]) => {
    // setData(prev => prev.filter(e => !ids.includes(e.id)));
    await Promise.all(ids.map(id => deleteTeam.fetchData(id)));
    teams.fetchData();
  }
  const saveChanges = () => {
    // console.log(dataState.changedRowsIds);
  }

  useEffect(() => {
    teams.fetchData();
  }, [])


  return (
    <div>
      <DataGrid 
        state={dataState}
        AddIcon={GroupAddIcon}
        addObject={addObject}
        addOnclick={add}
        onDelete={onDelete}
        saveChanges={saveChanges}
        cellList
      />
    </div>
  )
}

export default AdminTeamPage;

const ls: React.CSSProperties = {
  color: '#3B8AB5',
  textDecoration: 'none',
}

const columns: GridColDef[] = [
  { 
    field: 'id', 
    headerName: 'ID',
    type: 'string',
    // flex: 1, 
    width: 20,
    // sortable: false,
  },
  {
    field: 'title',
    headerName: 'Название команды',
    type: 'string',
    editable: true,
    flex: 1,
    // sortable: false,
  },
  {
    field: 'rating',
    headerName: 'Рейтинг',
    type: 'number',
    // editable: true,
    flex: 1,
    // sortable: false,
  },
  {
    field: 'info',
    headerName: 'Дополнительная информация',
    type: 'string',
    editable: true,
    flex: 1,
    // sortable: false,
  },
  {
    field: 'contacts',
    headerName: 'Контакты',
    type: 'string',
    editable: true,
    flex: 1,
    // sortable: false,
  },
  {
    field: 'preview',
    headerName: 'Тип привьюшки',
    type: 'string',
    editable: true,
    flex: 1,
    // sortable: false,
  },
  {
    field: 'captainId',
    headerName: 'Капитан',
    type: 'string',
    // editable: true,
    //description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    renderCell: (params: GridCellParams) => {
      const {captainId}: ITeam = params.row;
      return (
        <div>
          <Link to='#' style={ls} onClick={e => e.stopPropagation()}>{captainId}</Link>
        </div>
      );
    },
    // width: 300
    flex: 1,
  },
  {
    field: 'members',
    headerName: 'Участники',
    type: 'string',
    // editable: true,
    //description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    renderCell: RenderMembersCell,
    // width: 300
    flex: 1,
  },
];
const addFields: IFieldInit[] = [
  {
    field: 'title',
    name: 'Название',
    type: 'text',
    defaultValue: '',
  },
  // {
  //   field: 'rating',
  //   name: 'Рейтинг',
  //   type: 'number',
  //   defaultValue: 0,
  // },
  {
    field: 'info',
    name: 'Дополнительная информация',
    type: 'text',
    defaultValue: '',
  },
  {
    field: 'contacts',
    name: 'Контакты',
    type: 'text',
    defaultValue: '',
  },
  {
    field: 'preview',
    name: 'привьюшка',
    type: 'text',
    defaultValue: 'default',
  },
  // {
  //   field: 'captain',
  //   name: 'Капитан',
  //   type: 'text',
  //   defaultValue: '',
  // },
];

function RenderMembersCell(params: GridCellParams) {
  const {members, id}: ITeam = params.row;
  const [showAdd, setShowAdd] = useState(false);
  const addObject = useAddData([{
    name: 'ID',
    type: 'text',
    field: 'id',
    defaultValue: '',
    required: true,
  }]);

  const deleteUserFromTeam = useApi<ITeamDeleteMemberRequest, IUser>(api.team.deleteUserFromTeam);
  const addUserToTeam = useApi<ITeamAddMemberRequest, IUser>(api.team.addUserToTeam);

  return (
    <Stack sx={{mb: 2}}>
      <>
        <AddModal open={showAdd} setOpen={setShowAdd} onSubmit={
          () => addUserToTeam.fetchData({userId: addObject.dto().id as string, teamId: id})
          .then((data) => data && window.location.reload())
        } addObject={addObject}/>
      </>
      <div>
        <IconButton sx={{width: '20px', margin: 0, padding: 0}} onClick={e => memberAddOnClick(e, setShowAdd)}>
          <PersonAddIcon style={{
            cursor: 'pointer'
          }} color='secondary' sx={{width: '20px'}}/>
        </IconButton>
      </div>
      <div>
        {
          members.map((e, idx) => (
            <Grid key={e + idx} container gap={1} borderBottom='1px solid gray'>
              {/* <div style={{marginTop: '5px'}} key={e.name}><Link style={ls} to='#'>{e.id}</Link> {e.name} {e.surname} </div> */}
              <Typography>{e}</Typography>
              <IconButton sx={{width: '20px', margin: 0, padding: 0}} onClick={(_e) => {
                _e.stopPropagation();
                deleteUserFromTeam.fetchData({userId: e, teamId: id});
              }}>
                <DeleteOutlineIcon style={{
                  cursor: 'pointer'
                }} color='error' sx={{width: '20px'}}/>
              </IconButton>
            </Grid>
          ))
        }
      </div>
    </Stack>
  );
}

const memberAddOnClick = (e: React.FormEvent<HTMLButtonElement>, setShowAdd: (v: boolean) => void) => {
  e.stopPropagation();
  setShowAdd(true);
}