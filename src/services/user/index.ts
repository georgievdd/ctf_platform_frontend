import api from "../../api";
import { IUser, IUserCreateRequest, IUserEditRequest } from "../../interfaces/user";

class User {

  static async getAll(page: number | undefined, size: number | undefined): Promise<IUser[]> {
    try {
      const users = await api.user.getAll();
      return users.data.content;
    } catch(e) {
      console.log(e);
    }
    return [];
  }
  
  static async getOne(id: string): Promise<IUser | undefined> {
    try {
      const user = await api.user.getOne(id);
      return user;
    } catch(e) {
      console.log(e);
    }
  }

  static async edit(data: IUserEditRequest): Promise<IUser | undefined> {
    try {
      const user = await api.user.edit(data);
      return user;
    } catch(e) {
      console.log(e);
    }
  }

  static async create(data: IUserCreateRequest): Promise<IUser | undefined> {
    try {
      const user = await api.user.create(data);
      return user;
    } catch(e) {
      console.log(e);
    }
  }

  static async deleteOne(id: string): Promise<void> {
    try {
      const user = await api.user.deleteOne(id);
    } catch(e) {
      console.log(e);
    }
  }

  static async login(email: string, password: string): Promise<void> {
    api.user.login({email, password})
    .then(data => data.data)
    .then(data => {
      localStorage.setItem('accessJwt', data.accessJwt);
    })
  }

  static async registration(email: string, password: string): Promise<IUser> {
    return await api.user.registration({email, password})
    .then(data => data.data)
    .then(data => {
      localStorage.setItem('accessJwt', data.accessJwt);
      console.log(data);
      return data;
    })
  }

};

export default User;