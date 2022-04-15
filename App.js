import React, {useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';
import {NativeModules, Platform} from 'react-native';
import I18N from 'react-native-i18n';
import SwitchNavigator from './navigation/SwitchNavigator';
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';
import NavigationService from './utils/NavigationService';
import {useDispatch} from 'react-redux';
import {LoginActions} from './store/slices/LoginSlice';
const App = () => {
  LogBox.ignoreLogs(['Reanimated 2']);
  const dispatch = useDispatch();
  OneSignal.setNotificationOpenedHandler(notification => {
    let data = notification.notification.additionalData.data;
    let notifyType = data.notifyType;
    switch (notifyType) {
      case 'NEWDOCTOR':
        NavigationService.navigate('SharePointPermission', {
          dr: data.doctorId,
        });
        break;
      case 'NEWDRUG':
        NavigationService.navigate('NotificationsPatient');
        break;
      case 'NEWDOSE':
        NavigationService.navigate('Notifications');
        break;

      default:
        break;
    }
  });
  useEffect(() => {
    async function getToken() {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token !== null) {
          const userAuthority = await AsyncStorage.getItem('userAuthority');
          const userId = await AsyncStorage.getItem('userId');
          const accessToken = await AsyncStorage.getItem('accessToken');
          const email = await AsyncStorage.getItem('email');

          dispatch(LoginActions.setUserId(userId));
          dispatch(LoginActions.setJwt(accessToken));
          dispatch(LoginActions.setEmail(email));
          if (userAuthority == 'patient') {
            NavigationService.navigate('patientScreen');
          } else if (userAuthority == 'doctor') {
            NavigationService.navigate('doctorScreen');
          }
        }
      } catch (e) {
        console.log('error', e);
      }
    }
    getToken();
    const retrieveLanguage = async () => {
      try {
        const selectedLanguage = await AsyncStorage.getItem('lang');
        if (selectedLanguage !== null) {
          //dispatch(LanguageActions.setLanguage(selectedLanguage));
          I18N.locale = selectedLanguage;
        }
      } catch (error) {
        console.log('eror', error);
        const defaultLanguage =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier;
        //dispatch(LanguageActions.setLanguage(defaultLanguage));
        I18N.locale = defaultLanguage;
      }
    };
    retrieveLanguage();
    SplashScreen.hide();
  }, []);

  return (
    <SwitchNavigator
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};

export default App;
