import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../utils/Colors';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const PatinetInfo = ({name, surname}) => {
  return (
    <View style={styles.container}>
      <FontAwesome name="user" size={20} />
      <Text style={{marginLeft: '4%'}}>
        {name} {surname}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.05,
    marginLeft: '4%',
    marginRight: '4%',
    marginTop: '1%',
    marginBottom: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.black3,
    borderBottomWidth: 0.4,
  },
});
export default PatinetInfo;
