import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

type AlertState = Alert[];

const initialState: AlertState = [];

const AlertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert>) => {
      return [...state, action.payload];
    },

    removeAlert: (state, action: PayloadAction<string>) => {
      return state.filter(({ id }) => id !== action.payload);
    }
  }
});

export function alert(
  { message, type }: { message: string; type: AlertType },
  dispatch: Dispatch
) {
  const id = uuid();

  dispatch(setAlert({ message, type, id }));

  setTimeout(() => dispatch(removeAlert(id)), 5000);
}

export const { setAlert, removeAlert } = AlertSlice.actions;
export default AlertSlice.reducer;
