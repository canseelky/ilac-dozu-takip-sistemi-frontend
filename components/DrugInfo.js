import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Snackbar} from 'react-native-paper';
import I18N from '../locale/i18n';
const DrugInfo = ({name, dose, indx, id, patientId}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const removeDrugFromPatient = async id => {
    axios
      .delete(`http://localhost:8080/api/doctor/drug/removeDrug`, {
        params: {
          patientid: patientId,
          drugid: id,
        },
        headers: {
          Authorization:
            'Bearer ' + (await AsyncStorage.getItem('accessToken')),
        },
      })
      .then(res => {
        setIsDeleted(true);
        <Snackbar
          visible={isDeleted}
          action={{
            label: I18N.t('ok'),
            onPress: () => {
              setIsDeleted(false);
            },
          }}>
          {I18N.t('drugDeletedSuccess')}
        </Snackbar>;
      })
      .catch(err => {
        setIsError(true);
        <Snackbar
          visible={isError}
          action={{
            label: I18N.t('ok'),
            onPress: () => {
              setIsError(false);
            },
          }}>
          {I18N.t('drugDeletedError')}
        </Snackbar>;
      });
  };

  return (
    <View style={styles.container}>
      <Text>
        {indx + '-'} {''}
        {name}
      </Text>
      <Text>{dose}</Text>
      <TouchableOpacity onPress={() => removeDrugFromPatient(id)}>
        <FontAwesome name="remove" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default DrugInfo;
