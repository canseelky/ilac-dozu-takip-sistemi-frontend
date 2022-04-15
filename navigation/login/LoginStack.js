import {createStackNavigator} from 'react-navigation-stack';
import Login from '../../screens/shared/Login';
import ForgetPassword from '../../screens/shared/ForgetPassword';
import Colors from '../../utils/Colors';
import I18N from '../../locale/i18n';
import PasswordConfirm from '../../screens/shared/PasswordConfirm';

const LoginStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle: I18N.t('login'),
    },
  },
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: {
      headerTitle: I18N.t('resetPassword'),
    },
  },
  passwordConfirm: {
    screen: PasswordConfirm,
    navigationOptions: {
      headerTitle: I18N.t('resetPassword'),
      headerTintColor: Colors.primaryColor,
      headerLeft: () => null,
    },
  },
});

export default LoginStack;
