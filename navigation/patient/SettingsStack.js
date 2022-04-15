import {createStackNavigator} from 'react-navigation-stack';
import Settings from '../../screens/patient/Settings';
import MembershipInfo from '../../screens/shared/MembershipInfo';
import LanguageSettings from '../../screens/shared/LanguageSetting';
import ResetPassword from '../../screens/shared/ResetPassword';
import UserAgreement from '../../screens/shared/UserAgreement';
import PrivacyConstraint from '../../screens/shared/PrivacyConstraint';
import Colors from '../../utils/Colors';
import I18N from '../../locale/i18n';
const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: {
        headerTitle: I18N.t('settings'),
      },
    },
    MembershipInfo: {
      screen: MembershipInfo,

      navigationOptions: {
        headerTitle: I18N.t('membershipInfo'),
      },
    },
    LanguageSettings: {
      screen: LanguageSettings,

      navigationOptions: {
        headerTitle: I18N.t('languageSettings'),
      },
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        headerTitle: I18N.t('resetPassword'),
      },
    },
    UserAgreement: {
      screen: UserAgreement,
      navigationOptions: {
        headerTitle: I18N.t('userAgreement'),
      },
    },
    PrivacyConstraint: {
      screen: PrivacyConstraint,
      navigationOptions: {
        headerTitle: I18N.t('privacyterms'),
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
