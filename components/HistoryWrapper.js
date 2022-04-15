import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Colors from '../utils/Colors';
import DateWrapper from './DateWrapper';
import I18N from '../locale/i18n';
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const HistoryWrapper = props => {
  return (
    <View style={styles.container}>
      <DateWrapper date={props.historyObj?.date} />
      <View>
        <Text style={styles.title}>{props.historyObj?.drugName}</Text>
        <View style={styles.dataContainer}>
          <Text style={styles.subTitle}>{I18N.t('dose')}</Text>
          <Text
            style={{
              ...{marginLeft: '46%'},
              ...styles.histData,
            }}>
            {Number(props.historyObj.dose).toFixed(2)}
          </Text>
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.subTitle}>{I18N.t('bodySurfaceArea')}</Text>
          <Text style={{...styles.histData, ...{marginLeft: 20}}}>
            {Number(props.historyObj?.bsa).toFixed(2)}
          </Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.subTitle}>{I18N.t('doctor')}</Text>
          <Text
            style={{
              ...{marginLeft: 80},
              ...styles.histData,
            }}>
            {props.historyObj?.doctorFullName}
          </Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.subTitle}>{I18N.t('hospital')}</Text>
          <Text style={{...{marginLeft: 90}, ...styles.histData}}>
            {props.historyObj?.hospital}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: Colors.black3,
    borderBottomWidth: 0.4,
    height: SCREEN_HEIGHT * 0.2,
    margin: 10,
  },
  drugName: {
    display: 'flex',
    color: Colors.black,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.black2,
    marginBottom: SCREEN_HEIGHT * 0.002,
    marginTop: SCREEN_HEIGHT * 0.001,
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: SCREEN_HEIGHT * 0.02,
  },
  subTitle: {
    color: Colors.gray,
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: '8%',
  },
  histData: {
    color: Colors.primaryColor,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default HistoryWrapper;
