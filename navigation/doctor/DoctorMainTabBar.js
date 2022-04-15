import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import HomeStack from './HomeStack';
import NewPatientStack from './NewPatientStack';
import NotificationStack from './NotificationStack';
import SettingsStack from './SettingsStack';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import I18N from '../../locale/i18n';
const DoctorMainTabBar = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={30} color={tintColor} />
        ),
      },
    },
    NewPatient: {
      screen: NewPatientStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Entypo name="add-user" size={30} color={tintColor} />
        ),
      },
    },
    Notification: {
      screen: NotificationStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FontAwesome name="bell" size={30} color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="settings" size={30} color={tintColor} />
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

export default createAppContainer(DoctorMainTabBar);
