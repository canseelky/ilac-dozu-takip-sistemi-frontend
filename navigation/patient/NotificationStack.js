import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Notifications from '../../screens/patient/Notifications';
import NotificationDetail from '../../screens/patient/NotificationDetail';
import I18N from '../../locale/i18n';
const NotificationStack = createStackNavigator({
  NotificationsPatient: {
    screen: Notifications,
    navigationOptions: {
      headerTitle: I18N.t('notifications'),
    },
  },
  NotificationDetail: {
    screen: NotificationDetail,
  },
});

export default NotificationStack;
