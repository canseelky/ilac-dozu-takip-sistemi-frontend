import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import I18N from '../../locale/i18n';
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Intro = props => {
  useEffect(() => {
    async function getToken() {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token !== null) {
          const userAuthority = await AsyncStorage.getItem('authority');
          if (userAuthority == 'patient') {
            props.navigation.navigate('TabBarPatient');
          } else if (userAuthority == 'doctor') {
            props.navigation.navigate('DoctorMainTabBar');
          }
        }
      } catch (e) {
        console.log('error', e);
      }
    }
    getToken();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../../assets/app-logo.png')}
        style={styles.logo}></Image>
      <Text style={styles.headerStyle}>{I18N.t('introHeeader')}</Text>
      <Text style={styles.subtitleStyle}>{I18N.t('introSubheader')}</Text>
      <View style={styles.step}>
        <FontAwesome name="circle" />
        <FontAwesome name="circle-o" />
      </View>
      <View style={styles.redirectContainer}>
        <Text>{I18N.t('introAlreadySubsText')}</Text>
        <TouchableOpacity
          style={{marginLeft: 20}}
          onPress={() => props.navigation.navigate('loginScreen')}>
          <Text style={{color: 'blue'}}>{I18N.t('login')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  logo: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.3,
    resizeMode: 'contain',
  },

  headerStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: SCREEN_HEIGHT * 0.06,
  },
  subtitleStyle: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: SCREEN_HEIGHT * 0.03,
  },
  step: {
    marginTop: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH * 0.09,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  redirectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SCREEN_HEIGHT * 0.03,
  },
});
export default Intro;
