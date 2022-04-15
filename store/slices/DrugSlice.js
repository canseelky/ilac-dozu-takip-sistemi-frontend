import {createSlice} from '@reduxjs/toolkit';
import API from '../../config/@axios';

export const DrugSlice = createSlice({
  name: 'DrugSlice',
  initialState: {
    drugs: [],
  },
  reducers: {
    setDrugs(state, payload) {
      state.drugs = payload.data;
    },
  },
});

e;
