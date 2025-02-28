import { TUserCredentails, TUserSliceInitailState } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TUserSliceInitailState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: TUserSliceInitailState, action: { payload: TUserCredentails }) {
      state.user = action.payload;
    },
    setUserEmpty(state: TUserSliceInitailState) {
      state.user = initialState.user;
    },
  },
});

export const { setUser, setUserEmpty } = userSlice.actions;

export default userSlice.reducer;
