
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
  AUTH: {
    LOGIN: '/login',
    REGISTRATION: '/registration',
  },
  PUBLIC: {
    ME: PUBLIC + '/me',
    HOME: PUBLIC,
    TEAM: PUBLIC + '/team',
    USER: PUBLIC + '/user',
    EVENT: PUBLIC + '/event',
    TASK: PUBLIC + '/task',
  },
  ADMIN: {
    HOME: ADMIN,
    TEAM: ADMIN + '/team',
    USER: ADMIN + '/user',
    EVENT: ADMIN + '/event',
    TASK: ADMIN + '/task',
  }
}