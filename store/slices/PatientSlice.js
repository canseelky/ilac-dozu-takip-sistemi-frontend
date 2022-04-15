import {createSlice} from '@reduxjs/toolkit';
import axios from '../../config/@axios';
const initialState = {history: [], doctors: []};
const PatientSlice = createSlice({
  name: 'PatientSlice',
  initialState,
  reducers: {
    setHistoryData(state, action) {
      state.history.push('');
    },
  },
  setDoctors(state, action) {
    state.doctors = action.payload;
  },
});

export const PatientActions = PatientSlice.actions;

export default PatientSlice;
