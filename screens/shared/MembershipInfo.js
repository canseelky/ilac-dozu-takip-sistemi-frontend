import React from 'react';
import {View, StyleSheet} from 'react-native';
import MemberInfo from '../../components/MemberInfo';
import I18N from '../../locale/i18n';
import {useSelector} from 'react-redux';

const MembershipInfo = () => {
  const email = useSelector(state => state.auth.email);

  const user = {
    name: 'john',
    surname: 'doe',
    dateOfBirth: '01/01/2029',
    gender: 'male',
    phone: '555-1234-234',
    email,
  };
  //info type should be translated with I18N

  return (
    <View style={styles.container}>
      {Object.keys(user).map(userInfo => (
        <MemberInfo infoType={I18N.t(userInfo)} data={user[userInfo]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '6%',
    marginLeft: 0,
  },
});

export default MembershipInfo;
