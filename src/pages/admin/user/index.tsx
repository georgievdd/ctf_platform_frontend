import { useEffect, useState } from 'react'
import { IUser, IUserEditRequest, IUserLoginResponse, IUserRegistrationRequest, IUsersRequest } from '../../../interfaces/user'
import { useDataGrid } from '../../../components/data-grid/useDataGrid';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { GridColDef } from '@mui/x-data-grid';
import DataGrid from '../../../components/data-grid';
import { IFieldInit, useAddData } from '../../../components/data-grid/useAddData';
import { useApi, useDataApi } from '../../../api/hook';
import api from '../../../api';

const AdminUserPage = () => {

  const users = useDataApi<IUsersRequest, IUser[]>([], api.user.getAll);
  const createUser = useApi<IUserRegistrationRequest, IUserLoginResponse>(api.auth.registration);
  const deleteUser = useApi<string, void>(api.user.deleteOne);
  const editUser = useApi<IUserEditRequest, IUser>(api.user.edit);
  const dataState = useDataGrid<IUser>(users.data.map(e => ({...e, teams: JSON.stringify(e.teams)})), columns);
  


  const addObject = useAddData(addFields);
  const add = () => {
    createUser.fetchData(addObject.dto())
    .then(() => users.fetchData());
  }
  const onDelete = async (ids: string[]) => {
    await Promise.all(ids.map(id => deleteUser.fetchData(id)));
    users.fetchData();
  }
  const saveChanges = async () => {
    // console.log(dataState.changedRows)
    await Promise.all(dataState.changedRows.map(user => 
      editUser.fetchData({...user, teams: JSON.parse(user.teams)} as IUser)
    )).finally(() => {
      dataState.setChangedRows([]);
      dataState.setChangedRowsId([]);
    })
    users.fetchData();
  }

  useEffect(() => {
    users.fetchData();
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
    field: 'teams',
    headerName: 'Команды',
    type: '',
    editable: true,
    // valueGetter(params) {
    //   return JSON.stringify(params.row.teams)
    // },
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
    field: 'email',
    name: 'Email',
    type: 'email',
    defaultValue: '',
    required: true,
  },
  {
    field: 'password',
    name: 'Пароль',
    type: 'password',
    defaultValue: '',
    required: true,
  },
];