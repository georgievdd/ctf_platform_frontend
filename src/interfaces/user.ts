export interface IUserBody {
  name: string;
  surname: string;
  email: string;
  admin: boolean;
  team: null | number[];
  rating: number;
}


export interface IUser extends IUserBody {
  id: string;
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
  name: string;
  surname: string;
}

export interface IUserLoginResponse {
  accessJwt: string;
  id: string;
}
export interface IUserRegistrationResponse {
  accessJwt: string;
  id: string;
}