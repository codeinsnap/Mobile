import { TCollegeName, TCollegeSliceInitialState } from '@/types/College';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TCollegeSliceInitialState = {
    collegeList: []
};

const collegeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCollegeList(state: TCollegeSliceInitialState, action: { payload: TCollegeName[] }) {

      state.collegeList = action.payload.map((item: TCollegeName) => ({value: item.institute_id, label: item.name }));
    },
  },
});

export const { setCollegeList } = collegeSlice.actions;

export default collegeSlice.reducer;
