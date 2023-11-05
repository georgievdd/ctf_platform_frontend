
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

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
}

const PUBLIC = '/public';
const ADMIN = '/admin';
export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PUBLIC: {
    HOME: PUBLIC,
    TEAM: PUBLIC + '/team',
    USER: PUBLIC + '/user',
    CHALLENGE: PUBLIC + '/challenge',
    EVENT: PUBLIC + '/event',
  },
  ADMIN: {
    HOME: ADMIN,
    TEAM: ADMIN + '/team',
    USER: ADMIN + '/user',
    CHALLENGE: ADMIN + '/challenge',
    EVENT: ADMIN + '/event',
  }
}