import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import statusReducer from './reducers/status';
import { userApi, genreApi, movieApi, commentApi } from '../apis/index';
import { dashboardApi } from '../apis/dashboardApi';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    user: userReducer,
    status: statusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your-non-serializable-action'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }).concat(
      userApi.middleware,
      genreApi.middleware,
      movieApi.middleware,
      commentApi.middleware,
      dashboardApi.middleware
    ),
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
