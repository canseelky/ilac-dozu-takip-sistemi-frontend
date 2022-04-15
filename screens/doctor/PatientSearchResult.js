import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import I18N from '../../locale/i18n';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PatientSearchResult = props => {
  const user = props.navigation.getParam('patient');
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestSend, setIsRequestSend] = useState(false);
  const [dob, setDob] = useState('');

  useEffect(() => {
    if (user?.dob) {
      let dobOfUser = new Date(user?.dob).toLocaleDateString();

      let day = dobOfUser.split('.')[0];
      let year = dobOfUser.split('.')[2]?.toString().substring(2) + '**';
      let month = '**';
      setDob(`${day}/${month}/${year}`);
    }
  }, []);

  const sendRequest = async () => {
    setIsLoading(true);
    axios
      .get('http://10.0.2.2:8080/api/doctor/request', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
        },
        params: {
          patientid: user.id,
          doctorid: await AsyncStorage.getItem('userId'),
        },
      })
      .then(res => {
        setIsRequestSend(true);
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.phoneNumberContainer}>{user.phoneNumber}</Text>
      <FontAwesome name="user" size={60} />

      <Text style={styles.userInfo}>
        {user?.name} {user?.surname}
      </Text>

      <Text style={styles.userInfo}>{dob}</Text>
      {/*<Text style={styles.userInfo}>{user?.city}</Text> */}
      {user.alreadyAdded ? (
        <View style={styles.warning}>
          <Text style={styles.textStyle}>{I18N.t('patientAlreadyAdded')}</Text>
        </View>
      ) : (
        <View style={styles.btn}>
          <TouchableOpacity
            onPress={() => sendRequest()}
            disabled={isRequestSend}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.textStyle}>{I18N.t('AddNewPatient')}</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  iconStyle: {},
  phoneNumberContainer: {
    borderColor: Colors.black,
    borderWidth: 1,
    marginTop: 40,
    marginBottom: 80,
    fontWeight: 'bold',
    fontSize: 18,
  },
  userInfo: {
    marginTop: 30,
  },
  btn: {
    display: 'flex',
    height: '10%',
    width: '20%',
    backgroundColor: Colors.primaryColor,
    color: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  warning: {
    display: 'flex',
    height: '10%',
    backgroundColor: Colors.primaryColor,
    color: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  textStyle: {
    color: Colors.white,
    marginLeft: '10%',
    marginRight: '10%',
  },
});
export default PatientSearchResult;
