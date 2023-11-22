
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';
import { useSelector } from 'react-redux';
import type { IStore } from '..';

export interface IUserStore {
  user: IUser | null;
};
const initialState: IUserStore = {
  user: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state: IUserStore, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    }
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;

export function useAuth() {
  const { user } = useSelector((state: IStore) => state).auth;
  const isAuth = !!user;
  return {
    user,
    isAuth,
  }
}