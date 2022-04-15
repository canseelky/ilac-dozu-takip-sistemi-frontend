import PatientSlice from './slices/PatientSlice';
import LanguageSlice from './slices/LanguageSlice';
import {configureStore} from '@reduxjs/toolkit';
import myPatientsSlice from './slices/MyPatientsSlice';
import HistorySlice from './slices/HistorySlice';
import LoginSlice from './slices/LoginSlice';
const store = configureStore({
  reducer: {
    patient: PatientSlice.reducer,
    language: LanguageSlice.reducer,
    myPatientsSlice: myPatientsSlice.reducer,
    history: HistorySlice.reducer,
    auth: LoginSlice.reducer,
  },
});

export default store;
