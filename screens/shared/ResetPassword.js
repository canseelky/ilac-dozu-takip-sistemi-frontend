import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {usePassword} from '../../hooks/usePassword';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {validatePassword} from '../../utils/checkPassword';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from '../../config/@axios';
import {Snackbar} from 'react-native-paper';
const ResetPassword = props => {
  const [password, setPassword] = useState('');
  const email = useSelector(state => state.auth.email);
  const token = useSelector(state => state.auth.jwt);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isRequestError, setIsRequestError] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const resetData = {
    email,
    password,
  };
  const checkPassword = () => {
    if (password !== confirmPassword) {
      setError(I18N.t('passwordNotMatch'));
      return false;
    } else if (!validatePassword(password)) {
      setError(I18N.t('passwordNotValid'));
      return false;
    }
    return true;
  };

  const handleConfirmChange = () => {
    const isPasswordValid = checkPassword();
    if (isPasswordValid) {
      axios
        .put('/password/change', resetData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setIsPasswordChanged(true);
        })
        .catch(err => {
          setIsRequestError(true);
        })
        .finally(() => {
          setIsFinished(true);
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="unlock" size={9} />
        <Text>{I18N.t('password')}</Text>
        <TextInput
          secureTextEntry={!showPassword}
          style={styles.inputField}
          onChangeText={text => setPassword(text)}
        />
        <Entypo
          name={showPassword ? 'eye' : 'eye-with-line'}
          size={20}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="unlock" size={9} />
        <Text>{I18N.t('confirmPassword')}</Text>
        <TextInput
          secureTextEntry={!showRePassword}
          style={styles.inputField}
          onChangeText={text => setConfirmPassword(text)}
        />
        <Entypo
          name={showRePassword ? 'eye' : 'eye-with-line'}
          size={20}
          onPress={() => setShowRePassword(!showRePassword)}
        />
      </View>

      <TouchableOpacity onPress={() => handleConfirmChange()}>
        <View style={styles.updateButtonContainer}>
          <Text style={styles.updateButton}>{I18N.t('resetPassword')}</Text>
        </View>
      </TouchableOpacity>

      <View style={{marginTop: SCREEN_HEIGHT * 0.2}}>
        <Snackbar
          visible={isFinished}
          onDismiss={() => setIsFinished(false)}
          action={{
            label: I18N.t('ok'),
            onPress: () => setIsFinished(false),
          }}
          theme={{colors: {accent: Colors.white}}}
          style={{backgroundColor: Colors.primaryColor, marginTop: 90}}>
          {isPasswordChanged
            ? I18N.t('resetPasswordSuccess')
            : I18N.t('resetPasswordError')}
        </Snackbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: SCREEN_HEIGHT * 0.1},
  updateButton: {
    color: Colors.white,
    textAlign: 'center',
  },
  updateButtonContainer: {
    display: 'flex',
    backgroundColor: Colors.primaryColor,
    width: SCREEN_WIDTH * 0.4,
    marginLeft: '30%',
    marginTop: '14%',
    height: SCREEN_HEIGHT * 0.036,
    justifyContent: 'center',
    borderRadius: 5,
  },
  inputContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputField: {
    borderColor: Colors.black,
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.04,
  },
});

export default ResetPassword;
