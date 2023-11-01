
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

export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  HOME: '/',
  TEAM: '/team',
  USER: '/user',
  CHALLENGE: '/challenge',
  EVENT: '/event',
}