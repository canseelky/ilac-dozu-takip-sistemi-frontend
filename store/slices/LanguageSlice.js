import {createSlice} from '@reduxjs/toolkit';

const initialState = {language: ''};

const LanguageSlice = createSlice({
  name: 'LanguageSlice',
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload.lang;
    },
  },
});

export default LanguageSlice;
export const LanguageActions = LanguageSlice.actions;
