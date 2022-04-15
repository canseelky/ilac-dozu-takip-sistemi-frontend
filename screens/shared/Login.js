import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import AwesomeAlert from 'react-native-awesome-alerts';
import Validator from 'validator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../../service/APIService';
import {LoginActions} from '../../store/slices/LoginSlice';
import {useDispatch} from 'react-redux';
import OneSignal from 'react-native-onesignal';
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [success, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const validateEmail = () => {
    return Validator.isEmail(email);
  };

  const validatePassword = () => {
    if (password.split(' ').length < 0) {
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    login({
      email: email,
      password: password,
    })
      .then(async response => {
        console.log('response', response);

        setIsSuccess(true);
        const userType = response.data.authority;
        const userId = response.data.userId;
        const accessToken = response.data.token;
        const email = response.data.email;
        await AsyncStorage.setItem('userAuthority', userType);
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('email', email);

        dispatch(LoginActions.setUserId(userId));
        dispatch(LoginActions.setJwt(accessToken));
        dispatch(LoginActions.setEmail(email));
        OneSignal.setLogLevel(6, 0);
        OneSignal.setAppId('6df40ed0-bbb3-47a2-bba0-2ef2c639e450');
        const isRegisteredPushNotification = await AsyncStorage.getItem(
          'oneSignalId',
        );

        const oneSignalId3 = await OneSignal.getDeviceState();
        if (isRegisteredPushNotification == null) {
          const oneSignalId = await (await OneSignal.getDeviceState()).userId;

          //await AsyncStorage.setItem('oneSignalId', oneSignalId);
          const apiUrl = userType == 'doctor' ? 'doctor' : 'patient';
          // await axios.post(
          //   `http://localhost:8080/api/${apiUrl}/setoneSignalId`,
          //   {},
          //   {
          //     params: {
          //       oneSignalId: oneSignalId,
          //       id: userId,
          //     },
          //     headers: {
          //       Authorization: `Bearer ${accessToken}`,
          //     },
          //   },
          // );
        }

        props.navigation.navigate(
          userType == 'patient' ? 'patientScreen' : 'doctorScreen',
        );
      })
      .catch(async error => {
        console.log('err', error);
        setIsError(true);
      });
  };

  useEffect(() => {
    setIsPasswordValid(true);
  }, [password]);
  useEffect(() => {
    setIsEmailValid(true);
  }, [email]);
  const handleNoUserSelected = () => {
    setShowError(true);
  };

  const handleForgotPassword = () => {
    props.navigation.navigate('ForgetPassword');
  };
  return (
    <View style={styles.main}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/app-logo.png')}
          style={styles.logo}></Image>
      </View>
      <View style={styles.inputContainer}>
        <Icon name="mail" size={20} />
        <Text>{I18N.t('email')}</Text>
        <TextInput
          style={styles.textInput}
          type="email"
          onChangeText={value => setEmail(value)}
          value={email}></TextInput>
      </View>
      {!isEmailValid && (
        <Text style={{color: 'red'}}>{I18N.t('notValidEmail')}</Text>
      )}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={30} />
        <Text>{I18N.t('password')}</Text>

        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          onChangeText={value => setPassword(value)}></TextInput>
      </View>
      {!isPasswordValid && (
        <Text style={{color: 'red'}}>{I18N.t('notValidPassword')}</Text>
      )}
      <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
        <Text style={{color: Colors.white}}>{I18N.t('login')}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleForgotPassword()}>
        <Text style={{color: Colors.lightBlue, marginTop: '2%'}}>
          {I18N.t('forgetPassword')}
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => props.navigation.navigate('doctorScreen')}>
        <Text style={{color: Colors.lightBlue, marginTop: '2%'}}>
          {I18N.t('registerNow')}
        </Text>
      </TouchableOpacity>
     */}
      <AwesomeAlert
        show={isError}
        showProgress={false}
        title="Error"
        message={I18N.t('loginErrorMessage')}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText={I18N.t('ok')}
        confirmButtonColor={Colors.primaryColor}
        onConfirmPressed={() => {
          setIsError(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    marginTop: '20%',
  },
  inputContainer: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    alignItems: 'center',
    marginLeft: 23,
    borderColor: Colors.black,
    width: 200,
    height: 40,
    borderRadius: 2,
    borderWidth: 1,
  },
  userType: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 23,
  },
  logo: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.3,
    resizeMode: 'contain',
  },
  button: {
    display: 'flex',
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: '6%',
    marginTop: '4%',
    borderRadius: 45,
  },
});

export default Login;
