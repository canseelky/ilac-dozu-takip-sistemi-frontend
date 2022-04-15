import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../utils/Colors';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
import I18N from '../../locale/i18n';
import FOIcon from 'react-native-vector-icons/Foundation';
import axios from 'axios';
import {Picker, PickerIOS} from '@react-native-picker/picker';
import cities from '../../utils/city';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AwesomeAlert from 'react-native-awesome-alerts';

const Register = props => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [hospital, setHospital] = useState('0');
  const [hospitals, setHospitals] = useState([]);
  const [isRegisteredSuccess, setIsRegisteredSuccess] = useState(null);

  const redirectToLogin = () => {
    props.navigation.navigate('Login');
  };
  useEffect(() => {
    async function getHospitalLists() {
      try {
        const res = await axios.get('http://localhost:8080/api/hospital/all');

        setHospitals(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getHospitalLists();
  }, []);

  useEffect(() => {}, [hospital]);

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/auth/doctor-register',
        {
          name,
          surname,
          email,
          password,
          city,
          hospital,
        },
      );
      res.status === 201 && setIsRegisteredSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.maincontainer}>
      <Icon name="doctor" size={80} style={styles.avatar} />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <FAIcon name="user-circle-o" size={20} />
          <Text>{I18N.t('name')}</Text>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => setName(text)}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <FAIcon name="user-circle-o" size={20} />
          <Text>{I18N.t('surname')}</Text>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => setSurname(text)}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <FOIcon name="mail" size={20} />
          <Text>{I18N.t('email')}</Text>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => setEmail(text)}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <FAIcon name="lock" size={20} />
          <Text>{I18N.t('password')}</Text>
          <TextInput
            secureTextEntry
            style={styles.textInputStyle}
            onChangeText={pass => setPassword(pass)}></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="location-on" size={30} />
          <Text style={styles.textStyle}>{I18N.t('location')}</Text>
          <Picker
            selectedValue={city}
            style={{
              borderStyle: 'solid',
              justifyContent: 'center',
              height: 40,
              borderColor: Colors.black,
              width: SCREEN_WIDTH * 0.5,
            }}
            value={'Select'}
            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
            {cities.map(city => (
              <Picker.Item label={city} value={city} />
            ))}
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="location-on" size={30} />
          <Text style={styles.textStyle}>{I18N.t('hospital')}</Text>
          <Picker
            selectedValue={city}
            style={{
              borderStyle: 'solid',
              borderColor: Colors.black,
              width: SCREEN_WIDTH * 0.5,
            }}
            value="Select"
            onValueChange={(itemValue, itemIndex) => setHospital(itemValue)}>
            {hospitals &&
              hospitals?.map(h => (
                <Picker.Item label={h?.city + ' ' + h?.name} value={h?.name} />
              ))}
          </Picker>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleRegister()}
        style={styles.btnStyle}>
        <View style={styles.button}>
          <Text style={{color: Colors.white}}>{I18N.t('register')}</Text>
        </View>
      </TouchableOpacity>
      <AwesomeAlert
        show={isRegisteredSuccess}
        showProgress={false}
        title={I18N.t('registerSuccess')}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText={I18N.t('ok')}
        confirmButtonColor={Colors.primaryColor}
        onConfirmPressed={() => {
          setIsRegisteredSuccess(false);
          redirectToLogin();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Colors.white,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  container: {
    marginLeft: 50,
    marginTop: 20,
    marginRight: 40,
  },
  avatar: {
    marginLeft: SCREEN_WIDTH * 0.35,
    marginTop: '8%',
  },
  textInputStyle: {
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_HEIGHT * 0.05,
    borderColor: Colors.black,
    borderWidth: 1,
  },
  inputContainer: {
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputContainer2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 0,
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
});

export default Register;
