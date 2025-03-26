import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import { userApi } from '../apis/userApi';
import { genreApi } from '../apis/genreApi';
import { movieApi } from '../apis/movieApi';

export default configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, genreApi.middleware, movieApi.middleware),
});
