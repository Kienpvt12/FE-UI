import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import { userApi } from '../apis/userApi';

export default configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});
