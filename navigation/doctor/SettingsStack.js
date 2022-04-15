import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import MembershipInfo from '../../screens/shared/MembershipInfo';
import ResetPassword from '../../screens/shared/ResetPassword';
import BsaSetting from '../../screens/doctor/BsaSetting';
import DoctorSettings from '../../screens/doctor/Settings';
import LanguageSetting from '../../screens/shared/LanguageSetting';
import UserAgreement from '../../screens/shared/UserAgreement';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
const SettingsStack = createStackNavigator(
  {
    DoctorSettings: {
      screen: DoctorSettings,
      navigationOptions: {
        headerTitle: I18N.t('settings'),
      },
    },
    MembershipInfo: {
      screen: MembershipInfo,
      navigationOptions: {
        headerTitle: I18N.t('membership'),
      },
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        headerTitle: I18N.t('resetPassword'),
      },
    },
    BsaSetting: {
      screen: BsaSetting,
      navigationOptions: {
        headerTitle: I18N.t('bsaFormula'),
      },
    },
    LanguageSetting: {
      screen: LanguageSetting,
      navigationOptions: {
        headerTitle: I18N.t('languageSettings'),
      },
    },
    UserAgreement: {
      screen: UserAgreement,
      navigationOptions: {
        headerTitle: I18N.t('userAgreement'),
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
export default SettingsStack;
