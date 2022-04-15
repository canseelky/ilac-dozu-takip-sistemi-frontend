import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {patients: [], isLoading: false, isError: false};

const myPatientsSlice = createSlice({
  name: 'myPatientsSlice',
  initialState,
  reducers: {
    getPatientsData(state, action) {
      state.patients = action.payload.data;
    },
  },
});

export const myPatientsActions = myPatientsSlice.actions;

export default myPatientsSlice;

export const fetchMyPatients = () => {
  return async dispatch => {
    try {
      const response = await axios.get(
        'http://10.0.2.2:8080/api/doctor/patients',
        {},
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem(
              'accessToken',
            )}`,
          },
          params: {
            doctorid: await AsyncStorage.getItem('userId'),
          },
        },
      );
      dispatch(myPatientsActions.getPatientsData({data: response.data}));
      dispatch(myPatientsActions.setIsLoading(false));
    } catch (error) {
      console.log('aaa', error);
      dispatch(myPatientsActions.setIsError(true));
      dispatch(myPatientsActions.setIsLoading(false));
    }
  };
};

export const addDrugToPatient = (patientId, drugId) => async dispatch => {
  dispatch(myPatientsActions.setIsLoading(true));
  dispatch(myPatientsActions.setIsError(false));
  try {
    await axios.post(`/api/mypatients/${patientId}/drugs/${drugId}`);
    dispatch(myPatientsActions.setIsLoading(false));
  } catch (error) {
    dispatch(myPatientsActions.setIsError(true));
    dispatch(myPatientsActions.setIsLoading(false));
  }
};
