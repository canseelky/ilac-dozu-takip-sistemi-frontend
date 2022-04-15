import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Register from '../../screens/doctor/Register';
import Colors from '../../utils/Colors';
import I18N from '../../locale/i18n';

const RegisterDoctorStack = createStackNavigator({
  Notifications: {
    screen: Register,
    navigationOptions: {
      headerTintColor: Colors.primaryColor,
      headerTitle: I18N.t('register'),
    },
  },
});

export default RegisterDoctorStack;
