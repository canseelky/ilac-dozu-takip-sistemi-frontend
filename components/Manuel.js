import React, {useState, useRef} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import I18N from '../locale/i18n';
import Colors from '../utils/Colors';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const Manuel = ({handleUpdate}) => {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [updating, setUpdating] = useState(false);

  const updateHandler = () => {
    setUpdating(true);
    handleUpdate(weight, height);

    setTimeout(() => {
      setUpdating(false);
      setWeight('');
      setHeight('');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text>{I18N.t('weight')}</Text>
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          value={weight}
          onChangeText={txt => setWeight(txt)}
          keyboardAppearance="dark"></TextInput>
      </View>
      <View style={styles.inputWrapper}>
        <Text>{I18N.t('height')}</Text>
        <TextInput
          style={styles.inputField}
          color={Colors.black}
          size={600}
          keyboardType="numeric"
          value={height}
          onChangeText={txt => setHeight(txt)}
          keyboardAppearance="dark"></TextInput>
      </View>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={updateHandler}
        disabled={updating}>
        {!updating ? (
          <Text style={styles.text}> {I18N.t('update')}</Text>
        ) : (
          <ActivityIndicator color={Colors.white} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '20%',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
  },
  inputField: {
    borderColor: Colors.black,
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.3,
    height:
      Platform.OS === 'android' ? SCREEN_HEIGHT * 0.045 : SCREEN_HEIGHT * 0.03,
    marginTop: 10,
  },
  buttonStyle: {
    display: 'flex',
    backgroundColor: Colors.primaryColor2,
    color: Colors.white,
    marginTop: 80,
    width: SCREEN_WIDTH * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: 30,
    marginLeft: SCREEN_WIDTH * 0.2,
  },
  text: {
    color: Colors.white,
  },
});

export default Manuel;
