import endpoints from "../endpoints";
import { instance } from "../instance";
import type { IUser, IUserCreateRequest, IUserEditRequest, IUserLoginRequest, IUserLoginResponse, IUserRegistrationRequest, IUserRegistrationResponse, IUsersResponse } from "../../interfaces/user";

export const getAll = (): Promise<IUsersResponse> =>
  instance.get(endpoints.USER.ALL)

export const getOne = (id: string): Promise<IUser> =>
  instance.get(`${endpoints.USER.USER}/${id}`);

export const edit = (data: IUserEditRequest): Promise<IUser> =>
  instance.put(`${endpoints.USER.USER}/${data.id}`, data);

export const create = (data: IUserCreateRequest): Promise<IUser> =>
  instance.post(`endpoints.USER.USER`, data);

export const deleteOne = (id: string): Promise<void> =>
  instance.delete(`${endpoints.USER.USER}/${id}`);


export const login = (data: IUserLoginRequest) => 
  instance.post<IUserLoginResponse>(endpoints.AUTH.LOGIN, data);

export const registration = (data: IUserRegistrationRequest) => 
  instance.post<IUserRegistrationResponse>(endpoints.AUTH.REGISTRATION, data);

export const checkAuth = () =>
  instance.get<Boolean>(endpoints.AUTH.CHECK);

export const getProfile = () => 
  instance.get<IUser>(endpoints.USER.PROFILE);