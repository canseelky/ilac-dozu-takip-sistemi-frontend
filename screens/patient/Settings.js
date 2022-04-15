import React from 'react';

import SettingsItemContainer from '../../components/SettingsItemContainer';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const Settings = props => {
  const settingOptions = [
    {
      iconName: 'document-text',
      title: I18N.t('membershipInfoTitle'),
      subtitle: I18N.t('membershipInfoSubtitle'),
      iconClass: 'ionicons',
      to: 'MembershipInfo',
    },
    {
      iconName: 'key-outline',
      title: I18N.t('ResetPasswordtitle'),
      iconClass: 'ionicons',
      subtitle: I18N.t('ResetPasswordsubTitle'),
      to: 'ResetPassword',
    },
    {
      iconName: 'language-outline',
      title: I18N.t('languageSettings'),
      subtitle: I18N.t('languageSettingSubtitle'),
      iconClass: 'ionicons',
      to: 'LanguageSettings',
    },

    {
      iconName: 'balance-scale',
      title: I18N.t('userAgreement'),
      subtitle: I18N.t('privacytermsSubtitle'),
      to: 'UserAgreement',
    },
    {
      iconName: 'shield-checkmark-outline',
      title: I18N.t('privacyterms'),
      subtitle: I18N.t('privacytermsSubtitle'),
      iconClass: 'ionicons',
      to: 'PrivacyConstraint',
    },
  ];

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('userAuthority');
      props.navigation.navigate('loginScreen');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{I18N.t('settings')}</Text>
      {settingOptions.map(settingOption => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate(settingOption.to)}>
          <SettingsItemContainer
            title={settingOption.title}
            subtitle={settingOption.subtitle}
            iconName={settingOption.iconName}
            iconClass={settingOption.iconClass}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => handleLogOut()}>
        <Text style={{color: Colors.white}}> {I18N.t('logout')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Settings;

Settings.navigationOptions = {
  headerShown: false,
};

// <Button title={I18N.t('logout')}></Button>; //
const styles = StyleSheet.create({
  container: {marginTop: SCREEN_HEIGHT * 0.1, marginLeft: SCREEN_WIDTH * 0.038},
  header: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: SCREEN_WIDTH * 0.36,
  },

  buttonContainer: {
    backgroundColor: Colors.primaryColor2,
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.04,
    marginTop: '4%',
    marginLeft: SCREEN_WIDTH * 0.1,
    borderRadius: 10,
    marginBottom: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
