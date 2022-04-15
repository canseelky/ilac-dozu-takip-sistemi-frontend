import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Patients from '../../screens/doctor/Patients';
import PatientDetail from '../../screens/doctor/PatientDetail';
import PatientHistory from '../../screens/doctor/PatientHistory';
import AddNewDrug from '../../screens/doctor/AddNewDrug';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Patients,
      navigationOptions: {
        headerTitle: I18N.t('myPatients'),
      },
    },
    PatientDetail: {
      screen: PatientDetail,
      navigationOptions: {
        headerBackTitle: () => null,
        headerTitle: '',
      },
    },
    PatientHistory: {
      screen: PatientHistory,
      navigationOptions: {
        headerTitle: I18N.t('history'),
      },
    },
    AddNewDrug: {
      screen: AddNewDrug,
      navigationOptions: {
        headerTitle: I18N.t('addNewDrug'),
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTintColor: Colors.primaryColor,
      headerBackTitle: () => null,
    },
  },
);

export default HomeStack;
