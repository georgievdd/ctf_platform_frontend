import { ICheckAuthRequest, IUser, IUserLoginRequest, IUserLoginResponse, IUserRegistrationRequest, IUserRegistrationResponse } from "../../interfaces/user";
import endpoints from "../endpoints";
import { instance } from "../instance";

export const login = (data?: IUserLoginRequest) => 
  instance.post<IUserLoginResponse>(endpoints.AUTH.LOGIN, data);

export const registration = (data?: IUserRegistrationRequest) => 
  instance.post<IUserRegistrationResponse>(endpoints.AUTH.REGISTRATION, data);

export const checkAuth = (data?: ICheckAuthRequest) =>
  instance.get<boolean>(endpoints.AUTH.CHECK);

export const getProfile = () => 
  instance.get<IUser>(endpoints.USER.PROFILE);