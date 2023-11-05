import { useEffect, useState } from 'react'
import { IUser, IUserBody } from '../../../interfaces/user'
import User from '../../../services/user';
import { useDataGrid } from '../../../components/data-grid/useDataGrid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { GridColDef } from '@mui/x-data-grid';
import DataGrid from '../../../components/data-grid';
import { IFieldInit, useAddData } from '../../../components/data-grid/useAddData';

const AdminUserPage = () => {

  const [users, setUsers] = useState<IUser[]>([
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
  const dataState = useDataGrid<IUser>(users, columns);
  const addObject = useAddData(addData);
  const addUser = () => {
    setUsers(prev => (
      [...prev, {
        id: id.toString(),
        ...addObject.dto() as IUserBody,
      }]
    ))
    addObject.setInit();
    setId(id + 1);
  }
  const onDelete = (ids: string[]) => {
    setUsers(prev => prev.filter(user => !ids.includes(user.id)));
  }
  const saveChanges = () => {
    console.log(dataState.changedRowsIds);
  }

  useEffect(() => {
    (async() => {
      setUsers(await User.getAll());
    })()
  }, []);

  return (
    <div>
      <DataGrid 
        state={dataState}
        AddIcon={PersonAddIcon}
        addObject={addObject}
        addOnclick={addUser}
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
    flex: 1, 
    // sortable: false,
  },
  {
    field: 'name',
    headerName: 'First name',
    type: 'string',
    editable: true,
    flex: 1,
    // sortable: false,
  },
  {
    field: 'surname',
    headerName: 'Last name',
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
const addData: IFieldInit[] = [
  {
    field: 'name',
    name: 'Имя',
    type: 'text',
    defaultValue: '',
  },
  {
    field: 'surname',
    name: 'Фамилия',
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
    field: 'email',
    name: 'Email',
    type: 'email',
    defaultValue: '',
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