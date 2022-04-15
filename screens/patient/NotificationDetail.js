import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import DoctorIcon from 'react-native-vector-icons/Fontisto';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
import Colors from '../../utils/Colors';
import I18N from '../../locale/i18n';
const NotificationDetail = props => {
  const notification = props.navigation.getParam('notification');
  const acceptRequest = () => {};
  const rejectRequest = () => {};

  return (
    <View style={styles.mainContainer}>
      <DoctorIcon name="doctor" size={50} style={styles.icon}></DoctorIcon>
      <View>
        <Text style={styles.textStyle}>{notification.doctor.name}</Text>
        <Text style={styles.textStyle}> {notification.doctor.hospital}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={acceptRequest}>
            <Text style={styles.btnTitle}>{I18N.t('request.accept')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonStyle}>
          <TouchableOpacity onPress={rejectRequest}>
            <Text style={styles.btnTitle}>{I18N.t('request.reject')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  icon: {
    marginTop: '50%',
    marginLeft: '40%',
  },
  textStyle: {
    marginLeft: SCREEN_WIDTH * 0.3,
    marginTop: SCREEN_HEIGHT * 0.04,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonStyle: {
    display: 'flex',
    backgroundColor: Colors.primaryColor,
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT * 0.03,
    justifyContent: 'center',
  },
  btnTitle: {
    textAlign: 'center',
    color: Colors.white,
  },
});
export default NotificationDetail;

NotificationDetail.navigationOptions = {
  headerTitle: null,
  headerTintColor: Colors.primaryColor,
  headerBackTitleVisible: false,
};
