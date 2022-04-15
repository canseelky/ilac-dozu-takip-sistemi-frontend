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
import {Picker} from '@react-native-picker/picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import I18N from '../../../locale/i18n';
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
import Colors from '../../../utils/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import cities from '../../../utils/city';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Step2 = props => {
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);

  const step1Data = props.navigation?.getParam('step1Data');
  const step2Data = {
    ...step1Data,
    gender,
    date,
    city,
    height,
    weight,
  };
  const handleNextStep = () => {
    props.navigation.navigate('Step3', {step2Data: step2Data});
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
            <Fontisto name="date" size={30} />
            <Text style={styles.textStyle}>{I18N.t('dateOfBirth')}</Text>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={styles.datePicker}>
              <Text style={styles.datePickerText}>
                {date.getDate() +
                  '/' +
                  date.getMonth() +
                  1 +
                  '/' +
                  date.getFullYear()}
              </Text>
            </TouchableOpacity>
          </View>
          {open && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setDate(selectedDate);
                setOpen(false);
              }}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="user-circle" size={30} />
          <Text style={styles.textStyle}>{I18N.t('gender')}</Text>
          {
            <Picker
              selectedValue={gender}
              style={{
                borderWidth: 30,
                borderStyle: 'solid',
                borderColor: Colors.black,

                width: SCREEN_WIDTH * 0.3,
              }}
              value={'Select'}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
              <Picker.Item label="Select" value="Select" />
              <Picker.Item label={I18N.t('woman')} value="woman" />
              <Picker.Item label={I18N.t('man')} value="js" />
            </Picker>
          }
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="location-on" size={30} />
          <Text style={styles.textStyle}>{I18N.t('location')}</Text>
          {
            <Picker
              selectedValue={city}
              style={{
                borderWidth: 30,
                borderStyle: 'solid',
                borderColor: Colors.black,

                width: SCREEN_WIDTH * 0.3,
              }}
              value={'Select'}
              onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
              {cities.map(city => (
                <Picker.Item label={city} value={city} />
              ))}
            </Picker>
          }
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome5 name="weight" size={30} />
          <Text style={styles.textStyle}>{I18N.t('weight')}(kg)</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.textInputStyle}
            value={weight}
            onChangeText={txt => setWeight(txt)}
            keyboardAppearance="dark"></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="human-male-height-variant" size={30} />
          <Text style={styles.textStyle}>{I18N.t('height')}(cm)</Text>
          <TextInput
            style={styles.textInputStyle}
            color={Colors.black}
            size={600}
            keyboardType="numeric"
            value={height}
            onChangeText={txt => setHeight(txt)}
            keyboardAppearance="dark"></TextInput>
        </View>

        <View style={styles.btnStyle}>
          <TouchableOpacity onPress={() => handleNextStep()}>
            <Text style={styles.btnText}>{I18N.t('continue')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: SCREEN_HEIGHT,
  },
  logoContainer: {
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
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT * 0.04,
    borderRadius: 2,
  },
  btnStyle: {
    backgroundColor: Colors.primaryColor,
    width: SCREEN_WIDTH * 0.2,
    height: SCREEN_HEIGHT * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SCREEN_WIDTH * 0.38,
    borderRadius: 8,
    marginTop: SCREEN_HEIGHT * 0.001,
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
  datePicker: {
    borderRadius: 3,
    borderColor: Colors.black,
    borderStyle: 'solid',
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_HEIGHT * 0.04,
  },
});

export default Step2;
