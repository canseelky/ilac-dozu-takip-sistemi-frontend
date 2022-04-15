import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {usePassword} from '../../hooks/usePassword';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {validatePassword} from '../../utils/checkPassword';
import axios from '../../config/@axios';
import {useSelector} from 'react-redux';
const ResetPassword = props => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const uuid = useSelector(state => state.auth.uuid);

  const resetData = {
    email,
    password,
  };
  const checkPassword = () => {
    if (password != confirmPassword) {
      setError(I18N.t('passwordNotMatch'));
      return false;
    } else if (!validatePassword(password)) {
      setError(I18N.t('passwordNotValid'));
      return false;
    }
    return true;
  };

  const handleConfirmChange = async () => {
    const isPasswordValid = checkPassword();
    if (isPasswordValid) {
      setLoading(true);

      try {
        const response = await axios.post(
          '/auth/reset',

          {},
          {
            headers: {
              Authorization: `Bearer ${uuid}`,
            },
            params: {
              email: email,
              password: password,
            },
          },
        );

        props.navigation.navigate('passwordConfirm', {email});
      } catch (e) {
        console.log('error', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Fontisto name="email" size={12} />
        <Text>{I18N.t('email')}</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="unlock" size={9} />
        <Text>{I18N.t('password')}</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="unlock" size={9} />
        <Text>{I18N.t('confirmPassword')}</Text>
        <TextInput
          style={styles.inputField}
          secureTextEntry={true}
          onChangeText={text => setConfirmPassword(text)}
        />
      </View>

      <TouchableOpacity
        onPress={() => handleConfirmChange()}
        disabled={loading}>
        <View style={styles.updateButtonContainer}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.updateButton}>{I18N.t('resetPassword')}</Text>
          )}
        </View>
      </TouchableOpacity>
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
  },
});

export default ResetPassword;
