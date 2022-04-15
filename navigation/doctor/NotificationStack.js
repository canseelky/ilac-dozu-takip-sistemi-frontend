import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Notifications from '../../screens/doctor/Notifications';
import Colors from '../../utils/Colors';
import I18N from '../../locale/i18n';
const NotificationStack = createStackNavigator({
  Notifications: {
    screen: Notifications,
    navigationOptions: {
      headerTintColor: Colors.primaryColor,
      headerTitle: I18N.t('notifications'),
    },
  },
});

export default NotificationStack;
