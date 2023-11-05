import endpoints from "../endpoints";
import { instance } from "../instance";
import type { IUser, IUserCreateRequest, IUserEditRequest, IUserLoginRequest, IUserLoginResponse, IUserRegistrationRequest, IUserRegistrationResponse, IUsersResponse } from "../../interfaces/user";

export const getAll = (): Promise<IUsersResponse> =>
  // instance.get(endpoints.USER.USER)
  (async() => usersRaw)()

export const getOne = (id: string): Promise<IUser> =>
  instance.get(`${endpoints.USER.USER}/${id}`);

export const edit = (data: IUserEditRequest): Promise<IUser> =>
  instance.put(`${endpoints.USER.USER}/${data.id}`, data);

export const create = (data: IUserCreateRequest): Promise<IUser> =>
  instance.post(`endpoints.USER.USER`, data);

export const deleteOne = (id: string): Promise<void> =>
  instance.delete(`${endpoints.USER.USER}/${id}`);


export const login = (data: IUserLoginRequest) => 
  instance.post<IUserLoginResponse>(endpoints.USER.LOGIN, data);

export const registration = (data: IUserRegistrationRequest) => 
  instance.post<IUserRegistrationResponse>(endpoints.USER.REGISTRATION, data);


export const userRaw: IUser = {
  id: '12312312',
  team: [2, 6, 8, 2],
  name: 'Denis',
  surname: 'Frilov',
  admin: true,
  email: '12312312@example.com',
  rating: 10
}


export const usersRaw = {
  data: {
    content: [
      {
        id: '1',
        team: [2, 6, 8, 2],
        name: 'Mihail',
        surname: 'Frilov',
        admin: false,
        email: '12312312@example.com',
        rating: 1
      },
      {
        id: '2',
        team: [2, 6, 8, 2],
        name: 'Den',
        surname: 'Frilov',
        admin: true,
        email: '1231312@exale.om',
        rating: 2345
      },
      {
        id: '3',
        team: [2, 6, 8, 2],
        name: 'Dima',
        surname: 'Frilov',
        admin: false,
        email: '12@example.com',
        rating: 15
      },
      {
        id: '4',
        team: [2, 6, 8, 2],
        name: 'Mihail',
        surname: 'Frilov',
        admin: true,
        email: '123312@ample.om',
        rating: 54
      },
    ],
    totalPages: 1234,
    page: 23423,
    size: 12312,
  }
}