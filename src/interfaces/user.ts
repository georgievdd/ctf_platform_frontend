export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  admin: boolean;
  team: null | string;
  bio: null | string;
}

export interface IUsersResponse {
  data: {
    content: IUser[];
    totalPages: number;
    page: number;
    size: number;
  }
}

export interface IUserEditRequest {
  id: string;
  name: string;
}

export interface IUserCreateRequest {
  name: string;
  team: null | string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserRegistrationRequest {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  accessJwt: string;
}
export interface IUserRegistrationResponse extends IUser {
  accessJwt: string;
}