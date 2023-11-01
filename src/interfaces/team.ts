import { IUser } from "./user";

export interface ITeam {
  id: string;
  rating: string;
  name: string;
  members: IUser[];
  info: string;
  contacts: string;
  captain: IUser;
  preview: string;
};