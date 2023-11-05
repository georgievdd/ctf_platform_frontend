
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';
import { useSelector } from 'react-redux';
import type { IStore } from '..';
import { userRaw } from '../../api/user';

export interface IUserStore {
  user: IUser | null,
};
const initialState: IUserStore = {
  user: userRaw,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state: IUserStore, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    }
  },
});
export const { setAuth } = authSlice.actions;
export default authSlice.reducer;

export function useAuth() {
  const { user } = useSelector((state: IStore) => state).auth;
  const isAuth = !!user;
  return {
    user,
    isAuth,
  }
}