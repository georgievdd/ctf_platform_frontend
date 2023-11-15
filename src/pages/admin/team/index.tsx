import React, { ReactEventHandler, ReactNode, useEffect, useState } from 'react'
import { GridCellParams, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid/models';
import { ITeam, ITeamBody, ITeamCreateRequest } from '../../../interfaces/team';
import { useDataGrid } from '../../../components/data-grid/useDataGrid';
import { IFieldInit, useAddData } from '../../../components/data-grid/useAddData';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DataGrid from '../../../components/data-grid';
import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { IUser } from '../../../interfaces/user';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddModal from '../../../components/data-grid/addModal';
import Team from '../../../services/team';

const AdminTeamPage = () => {

  const [data, setData] = useState<ITeam[]>([])

  const dataState = useDataGrid<ITeam>(data, columns);
  const addObject = useAddData(addFields);
  const add = () => {
    // setData(prev => (
    //   [...prev, {
    //     id: id.toString(),
    //     ...addObject.dto() as ITeamBody,
    //   }]
    // ))
    // addObject.setInit();
    Team.create(addObject.dto() as ITeamCreateRequest)
  }
  const onDelete = (ids: string[]) => {
    setData(prev => prev.filter(e => !ids.includes(e.id)));
  }
  const saveChanges = () => {
    console.log(dataState.changedRowsIds);
  }

  useEffect(() => {
    (async() => {
      setData(await Team.getAll())
    })()
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
  return (
    <Stack sx={{mb: 2}}>
      <>
        <AddModal open={showAdd} setOpen={setShowAdd} onSubmit={() => memberAddOnClickSubmit(addObject.dto().id as string, id)} addObject={addObject}/>
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
              <IconButton sx={{width: '20px', margin: 0, padding: 0}} onClick={(_e) => memberDeleteOnClick(_e, e, id)}>
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

const memberDeleteOnClick = (e: React.FormEvent<HTMLButtonElement>, userId: string, teamId: string) => {
  e.stopPropagation();
  Team.deleteUserFromTeam(userId, teamId);
}
const memberAddOnClick = (e: React.FormEvent<HTMLButtonElement>, setShowAdd: (v: boolean) => void) => {
  e.stopPropagation();
  setShowAdd(true);
}
const memberAddOnClickSubmit = (userId: string, teamId: string) => {
  Team.addUserToTeam(userId, teamId);
}

/*
    {
      id: '1',
      title: "Чупапиксы",
      members: [
        '12312312',
        '12312312',
        '12312312',
        '12312312',
        '12312312',
      ],
      rating: 4.4,
      info: 'НИЯУ МИФИ ИИКС ЭП',
      contacts: '8 800 555 35 35',
      preview: 'default',
      captainId: '12',
    }
*/