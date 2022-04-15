import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SettingsItemContainer = ({iconName, title, subtitle, iconClass}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {iconClass === 'ionicons' ? (
          <Ionicons name={iconName} size={40} />
        ) : (
          <FontAwesomeIcon name={iconName} size={40} />
        )}
      </View>
      <View>
        <Text>{title}</Text>
        <Text style={{marginTop: 10}}>{subtitle}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.1,
    marginLeft: '2%',
    marginTop: 30,
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: 20,
    marginLeft: 8,
    marginRight: 30,
  },
});
export default SettingsItemContainer;
