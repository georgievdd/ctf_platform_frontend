import { useEffect, useState } from 'react'
import { IUser, IUserBody } from '../../../interfaces/user'
import User from '../../../services/user';
import { useDataGrid } from '../../../components/data-grid/useDataGrid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { GridColDef } from '@mui/x-data-grid';
import DataGrid from '../../../components/data-grid';
import { IFieldInit, useAddData } from '../../../components/data-grid/useAddData';

const AdminUserPage = () => {

  const [data, setData] = useState<IUser[]>([
    {
      id: '123',
      team: [2, 6, 8, 2],
      name: 'Dima',
      surname: 'Frilov',
      admin: false,
      email: '12@example.com',
      rating: 15
    },
  ]);

  ///
  const [id, setId] = useState(100);
  ///
  const dataState = useDataGrid<IUser>(data, columns);
  const addObject = useAddData(addFields);
  const add = () => {
    setData(prev => (
      [...prev, {
        id: id.toString(),
        ...addObject.dto() as IUserBody,
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

  useEffect(() => {
    (async() => {
      setData(await User.getAll());
    })()
  }, []);

  return (
    <div>
      <DataGrid 
        state={dataState}
        AddIcon={PersonAddIcon}
        addObject={addObject}
        addOnclick={add}
        onDelete={onDelete}
        saveChanges={saveChanges}
      />
    </div>
  )
}

export default AdminUserPage;


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
    headerName: 'Имя',
    type: 'string',
    editable: true,
    flex: 1,
    // sortable: false,
  },
  {
    field: 'surname',
    headerName: 'Фамилия',
    type: 'string',
    editable: true,
    flex: 1,
    // sortable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'string',
    // editable: true,
    flex: 1,
    // sortable: false,
  },
  {
    field: 'admin',
    headerName: 'Администратор',
    type: 'boolean',
    editable: true,
    //description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    flex: 1,
  },
  {
    field: 'team',
    headerName: 'Команды',
    type: '',
    editable: true,
    //description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    flex: 1,
  },
  {
    field: 'rating',
    headerName: 'Рейтинг',
    type: '',
    //description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    flex: 1,
  },
];
const addFields: IFieldInit[] = [
  {
    field: 'name',
    name: 'Имя',
    type: 'text',
    defaultValue: '',
    required: true,
  },
  {
    field: 'surname',
    name: 'Фамилия',
    type: 'text',
    defaultValue: '',
    required: true,
  },
  {
    field: 'rating',
    name: 'Рейтинг',
    type: 'number',
    defaultValue: 0,
  },
  {
    field: 'email',
    name: 'Email',
    type: 'email',
    defaultValue: '',
    required: true,
  },
  {
    field: 'admin',
    name: 'Администратор',
    type: 'boolean',
    defaultValue: false,
  },
  {
    field: 'team',
    name: 'Команды',
    type: 'text',
    defaultValue: '',
  },
];