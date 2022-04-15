import React, {useState} from 'react';
('react');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import I18N from '../../../locale/i18n';
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
import Colors from '../../../utils/Colors';
import Validator from 'validator';
import AwesomeAlert from 'react-native-awesome-alerts';
const Step1 = props => {
  const checkNumberIsValid = () => {
    const isValid = Validator.isMobilePhone(phoneNumber);
    return isValid;
  };

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isnameValid, setIsNameValid] = useState(true);
  const [issurnameValid, setIsSurnameValid] = useState(true);
  const [isphoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isError, setIsError] = useState(false);
  const step1Data = {
    name,
    surname,
    phoneNumber,
  };

  const handleNextStep = () => {
    if (name.length < 3) {
      setIsNameValid(false);
      return;
    }
    if (surname.length < 3) {
      setIsSurnameValid(false);
      return;
    }
    if (!checkNumberIsValid()) {
      setIsPhoneNumberValid(false);
      return;
    }
    props.navigation.navigate('Step2', {step1Data});
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/app-logo.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <FontAwesome name="user-circle" size={30} style={styles.icon} />
            <Text style={styles.textStyle}>{I18N.t('name')}</Text>
          </View>
          <View>
            <TextInput
              style={styles.textInputStyle}
              value={name}
              onChangeText={nameInput => setName(nameInput)}></TextInput>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <FontAwesome name="user-circle" size={30} style={styles.icon} />
            <Text style={styles.textStyle}>{I18N.t('surname')}</Text>
          </View>
          <TextInput
            style={styles.textInputStyle}
            value={surname}
            onChangeText={surnameInput => setSurname(surnameInput)}></TextInput>
        </View>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <FontAwesome name="phone" size={20} style={styles.icon} />
            <Text style={styles.textStyle}>{I18N.t('phone')}</Text>
          </View>
          <TextInput
            style={styles.textInputStyle}
            value={phoneNumber}
            maxLength={11}
            onChangeText={number => setPhoneNumber(number)}
            keyboardType="numeric"></TextInput>
        </View>

        <View style={styles.btnStyle}>
          <TouchableOpacity onPress={() => handleNextStep()}>
            <Text style={styles.btnText}>{I18N.t('continue')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {!isnameValid && (
        <AwesomeAlert
          show={!isnameValid}
          showProgress={false}
          title="Error"
          message={I18N.t('nameNotValid')}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText={I18N.t('ok')}
          confirmButtonColor={Colors.primaryColor}
          onConfirmPressed={() => {
            setIsNameValid(true);
          }}
        />
      )}
      {!issurnameValid && (
        <AwesomeAlert
          show={!issurnameValid}
          showProgress={false}
          title="Error"
          message={I18N.t('surnameNotValid')}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText={I18N.t('ok')}
          confirmButtonColor={Colors.primaryColor}
          onConfirmPressed={() => {
            setIsSurnameValid(true);
          }}
        />
      )}
      {!isphoneNumberValid && (
        <AwesomeAlert
          show={!isphoneNumberValid}
          showProgress={false}
          title="Error"
          message={I18N.t('phoneNumberNotValid')}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText={I18N.t('ok')}
          confirmButtonColor={Colors.primaryColor}
          onConfirmPressed={() => {
            setIsPhoneNumberValid(true);
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SCREEN_HEIGHT * 0.01,
    backgroundColor: Colors.white,
    height: SCREEN_HEIGHT,
  },
  logoContainer: {
    marginTop: SCREEN_HEIGHT * 0.1,
    marginLeft: SCREEN_WIDTH * 0.3,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },
  logo: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.3,
    resizeMode: 'contain',
  },

  inputContainer: {
    display: 'flex',
    width: SCREEN_HEIGHT * 0.2,
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  row: {
    marginLeft: SCREEN_WIDTH * 0.2,
    flexDirection: 'row',
  },
  textInputStyle: {
    borderColor: Colors.black,
    borderStyle: 'solid',
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_HEIGHT * 0.04,
    borderRadius: 20,
    marginLeft: SCREEN_WIDTH * 0.05,
  },
  textInputPhone: {
    borderColor: Colors.black,
    borderStyle: 'solid',
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_HEIGHT * 0.04,
    borderRadius: 20,
  },
  btnStyle: {
    backgroundColor: Colors.primaryColor,
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_HEIGHT * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SCREEN_WIDTH * 0.38,
    borderRadius: 8,
    marginTop: SCREEN_HEIGHT * 0.1,
  },
  btnText: {
    color: Colors.white,
    textAlign: 'center',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: SCREEN_WIDTH * 0.02,
  },
});
export default Step1;
