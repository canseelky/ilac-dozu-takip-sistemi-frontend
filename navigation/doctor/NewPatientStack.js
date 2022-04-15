import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import AddNewPatient from '../../screens/doctor/AddNewPatient';
import PatientSearchResult from '../../screens/doctor/PatientSearchResult';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
const NewPatientStack = createStackNavigator(
  {
    AddNewPatient: {
      screen: AddNewPatient,
      navigationOptions: {
        headerTitle: I18N.t('AddNewPatient'),
      },
    },
    PatientSearchResult: {
      screen: PatientSearchResult,
      navigationOptions: {
        headerBackTitle: () => null,
        headerTitle: () => null,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTintColor: Colors.primaryColor,
    },
  },
);

export default NewPatientStack;
