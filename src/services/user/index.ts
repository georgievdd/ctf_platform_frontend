import api from "../../api";
import { showAlert } from "../../datafunc";
import { IUser, IUserCreateRequest, IUserEditRequest, IUserLoginRequest, IUserLoginResponse, IUserRegistrationRequest, IUserRegistrationResponse } from "../../interfaces/user";
import { store } from "../../store";
import { setUser } from "../../store/slices/auth";

class User {

  static async getAll(page?: number | undefined, size?: number | undefined): Promise<IUser[]> {
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

  static async login(data: IUserLoginRequest, redirect: () => void) {
    await api.user.login(data)
    .then(data => data.data)
    .then(data => {
      localStorage.setItem('accessJwt', data.accessJwt);
      return data;
    })
    .then(() => redirect())
    .catch(e => {
      showAlert(e?.response?.data?.message);
    })
  }

  static async registration(data: IUserRegistrationRequest, redirect: () => void) {
    await api.user.registration(data)
    .then(data => data.data)
    .then(data => {
      localStorage.setItem('accessJwt', data.accessJwt);
      return data;
    })
    .then(() => redirect())
    .catch(e => {
      showAlert(e?.response?.data?.message);
    })
  }

  static async checkAuth(redirect: () => void) {
    redirect();
  }

  static async getProfile() {
    api.user.getProfile()
    .then(data => data.data)
    .then(data => {
      console.log(data);
      store.dispatch(setUser(data));
    })
    .catch(e => {
      showAlert(e?.response?.data?.message);
    })
  }

};

export default User;