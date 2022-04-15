import React, {useState, useEffect} from 'react';
import {Text, Switch, View, StyleSheet} from 'react-native';
import I18N from '../../locale/i18n';
import axios from '../../config/@axios';
import {useSelector} from 'react-redux';
const SharePointPermission = props => {
  const dr = props.navigation.getParam('drInfo');
  const drNotification = props.navigation.getParam('dr');
  const [doctor, setDoctor] = useState(null);
  const [isEnabled, setIsEnabled] = useState(doctor?.isApproved);
  const id = useSelector(state => state.auth.userId);
  const jwt = useSelector(state => state.auth.jwt);

  useEffect(() => {
    async function getDoctor() {
      axios
        .get(`/patient/getDoctor`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: {
            id: dr?.id || drNotification,
          },
        })
        .then(res => {
          setDoctor(res.data);
        })
        .catch(err => {});
    }
    getDoctor();
  }, []);

  async function changePermission() {
    setIsEnabled(previousState => !previousState);
    let uri = !isEnabled ? 'remove' : 'share';

    try {
      const response = await axios.put(`/patient/permission/${uri}`, null, {
        params: {
          patientId: id,
          doctorId: dr?.id || drNotification,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.info}>
          Dr. {doctor?.name} {doctor?.surname}
        </Text>
        <Text style={styles.info}>{doctor?.hospital}</Text>
        <Text style={styles.info}>{doctor?.branch}</Text>
      </View>
      <View style={styles.accessContainer}>
        <Text>{I18N.t('dataAccess')}</Text>
        <View styles={{marginLeft: '30%'}}>
          <Switch
            trackColor={{false: '#767577', true: 'green'}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => changePermission()}
            value={!isEnabled}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    marginLeft: '6%',
  },
  info: {
    margin: 10,
  },
  accessContainer: {
    display: 'flex',
    margin: 10,
    flexDirection: 'row',
  },
});

export default SharePointPermission;
