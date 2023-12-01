const user = '/user'
const team = '/team'
const task = '/task'
const event = '/event'

const TEAM = {
  TEAM: team,
  ALL: team + '/all',
  CREATE: team,// + '/new',
  DELETE_USER: (userId?: string, teamId?: string) =>  `/admin/user/${userId}/team/${teamId}`,
  ADD_USER: (userId?: string, teamId?: string) => `/admin/user/${userId}/team/${teamId}`,
  INVITE_CODE: team + '/join',
  MY: team + '/my',
  DELETE_TEAM: (id?: string) => `/admin/team/${id}`,
  EDIT: team,
}

const EVENT = {
  EVENT: event,
  REGISTRATION: (eventId?: string, teamId?: string) => `/ event/${eventId}/registration/${teamId}`,
};

const AUTH = {
  LOGIN: '/public/auth/login',
  REGISTRATION: '/public/auth/registration',
  CHECK: '/checkOut',
};

const USER = {
  USER: user,
  ALL: user + '/all',
  PROFILE: user + '/me',
};

const TASK = {
  TASK: task,
}



const ADMIN = {
  USER: {
    DELETE: (id?: string) => `/admin/user/${id}`,
    UPDATE: (id?: string) => `/admin/user/update/${id}`
  }
}

export default {
  USER,
  AUTH,
  TEAM,
  ADMIN,
  TASK,
  EVENT,
};