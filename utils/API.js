import axios from '../config/@axios';
import AsyncStorage from 'react-native';

const JWT_TOKEN = AsyncStorage.getItem('token');
const USERID = AsyncStorage.getItem('userId');

const API = {
  sendWeight: async weight => {
    return await axios.post(
      '/weight',
      {
        weight: weight,
        userId: USERID,
      },
      {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      },
    );
  },
  sendHeight: async height => {
    return await axios.post(
      '/height',
      {
        height: height,
        userId: USERID,
      },
      {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      },
    );
  },

  sendRequestToPatient: async (patientId, doctorId) => {
    return await axios.post(
      '/request',
      {
        patientId: patientId,
        doctorId: doctorId,
      },
      {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      },
    );
  },
  getMyPatients: async () => {
    return await axios.get(`/patient/${USERID}`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
  },

  getAllDrugs: async () => {
    return await axios.get('/drugs', {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
  },

  searchPatient: async phoneNumber => {
    return await axios.get(`/patient/search/${phoneNumber}`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
  },
  setFormula: async formulaId => {
    return await axios.post(
      '/formula',
      {
        formulaId: formulaId,
        userId: USERID,
      },
      {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      },
    );
  },
  getFormula: async () => {
    return await axios.get(`/formula/${USERID}`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
  },

  getMyHistory: async () => {
    return await axios.get(`/history/${USERID}`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
  },
  getMyDoctors: async () => {
    return await axios.get(`/doctor/${USERID}`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
  },
  getMembershipInfo: async () => {
    return await axios.get(`/membership/${USERID}`, {
      headers: {
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    });
  },
  addDrugToPatient: async (patientId, drugId, updateFreq, baseDose) => {
    return await axios.post(
      '/drug',
      {
        patientId: patientId,
        drugId: drugId,
        updateFreq: updateFreq,
        baseDose: baseDose,
      },
      {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      },
    );
  },
  checkEmail: async email => {
    return await axios.get(`/user/check/${email}`, {});
  },
  registerPatient: async (
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    gender,
    city,
    dob,
  ) => {
    return await axios.post(
      '/auth/patientRegister',
      {
        name: firstName,
        surname: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        gender,
        city,
        dob,
      },
      {},
    );
  },
};

export default API;
