
export interface IUserState {
  PUBLIC: string,
  AUTH: string,
  ADMIN: string,
}

export const USER_STATE: IUserState = {
  PUBLIC: 'public',
  AUTH: 'authorization',
  ADMIN: 'admin',
};

export const MODE_STATE = {
  LIGHT: 'light',
  DARK: 'dark',
}