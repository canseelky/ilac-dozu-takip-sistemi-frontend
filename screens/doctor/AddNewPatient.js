import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
const AddNewPatient = props => {
  const numberRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patientNotFound, setPatientNotFound] = useState(null);

  const phoneNumberHandler = phoneNumber => {
    setPhoneNumber(phoneNumber);
  };
  const search = async () => {
    Keyboard.dismiss();

    try {
      const res = await axios.get('http://localhost:8080/api/doctor/search', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
        },
        params: {
          phoneNumber,
          doctorid: await AsyncStorage.getItem('userId'),
        },
      });

      if (res.status == 200) {
        props.navigation.navigate('PatientSearchResult', {
          patient: {phoneNumber: phoneNumber, ...res.data},
        });
      }
    } catch (err) {
      setPatientNotFound(true);
      console.log('err', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text>{I18N.t('phone')}</Text>
        <TextInput
          style={styles.searchInput}
          value={phoneNumber}
          maxLength={12}
          keyboardType="number-pad"
          onChangeText={text => phoneNumberHandler(text)}></TextInput>
      </View>

      <TouchableOpacity onPress={() => search()}>
        <View style={styles.searchButton}>
          <Text style={{color: Colors.white}}>{I18N.t('search')} </Text>
        </View>
      </TouchableOpacity>
      <AwesomeAlert
        show={patientNotFound}
        showProgress={false}
        title={I18N.t('patientNotFound')}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText={I18N.t('ok')}
        confirmButtonColor={Colors.primary}
        onConfirmPressed={() => {
          setPhoneNumber('');
          setPatientNotFound(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '40%',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchButton: {
    backgroundColor: Colors.primaryColor,
    width: '25%',
    height: '25%',
    alignItems: 'center',
    marginLeft: '30%',
    marginTop: '20%',
    justifyContent: 'center',
  },
  searchInput: {
    borderColor: Colors.black,
    borderWidth: 1,
    width: '40%',
  },
});
export default AddNewPatient;
