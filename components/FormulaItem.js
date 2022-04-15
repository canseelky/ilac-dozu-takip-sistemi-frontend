import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../utils/Colors';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Snackbar} from 'react-native-paper';
import I18N from '../locale/i18n';

const FormulaItem = ({title, isSelected, id, setSelected}) => {
  const [isError, setIsError] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const changeFormula = async id => {
    axios
      .put('http://localhost:8080/api/doctor/setFormula', null, {
        params: {
          doctorId: await AsyncStorage.getItem('userId'),
          formulaId: id,
        },
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
        },
      })
      .then(res => {
        setSelected(id);
        setIsUpdated(true);
        <Snackbar
          visible={isUpdated}
          action={{
            label: I18N.t('ok'),
            onPress: () => {
              setIsUpdated(false);
            },
          }}>
          {I18N.t('formulaUpdatedSuccessfully')}
        </Snackbar>;
      })
      .catch(err => {
        <Snackbar
          visible={isError}
          action={{
            label: I18N.t('ok'),
            onPress: () => {
              setIsError(false);
            },
          }}>
          {I18N.t('formulaUpdateError')}
        </Snackbar>;
      });
  };
  return (
    <TouchableOpacity onPress={() => changeFormula(id)}>
      <View style={styles.container}>
        <Text>{title}</Text>
        {isSelected && <Entypo name="check" color={Colors.green} size={20} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '5%',
    borderBottomWidth: 0.2,
    borderBottomColor: Colors.black3,
    height: 60,
    width: '90%',
  },
});
export default FormulaItem;
