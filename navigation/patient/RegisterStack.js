import {createStackNavigator} from 'react-navigation-stack';
import I18N from '../../locale/i18n';
import Step1 from './register/Step1';
import Step2 from './register/Step2';
import Step3 from './register/Step3';
import Colors from '../../utils/Colors';

const RegisterStack = createStackNavigator(
  {
    Step1: {
      screen: Step1,
      navigationOptions: {
        headerTitle: I18N.t('step1'),
      },
    },
    Step2: {
      screen: Step2,
      navigationOptions: {
        headerTitle: I18N.t('step2'),
      },
    },
    Step3: {
      screen: Step3,
      navigationOptions: {
        headerTitle: I18N.t('step3'),
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTintColor: Colors.primaryColor,
    },
  },
);

export default RegisterStack;
