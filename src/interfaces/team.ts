import { IUser } from "./user";

export interface ITeamBody {
  rating: number;
  title: string;
  members: string[];
  info: string;
  contacts: string;
  captainId: string;
  preview: string;
}

export interface ITeam extends ITeamBody {
  id: string;
};

export interface ITeamsResponse {
  data: ITeam[]
}

export interface ITeamCreateRequest {
  title: string
  info: string
  contacts: string
  preview: string
}

export interface ITeamAddMemberRequest {
  code: string
}