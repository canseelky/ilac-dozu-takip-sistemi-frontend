import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import SharePoint from '../../screens/patient/SharePoint';
import SharePointPermission from '../../screens/patient/SharePointPermission';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
const SharePointStack = createStackNavigator({
  SharePoint: {
    screen: SharePoint,
    navigationOptions: {
      headerTitle: I18N.t('share'),
      headerTintColor: Colors.primaryColor,
      navigationOptions: {
        headerTitle: I18N.t('sharePermission'),
        headerTintColor: Colors.primaryColor,
        headerBackTitle: () => null,
      },
    },
  },
  SharePointPermission: {
    screen: SharePointPermission,
    navigationOptions: {
      headerTitle: I18N.t('sharePermission'),
      headerTintColor: Colors.primaryColor,
      headerBackTitle: () => null,
    },
  },
});

export default SharePointStack;
