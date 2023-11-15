const user = '/user'
const team = '/team'

const TEAM = {
  TEAM: team,
  ALL: team + '/all',
  CREATE: team + '/new',
  DELETE_USER: (userId: string, teamId: string) =>  `${team}/delete/user/${userId}/team/${teamId}`,
  ADD_USER: (userId: string, teamId: string) => `/team/add/user/${userId}/team/${teamId}`,
  INVITE_CODE: team + '/add',
}

const AUTH = {
  LOGIN: '/public/auth/login',
  REGISTRATION: '/public/auth/registration',
  CHECK: '/checkOut',
}

const USER = {
  USER: user,
  ALL: user + '/all',
  PROFILE: user + '/me'
};

export default {
  USER,
  AUTH,
  TEAM,
};