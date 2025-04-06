import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import statusReducer from './reducers/status';
import { userApi, genreApi, movieApi, commentApi } from '../apis/index';

export default configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    user: userReducer,
    status: statusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, genreApi.middleware, movieApi.middleware, commentApi.middleware),
});
