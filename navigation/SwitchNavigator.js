import {SwitchNavigator} from 'react-navigation';
import InfoStack from './starter/InfoStack';
import DoctorMainTabBar from './doctor/DoctorMainTabBar';
import TabBarPatient from './patient/TabBarPatient';
import LoginStack from './login/LoginStack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import RegisterStack from './patient/RegisterStack';
import RegisterDoctorStack from './doctor/RegisterDoctorStack';
export default createAppContainer(
  createSwitchNavigator(
    {
      gettingStarted: {
        screen: InfoStack,
      },
      doctorScreen: {
        screen: DoctorMainTabBar,
      },
      patientScreen: {
        screen: TabBarPatient,
      },
      loginScreen: {
        screen: LoginStack,
      },
      signUpPatient: {
        screen: RegisterStack,
      },
      signUpDoctor: {
        screen: RegisterDoctorStack,
      },
    },
    {
      initialRouteName: 'gettingStarted',
    },
  ),
);
