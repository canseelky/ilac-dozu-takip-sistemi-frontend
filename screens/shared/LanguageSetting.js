import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import mI18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LanguageActions} from '../../store/slices/LanguageSlice';

const LanguageSetting = () => {
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [defaultLanguage, setDefaultLanguage] = useState('');
  const language = useSelector(state => state.language?.language);
  const [showAlert, setShowAlert] = useState(false);

  const getDefaultLanguage = async () => {
    let defLang;
    try {
      defLang = await AsyncStorage.getItem('lang');
      setDefaultLanguage(defLang);
    } catch (err) {
      console.log('err', err);
    }
    return defLang;
  };

  const setSelectedLanguageToAsyncStorage = async language => {
    setSelectedLanguage(language);
    await AsyncStorage.setItem('lang', language);
    dispatch(LanguageActions.setLanguage(language));
    setShowAlert(true);
  };

  useEffect(() => {
    setDefaultLanguage(getDefaultLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={setSelectedLanguageToAsyncStorage.bind(null, 'tr')}>
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>{mI18N.t('turkish')}</Text>
          {defaultLanguage == 'tr' ? (
            <FontAwesome name="check" color="green" size={20} />
          ) : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={setSelectedLanguageToAsyncStorage.bind(null, 'en')}>
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>{mI18N.t('english')}</Text>
          {defaultLanguage === 'en' ? (
            <FontAwesome name="check" color="green" size={20} />
          ) : null}
        </View>
      </TouchableOpacity>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Language Changed"
        message="Please restart the application for implementing new language"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => setShowAlert(false)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginTop: '2%', marginLeft: '10%'},

  languageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.black3,
    width: '90%',
    borderBottomWidth: 0.2,
    marginTop: '4%',
  },
  languageText: {
    marginBottom: 10,
  },
});
export default LanguageSetting;
