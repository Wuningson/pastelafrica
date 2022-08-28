import { configureStore } from '@reduxjs/toolkit';
import AlertReducer from '../reducers/AlertReducer';
import LoadingReducer from '../reducers/LoadingReducer';

const store = configureStore({
  reducer: {
    alert: AlertReducer,
    loading: LoadingReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
