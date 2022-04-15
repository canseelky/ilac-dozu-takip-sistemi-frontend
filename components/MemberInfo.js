import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Colors from '../utils/Colors';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const MemberInfo = ({infoType, data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoTypeContainer}>{infoType}</Text>
      <Text style={styles.dataContainer}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: Colors.black3,
    borderBottomWidth: 0.3,
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.7,
    marginLeft: SCREEN_WIDTH * 0.06,
    marginTop: SCREEN_WIDTH * 0.02,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoTypeContainer: {
    color: Colors.black,
    fontWeight: 'bold',
    marginRight: '30%',
    marginBottom: '2%',
  },
  dataContainer: {
    color: Colors.primaryColor2,
    marginBottom: '2%',
    marginRight: '4%',
  },
});

export default MemberInfo;
