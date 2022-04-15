import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
import NotificationItem from '../../components/NotificationItem';
import API from '../../config/@axios';
import {useSelector} from 'react-redux';
const Notifications = props => {
  const onPress = notification => {
    props.navigation.navigate('NotificationDetail', {
      notification,
    });
  };

  const id = useSelector(state => state.auth.userId);
  const token = useSelector(state => state.auth.jwt);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function getData() {
      API.get(
        '/doctor/notifications',

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            doctorId: id,
          },
        },
      )
        .then(res => {
          setNotifications(res.data);
        })
        .catch(err => {
          console.log('ress', err);
        });
    }
    getData();
  }, []);

  return (
    <ScrollView>
      {notifications?.map(notification => (
        <NotificationItem
          type={notification.type}
          date={notification.date}
          content={notification.content}></NotificationItem>
      ))}
    </ScrollView>
  );
};

Notifications.navigationOptions = {
  title: I18N.t('notifications'),
  headerTintColor: Colors.primaryColor,
};
export default Notifications;
