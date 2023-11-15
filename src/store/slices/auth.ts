
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';
import { useSelector } from 'react-redux';
import type { IStore } from '..';

export interface IUserStore {
  user: IUser | null;
};
const initialState: IUserStore = {
  user: {
    id: '123',
    teams: ['2', '6', '8', '2'],
    name: 'Dima',
    surname: 'Frilov',
    email: '12@example.com',
    rating: 15,
    admin: true,
  },
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state: IUserStore, action: PayloadAction<IUser>) {
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