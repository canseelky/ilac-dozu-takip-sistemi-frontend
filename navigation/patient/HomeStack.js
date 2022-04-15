import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../../screens/patient/Home';
import History from '../../screens/patient/History';
import I18N from '../../locale/i18n';
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: () => null,
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        headerTitle: I18N.t('history'),
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default HomeStack;
