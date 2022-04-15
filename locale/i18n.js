import I18N from 'react-native-i18n';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import tr from './tr.js';
import en from './en.js';
import {NativeModules, Platform} from 'react-native';

// const retrieveLanguage = async () => {
//   let selectedLanguage;
//   try {
//     selectedLanguage = await AsyncStorage.getItem('lang');
//     console.log('I18N SGTJNNFV', selectedLanguage);
//     return selectedLanguage;
//   } catch (error) {
//     selectedLanguage =
//       Platform.OS === 'ios'
//         ? NativeModules.SettingsManager.settings.AppleLocale ||
//           NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
//         : NativeModules.I18nManager.localeIdentifier;
//     return 'tr';
//   }
// };
//rconst loc = retrieveLanguage();

//I18N.locale = 'tr';

I18N.translations = {
  en: en,
  tr: tr,
  'en-TR': en,
  'tr-TR': tr,
  'en-US': en,
  'en-GB': en,
};

export default I18N;
