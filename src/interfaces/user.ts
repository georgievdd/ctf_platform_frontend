export interface IUserBody {
  name: string;
  surname: string;
  email: string;
  admin: boolean;
  teams: null | string[];
  rating: number;
}


export interface IUser extends IUserBody {
  id: string;
}

export interface IUsersRequest {
  limit?: number;
}



export interface IUserEditRequest {
  id: string;
  surname: string;
  name: string;
  teams: null | string[];
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

export interface ICheckAuthRequest {}

export interface IUserLoginResponse {
  accessJwt: string;
}
export interface IUserRegistrationResponse {
  accessJwt: string;
}