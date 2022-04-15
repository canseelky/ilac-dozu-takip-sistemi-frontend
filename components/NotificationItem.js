import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import NotificationIcon from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import DoctorIcon from 'react-native-vector-icons/Fontisto';
import Colors from '../utils/Colors';
import I18N from '../locale/i18n';
//props should return the notifiy type add new doctor or data enter
const NotificationItem = props => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (props.type == 'NEWDOCTOR') {
      props.content.split('-');
      setContent(props.content + ': ' + I18N.t('newDoctor'));
    }
    if (props.type == 'DRUG_ADDED') {
      props.content.split('-');
      setContent(
        props.content.split('-')[0] +
          I18N.t('newDrug') +
          ': ' +
          props.content.split('-')[1],
      );
    }
    if (props.type == 'NEWDOSE') {
      let title = props.content
        ? props.content?.split('-')[0] +
          I18N.t('user') +
          ' ' +
          props.content?.split('-')[1] +
          I18N.t('newDosageCalculated') +
          ' ' +
          props.content?.split('-')[2].slice(0, 4) +
          ' mg'
        : '';
      setContent(title);
    }

    if (props.type == 'UPDATE_DATA') {
      props.content?.split('-');
      setContent(props.content?.split('-')[0] + I18N.t('updateNotification'));
    }
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          {props.type === 'NEWDOCTOR' ? (
            <Icon name={'add-user'} size={24} />
          ) : (
            <NotificationIcon name={'notifications'} size={24} />
          )}
        </View>
        <View>
          <Text>{content}</Text>
          <Text>{props.date}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderBottomColor: Colors.black3,
    borderBottomWidth: 2,
  },
  iconContainer: {
    borderColor: Colors.black,
    display: 'flex',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
});
export default NotificationItem;
