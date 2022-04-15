import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, FlatList} from 'react-native';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
import NotificationItem from '../../components/NotificationItem';
import NotificationData from '../../dummyData/notificationData';
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
        '/patient/notifications',

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: id,
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
    <>
      {notifications?.map(notification => (
        <NotificationItem
          type={notification.type}
          date={notification.date}
          content={notification.content}></NotificationItem>
      ))}
    </>
  );
};

Notifications.navigationOptions = {
  title: I18N.t('notifications'),
  headerTintColor: Colors.primaryColor,
};
export default Notifications;
