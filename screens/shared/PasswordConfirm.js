import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Snackbar} from 'react-native-paper';
import axios from '../../config/@axios';
import {useSelector} from 'react-redux';
const PasswordConfirm = props => {
  const [firstDigit, setFirstDigit] = useState('');
  const [secondDigit, setSecondDigit] = useState('');
  const [thirdDigit, setThirdDigit] = useState('');
  const [fourthDigit, setFourthDigit] = useState('');
  const secondDigRef = useRef();
  const thirdDigRef = useRef();
  const fourthDigRef = useRef();
  const email = props.navigation.getParam('email');
  const [isError, setIsError] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const token = useSelector(state => state.auth.token);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const handleConfirm = async () => {
    const code = firstDigit + secondDigit + thirdDigit + fourthDigit;

    try {
      const res = await axios.post('/auth/checkVerificationCode', {
        email,
        code,
      });
      setIsPasswordChanged(true);
      setTimeout(() => {
        setIsPasswordChanged(false);
        props.navigation.navigate('Login');
      }, 4000);
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{I18N.t('confirmResetPasswordCode')}</Text>
      <View style={styles.tokenContainer}>
        <TextInput
          style={styles.ınputContainer}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={text => {
            setFirstDigit(text);
          }}></TextInput>

        <TextInput
          style={styles.ınputContainer}
          maxLength={1}
          disabled={isError}
          keyboardType="numeric"
          onChangeText={text => {
            setSecondDigit(text);
          }}></TextInput>

        <TextInput
          style={styles.ınputContainer}
          maxLength={1}
          disabled={isError}
          keyboardType="numeric"
          onChangeText={text => {
            setThirdDigit(text);
          }}></TextInput>

        <TextInput
          style={styles.ınputContainer}
          maxLength={1}
          disabled={isError}
          keyboardType="numeric"
          onChangeText={text => setFourthDigit(text)}></TextInput>
      </View>

      <TouchableOpacity onPress={() => handleConfirm()}>
        <View style={styles.confirmButton}>
          <Text style={styles.text}>{I18N.t('confirm')}</Text>
        </View>
      </TouchableOpacity>
      <Snackbar
        style={{backgroundColor: Colors.primary, color: 'white', marginTop: 10}}
        visible={visible}
        onDismiss={() => setVisible(false)}
        wrapperStyle={{backgroundColor: Colors.primaryColor}}
        action={{
          label: I18N.t('ok'),
        }}>
        {isError
          ? I18N.t('errorPasswordReset')
          : I18N.t('passwordResetSuccess')}
      </Snackbar>
      <AwesomeAlert
        show={isPasswordChanged}
        showProgress={false}
        title={I18N.t('passwordResetSuccess')}
        showCancelButton={false}
        showConfirmButton={false}
      />
      <AwesomeAlert
        show={isError}
        showProgress={false}
        title={I18N.t('errorResetPassword')}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText={I18N.t('ok')}
        onConfirmPressed={() => {
          setIsError(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '8%',
  },
  ınputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '10%',
    height: '80%',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: '5%',
    fontSize: 26,
  },
  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'black',
    marginTop: '5%',
  },
  confirmButton: {
    marginTop: '30%',
    backgroundColor: Colors.primaryColor,
    width: '40%',
    height: '20%',
    marginLeft: '25%',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
  },
});

export default PasswordConfirm;
