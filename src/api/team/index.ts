import endpoints from "../endpoints";
import { instance } from "../instance";
import { ITeam, ITeamSendInviteRequest, ITeamCreateRequest, ITeamDeleteMemberRequest, ITeamAddMemberRequest } from "../../interfaces/team";

export const getAll = () =>
  instance.get<ITeam[]>(endpoints.TEAM.ALL)

export const getMy = () =>
  instance.get<ITeam[]>(endpoints.TEAM.MY)

export const create = (data?: ITeamCreateRequest) =>
  instance.post(endpoints.TEAM.CREATE, data)

export const deleteUserFromTeam = (ids?: ITeamDeleteMemberRequest) =>
  instance.delete(endpoints.TEAM.DELETE_USER(ids?.userId, ids?.teamId))

export const deleteTeam = (id?: string) =>
  instance.delete(endpoints.TEAM.DELETE_TEAM(id))

export const addUserToTeam = (ids?: ITeamAddMemberRequest) =>
  instance.post(endpoints.TEAM.ADD_USER(ids?.userId, ids?.teamId))

export const sendInviteCode = (data?: ITeamSendInviteRequest) =>
  instance.post<void>(endpoints.TEAM.INVITE_CODE, data)