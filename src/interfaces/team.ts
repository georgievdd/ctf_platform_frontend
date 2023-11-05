import { IUser } from "./user";

export interface ITeamBody {
  rating: string;
  name: string;
  members: IUser[];
  info: string;
  contacts: string;
  captain: IUser;
  preview: string;
}

export interface ITeam extends ITeamBody {
  id: string;
};