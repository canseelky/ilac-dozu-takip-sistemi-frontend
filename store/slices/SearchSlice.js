/* import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  drugs: [],
};
const SearchSlice = createSlice({
  initialState,
  name: SearchSlice,
  reducers: {
    setDrugs(state, action) {
      state.drugs = action.payload.data;
    },
  },
});

const searchSliceAction = SearchSlice.actions;

export const getSearchResult = searchTerm => {
  return async dispatch => {
    try {
      const data = await axios({
        method: 'GET',
        url: 'http://localhost:8080/api/doctor/drug/search',
        params: {
          term: searchTerm,
        },
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
        },
      });

      dispatch(searchSliceAction.setResult(data.data.data));
    } catch (err) {
      console.log(err);
    }
  };
};
 */
