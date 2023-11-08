import React, { ReactEventHandler, ReactNode, useState } from 'react'
import { GridCellParams, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid/models';
import { ITeam, ITeamBody } from '../../../interfaces/team';
import { useDataGrid } from '../../../components/data-grid/useDataGrid';
import { IFieldInit, useAddData } from '../../../components/data-grid/useAddData';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DataGrid from '../../../components/data-grid';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import { IUser } from '../../../interfaces/user';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddModal from '../../../components/data-grid/addModal';

const AdminTeamPage = () => {

  const [data, setData] = useState<ITeam[]>([
    {
      id: '1',
      name: "Чупапиксы",
      members: [
        {
          id: '12312312',
          team: [1, 3, 12],
          name: 'Denis',
          surname: 'Frilov',
          admin: false,
          email: '12312312@example.com',
          rating: 1
        },
        {
          id: '213',
          team: [1, 6, 35, 12],
          name: 'ferd',
          surname: 'grevr',
          admin: false,
          email: 'wgrrgf@example.com',
          rating: 14
        },
        {
          id: '2wef13',
          team: [1, 6, 12],
          name: 'ferd',
          surname: 'grevr',
          admin: false,
          email: 'wgrrgf@example.com',
          rating: 14
        }
      ],
      rating: '4.4',
      info: 'НИЯУ МИФИ ИИКС ЭП',
      contacts: '8 800 555 35 35',
      preview: 'default',
      captain: {
        id: '12312312',
        team: [12, 6, 3, 12],
        name: 'Denis',
        surname: 'Frilov',
        admin: false,
        email: '12312312@example.com',
        rating: 10
      }
    }
  ]);

  ///
  const [id, setId] = useState(100);
  ///
  const dataState = useDataGrid<ITeam>(data, columns);
  const addObject = useAddData(addFields);
  const add = () => {
    setData(prev => (
      [...prev, {
        id: id.toString(),
        ...addObject.dto() as ITeamBody,
      }]
    ))
    addObject.setInit();
    setId(id + 1);
  }
  const onDelete = (ids: string[]) => {
    setData(prev => prev.filter(e => !ids.includes(e.id)));
  }
  const saveChanges = () => {
    console.log(dataState.changedRowsIds);
  }


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
    field: 'name',
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
    field: 'captain',
    headerName: 'Капитан',
    type: 'string',
    // editable: true,
    //description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    renderCell: (params: GridCellParams) => {
      const {captain}: ITeam = params.row;
      return (
        <div>
          <Link to='#' style={ls}>{captain.id}</Link> {captain.name} {captain.surname}
        </div>
      );
    },
    width: 300
    // flex: 1,
  },
  {
    field: 'members',
    headerName: 'Участники',
    type: 'string',
    // editable: true,
    //description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    renderCell: RenderMembersCell,
    width: 300
    // flex: 1,
  },
];
const addFields: IFieldInit[] = [
  {
    field: 'name',
    name: 'Название',
    type: 'text',
    defaultValue: '',
  },
  {
    field: 'rating',
    name: 'Рейтинг',
    type: 'number',
    defaultValue: 0,
  },
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
  {
    field: 'captain',
    name: 'Капитан',
    type: 'text',
    defaultValue: '',
  },
];

function RenderMembersCell(params: GridCellParams) {
  const {members}: ITeam = params.row;
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
        <AddModal open={showAdd} setOpen={setShowAdd} onSubmit={() => {}} addObject={addObject}/>
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
          members.map((e) => (
            <Grid key={e.id} container gap={1} borderBottom='1px solid gray'>
              <div style={{marginTop: '5px'}} key={e.name}><Link style={ls} to='#'>{e.id}</Link> {e.name} {e.surname} </div>
              <IconButton sx={{width: '20px', margin: 0, padding: 0}} onClick={(_e) => memberDeleteOnClick(_e, e)}>
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

const memberDeleteOnClick = (e: React.FormEvent<HTMLButtonElement>, data: IUser) => {
  e.stopPropagation();
}
const memberAddOnClick = (e: React.FormEvent<HTMLButtonElement>, setShowAdd: (v: boolean) => void) => {
  e.stopPropagation();
  setShowAdd(true);
}