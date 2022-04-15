import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import HomeStack from './HomeStack';
import HistoryStack from './HistoryStack';
import NotificationStack from './NotificationStack';
import SharePointStack from './SharePointStack';
import SettingsStack from './SettingsStack';
import Colors from '../../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
const TabBarPatient = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={30} color={tintColor} />
        ),
        tabBarTitle: 'none',
        tabBarColor: '#900',
      },
    },
    History: {
      screen: HistoryStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FAIcon name="history" size={30} color={tintColor} />
        ),
      },
    },
    Notification: {
      screen: NotificationStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="notifications" size={30} color={tintColor} />
        ),
      },
    },
    SharePoint: {
      screen: SharePointStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="share-social-sharp" size={30} color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="settings-sharp" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: () => {
        return null;
      },
      tabBarOptions: {
        style: {backgroundColor: Colors.primaryColor},
        activeTintColor: Colors.primaryColor2,
        inactiveTintColor: Colors.white,
      },
    },
  },
);

export default createAppContainer(TabBarPatient);
