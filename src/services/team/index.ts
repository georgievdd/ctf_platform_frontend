import api from "../../api";
import { showAlert } from "../../datafunc";
import { ITeam, ITeamAddMemberRequest, ITeamCreateRequest } from "../../interfaces/team";

class Team {

  static async getAll(page?: number, size?: number): Promise<ITeam[]> {
    try {
      const team = await api.team.getAll();
      return team.data;
    } catch(e) {
      console.log(e);
    }
    return [];
  }

  static async create(data: ITeamCreateRequest) {
    try {
      const team = await api.team.create(data)
      .then(() => window.location.reload())
    } catch(e) {
      console.log(e);
    }
    return [];
  }

  static async sendInviteCode(data: ITeamAddMemberRequest) {
    try {
      const team = await api.team.sendInviteCode(data)
      .then(() => window.location.reload())
    } catch(e) {
      console.log(e);
    }
    return [];
  }

  static async deleteUserFromTeam(userId: string, teamId: string) {
    try {
      await api.team.deleteUserFromTeam(userId, teamId)
      .then(() => window.location.reload())
    } catch(e) {
      console.log(e);
    }
    return [];
  }

  static async addUserToTeam(userId: string, teamId: string) {
    try {
      await api.team.addUserToTeam(userId, teamId)
      .then(() => window.location.reload())
    } catch(e) {
      console.log(e);
    }
    return [];
  }

};

export default Team;