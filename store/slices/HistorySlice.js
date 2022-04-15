import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {history: [], isLoading: false, isError: false};
import AsyncStorage from '@react-native-async-storage/async-storage';
const HistorySlice = createSlice({
  name: 'HistorySlice',
  initialState,
  reducers: {
    setHistoryData(state, action) {
      state.history = action.payload;
    },
  },
});

export const HistoryActions = HistorySlice.actions;

export default HistorySlice;

export const fetchHistory = id => {
  return async dispatch => {
    dispatch(HistoryActions.setHistoryData([]));
    try {
      const res = await axios.get(
        `http://localhost:8080/api/doctor/history/`,

        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem(
              'accessToken',
            )}`,
          },
          params: {
            id,
          },
        },
      );

      dispatch(HistoryActions.setHistoryData([...res.data]));
    } catch (error) {
      console.log('error', error);
      dispatch(HistoryActions.setIsError(true));
      dispatch(HistoryActions.setIsLoading(false));
    }
  };
};
