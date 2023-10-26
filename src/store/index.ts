import { configureStore } from '@reduxjs/toolkit'
import authReducer, { IUserStore } from './slices/auth';

export interface IStore {
  auth: IUserStore
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
