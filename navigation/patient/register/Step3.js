import React, {useState} from 'react';
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
import Entypo from 'react-native-vector-icons/Entypo';
import AwesomeAlert from 'react-native-awesome-alerts';
//import API from '../../../utils/API';
import axios2 from '../../../config/@axios';
import axios from 'axios';
const Step3 = props => {
  const Step2Data = props.navigation?.getParam('step2Data');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isError, setIsError] = useState(false);
  const [success, setIsSuccess] = useState(false);
  const checkEmail = () => {
    if (email.includes('@') && email.includes('.')) {
      return true;
    } else {
      return false;
    }
  };

  const checkPassword = () => {
    if (
      password.length > 6 &&
      password.length < 20 &&
      password === passwordConfirm
    ) {
      return true;
    } else {
      return false;
    }
  };

  const redirectToLogin = () => {
    setIsSuccess(false);
    props.navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    const userData = {
      ...Step2Data,
      email,
      password,
    };

    try {
      const res = await axios.post(
        'http://localhost:8080/api/auth/patientRegister',
        {
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          password: userData.password,
          gender: userData.gender,
          city: userData.city,
          dob: userData.date,
          height: userData.height,
          weight: userData.weight,
        },
        {},
      );
      if (res.status == 200) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }

    const isEmailValid = checkEmail(email);
    if (isEmailValid) {
      setIsEmailValid(true);
      const isPasswordValid = checkPassword(password);
      if (isPasswordValid) {
        setIsPasswordValid(true);
        try {
          // const response = await API.registerPatient(userData);
        } catch (err) {
          setIsError(true);
        }
      } else {
        setIsPasswordValid(false);
      }
    } else {
    }
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

        <View>
          <View style={styles.inputContainer}>
            <Entypo name="lock" size={30} />
            <Text style={styles.textStyle}>{I18N.t('email')}</Text>
            <TextInput
              style={styles.textInputStyle}
              value={email}
              onChangeText={text => setEmail(text)}></TextInput>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Entypo name="mail" size={30} />
          <Text style={styles.textStyle}>{I18N.t('password')}</Text>
          <TextInput
            secureTextEntry
            style={styles.textInputStyle}
            onChangeText={text => setPassword(text)}
            maxLength={11}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} />
          <Text style={styles.textStyle}>{I18N.t('confirmPassword')}</Text>
          <TextInput
            secureTextEntry
            style={styles.textInputStyle}
            onChangeText={text => setPasswordConfirm(text)}
            maxLength={11}></TextInput>
        </View>
        <TouchableOpacity onPress={() => handleSignUp()}>
          <View style={styles.btnStyle}>
            <Entypo name="login" size={30} color="white"></Entypo>
            <Text style={styles.btnText}>{I18N.t('register')}</Text>
          </View>
        </TouchableOpacity>
        <AwesomeAlert
          show={isError}
          showProgress={false}
          title="Error"
          message={I18N.t('registerError')}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => setIsError(false)}
        />
        <AwesomeAlert
          show={!isPasswordValid}
          showProgress={false}
          title="Error"
          message={I18N.t('passwordNotValid')}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => setIsPasswordValid(true)}
        />
        <AwesomeAlert
          show={!isEmailValid}
          showProgress={false}
          title="Error"
          message={I18N.t('emailNotValid')}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => setIsEmailValid(true)}
        />
        <AwesomeAlert
          show={success}
          showProgress={false}
          title="Success"
          message={I18N.t('registerSuccess')}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => redirectToLogin()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SCREEN_HEIGHT * 0.01,
    backgroundColor: 'white',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  logoContainer: {
    marginTop: SCREEN_HEIGHT * 0.1,
    marginLeft: SCREEN_WIDTH * 0.3,
    marginBottom: SCREEN_HEIGHT * 0.03,
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 30,

    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textStyle: {
    marginRight: SCREEN_WIDTH * 0.1,
  },
  textInputStyle: {
    borderColor: Colors.black,
    borderStyle: 'solid',
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_HEIGHT * 0.04,
    borderRadius: 20,
  },
  btnStyle: {
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SCREEN_WIDTH * 0.3,
    borderRadius: 8,
    marginTop: SCREEN_HEIGHT * 0.1,
  },
  btnText: {
    color: Colors.white,
    textAlign: 'center',
  },
  logo: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.3,
    resizeMode: 'contain',
  },
});

export default Step3;
