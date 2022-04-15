import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsItemContainer from '../../components/SettingsItemContainer';
const Settings = props => {
  const handleRedirect = path => {
    props.navigation.navigate(path);
  };

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userAuthority');
      await AsyncStorage.removItem('accessToken');
    } catch (e) {
      console.log(e);
    } finally {
      props.navigation.navigate('loginScreen');
    }
  };

  const settingItems = [
    {
      title: I18N.t('membershipInfoTitle'),
      subtitle: I18N.t('membershipInfoSubtitle'),
      to: 'MembershipInfo',
      iconName: 'document-text-outline',
      iconClass: 'ionicons',
      id: Math.random().toString(36),
    },
    {
      iconName: 'key-outline',
      title: I18N.t('ResetPasswordtitle'),
      iconClass: 'ionicons',
      subtitle: I18N.t('ResetPasswordsubTitle'),
      to: 'ResetPassword',
      id: Math.random().toString(36),
    },
    {
      iconName: 'pencil-square-o',
      title: I18N.t('bsaFormula'),
      iconClass: '',
      subtitle: I18N.t('bsaFormulaSubtitle'),
      to: 'BsaSetting',
      id: Math.random().toString(36),
    },
    {
      iconName: 'language-outline',
      title: I18N.t('languageSettings'),
      subtitle: I18N.t('languageSettingSubtitle'),
      iconClass: 'ionicons',
      to: 'LanguageSetting',
      id: Math.random().toString(36),
    },

    {
      iconName: 'balance-scale',
      title: I18N.t('userAgreement'),
      subtitle: I18N.t('privacytermsSubtitle'),
      to: 'UserAgreement',
      id: Math.random().toString(36),
    },
  ];

  return (
    <View style={styles.container}>
      {settingItems.map(item => (
        <View>
          <TouchableOpacity
            onPress={handleRedirect.bind(null, item.to)}
            key={item.id}>
            <SettingsItemContainer
              title={item.title}
              iconName={item.iconName}
              subtitle={item.subtitle}
              iconClass={item?.iconClass}
            />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.logOutbtn} onPress={() => handleLogOut()}>
        <Text style={{color: Colors.white}}> {I18N.t('logout')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logOutbtn: {
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
export default Settings;
