import React, { ReactNode, useState } from 'react'
import { GridCellParams, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid/models';
import { ITeam, ITeamBody } from '../../../interfaces/team';
import { useDataGrid } from '../../../components/data-grid/useDataGrid';
import { IFieldInit, useAddData } from '../../../components/data-grid/useAddData';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DataGrid from '../../../components/data-grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IUser } from '../../../interfaces/user';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
    renderCell: (params: GridCellParams) => {
      const {members}: ITeam = params.row;
      return (
        <div>
          {
            members.map((e) => (
              <Grid container gap={1} borderBottom='1px solid gray'>
                <div style={{marginTop: '5px'}} key={e.name}><Link style={ls} to='#'>{e.id}</Link> {e.name} {e.surname} </div>
                <DeleteOutlineIcon style={{
                  cursor: 'pointer'
                }} color='error' sx={{width: '20px'}}/>
              </Grid>
            ))
          }
        </div>
      );
    },
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

function ExpandableCell({ data } : { data: IUser }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Button variant='contained' onClick={toggleExpansion}>
        {expanded ? 'Collapse' : 'Expand'}
      </Button>
      {expanded && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Members List
          </AccordionSummary>
          <AccordionDetails>
            {data.name}
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}