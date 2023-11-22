import { IUser } from "./user";

export interface ITeamBody {
  rating: number;
  title: string;
  members: string[];
  info: string;
  contacts: string;
  captainId: string;
  preview: string;
  code?: string;
}

export interface ITeam extends ITeamBody {
  id: string;
}

export interface ITeamsRequest {
  limit?: number;
}

export interface ITeamCreateRequest {
  title: string
  info: string
  contacts: string
  preview: string
}

export interface ITeamDeleteMemberRequest {
  userId: string
  teamId: string
}

export interface ITeamAddMemberRequest {
  userId: string
  teamId: string
}

export interface ITeamSendInviteRequest {
  code: string
  teamId: string
}