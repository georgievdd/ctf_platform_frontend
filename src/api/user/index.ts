import endpoints from "../endpoints";
import { instance } from "../instance";
import type { IUser, IUserEditRequest, IUsersRequest } from "../../interfaces/user";

export const getAll = (query?: IUsersRequest) =>
  instance.get<IUser[]>(endpoints.USER.ALL, { params: query });

export const getOne = (id?: string) =>
  instance.get<IUser>(`${endpoints.USER.USER}/${id}`);

export const edit = (data?: IUserEditRequest) =>
  instance.put<IUser>(endpoints.ADMIN.USER.UPDATE(data?.id), data);

export const deleteOne = (id?: string) =>
  instance.delete(endpoints.ADMIN.USER.DELETE(id));