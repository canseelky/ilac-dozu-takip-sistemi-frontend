import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from 'react-native';

const LoginSlice = createSlice({
  name: 'LoginSlice',
  initialState: {
    isLoading: false,
    isError: false,
    isAuthenticated: false,
    authority: '',
    jwt: '',
    userId: '',
    email: '',
  },
  reducers: {
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload.data;
    },
    setUsereAuthority(state, payload) {
      state.authority = payload.data;
    },
    setJwt(state, payload) {
      state.jwt = payload.payload;
    },
    setUserId(state, payload) {
      state.userId = payload.payload;
    },
    setEmail(state, payload) {
      state.email = payload.payload;
    },
  },
});

export const LoginActions = LoginSlice.actions;

export default LoginSlice;

export const login = (username, password) => {
  return async dispatch => {
    dispatch(LoginActions.setIsLoading(true));
    dispatch(LoginActions.setIsError(false));
    try {
      const response = await axios.post('/api/login', {username, password});
      dispatch(LoginActions.setJwt(response.data.token));
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('authority', response.data.authority);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch(LoginActions.setIsAuthenticated(true));
      dispatch(LoginActions.setUsereAuthority(response.data.authority));
      dispatch(LoginActions.setIsLoading(false));
    } catch (error) {
      dispatch(LoginActions.setIsError(true));
      dispatch(LoginActions.setIsLoading(false));
    }
  };
};
