import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import I18N from '../../locale/i18n';
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
const Starter = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{I18N.t('intro2title')}</Text>
      <Text style={styles.subtitleStyle}>{I18N.t('intro2subtitle')}</Text>
      <View style={styles.step}>
        <FontAwesome name="circle-o" />
        <FontAwesome name="circle" />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.signUpBtnContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('signUpPatient')}>
            <View style={styles.btnStyle}>
              <Text style={styles.btnText}>
                {I18N.t('signup') + ' / ' + I18N.t('patient')}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('signUpDoctor')}>
            <View style={styles.btnStyle}>
              <Text style={styles.btnText}>
                {I18N.t('signup') + ' / ' + I18N.t('doctor')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('doctorScreen')}>
          <View style={styles.btnStyle}>
            <Text style={styles.btnText}>{I18N.t('login')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  subtitleStyle: {
    fontSize: 16,
    marginTop: SCREEN_HEIGHT * 0.01,
  },
  step: {
    marginLeft: SCREEN_WIDTH * 0.45,
    marginTop: SCREEN_HEIGHT * 0.6,
    width: SCREEN_WIDTH * 0.06,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'space-around',
  },
  btnStyle: {
    backgroundColor: Colors.primaryColor,
    marginTop: SCREEN_HEIGHT * 0.02,
    justifyContent: 'center',
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: SCREEN_WIDTH * 0.4,
  },
  btnText: {
    textAlign: 'center',
    color: Colors.white,
  },
  signUpBtnContainer: {
    display: 'flex',
    height: '50%',
  },
});

export default Starter;
