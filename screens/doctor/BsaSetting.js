import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import I18N from '../../locale/i18n';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors';
import FormulaItem from '../../components/FormulaItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BsaSetting = () => {
  const [selectedFormula, setSelectedFormula] = useState('');
  const [formulaList, setFormulaList] = useState([]);

  useEffect(() => {
    async function getFormulas() {
      try {
        const res = await axios.get(
          'http://localhost:8080/api/doctor/formulas',
          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem(
                'accessToken',
              )}`,
            },
          },
        );
        setFormulaList(res.data);
      } catch (err) {
        console.log('err', err);
      }
    }
    getFormulas();
  }, []);

  useEffect(() => {
    async function getSelectedFormula() {
      try {
        const formulaRes = await axios.get(
          'http://localhost:8080/api/doctor/doctor-formula',

          {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem(
                'accessToken',
              )}`,
            },
            params: {
              doctorId: await AsyncStorage.getItem('userId'),
            },
          },
        );
        setSelectedFormula(formulaRes.data);
      } catch (err) {
        console.log('err', err);
      }
    }
    getSelectedFormula();
  }, [selectedFormula]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Ionicons
          name="information-circle"
          color={Colors.primaryColor}
          size={23}
        />

        <Text style={{marginLeft: '2%'}}>{I18N.t('bsaSettinginfo')}</Text>
      </View>
      <View style={styles.optionContainer}>
        {formulaList.map(option => (
          <FormulaItem
            id={option?.id}
            title={option?.name}
            setSelected={setSelectedFormula}
            isSelected={
              option?.id === selectedFormula ? true : false
            }></FormulaItem>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor2,
  },
  optionContainer: {},
});

export default BsaSetting;
