import endpoints from "../endpoints";
import { instance } from "../instance";
import type { IUser, IUserCreateRequest, IUserEditRequest, IUserLoginRequest, IUserLoginResponse, IUserRegistrationRequest, IUserRegistrationResponse, IUsersResponse } from "../../interfaces/user";
import { ITeamAddMemberRequest, ITeamCreateRequest, ITeamsResponse } from "../../interfaces/team";

export const getAll = (): Promise<ITeamsResponse> =>
  instance.get(endpoints.TEAM.ALL)

export const create = (data: ITeamCreateRequest) =>
  instance.post(endpoints.TEAM.CREATE, data)

export const deleteUserFromTeam = (userId: string, teamId: string) =>
  instance.delete(endpoints.TEAM.DELETE_USER(userId, teamId))

export const addUserToTeam = (userId: string, teamId: string) =>
  instance.post(endpoints.TEAM.ADD_USER(userId, teamId))

export const sendInviteCode = (data: ITeamAddMemberRequest) =>
  instance.post(endpoints.TEAM.INVITE_CODE)