import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Colors from '../utils/Colors';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const DateWrapper = props => {
  const date = new Date(props.date).toLocaleDateString();

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRightColor: Colors.black3,
    borderRightWidth: 0.8,
    height: SCREEN_HEIGHT * 0.09,
    width: SCREEN_WIDTH * 0.18,
    marginTop: 24,
    marginRight: 8,
  },
  date: {
    marginTop: 20,
  },
});
export default DateWrapper;
