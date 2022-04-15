import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  Fname: '',
  surname: '',
  dob: '',
  gender: '',
  phone: '',
  email: '',
};

const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {},
});
