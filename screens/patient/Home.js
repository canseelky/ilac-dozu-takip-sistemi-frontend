import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Manuel from '../../components/Manuel';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import Bluetooth from '../../components/Bluetooth';
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
import I18N from '../../locale/i18n';
import axios from '../../config/@axios';
import {useSelector} from 'react-redux';
const Home = props => {
  const [isManual, setIsManual] = useState(true);

  const userId = useSelector(state => state.auth.userId);
  const accessToken = useSelector(state => state.auth.jwt);
  const handleUpdate = async (weight, height) => {
    axios
      .put(
        `/patient/data`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            weight: weight || 0,
            height: height || 0,
            patientId: userId,
          },
        },
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.enterTypeContainer}>
        <TouchableOpacity
          onPress={() => setIsManual(true)}
          style={isManual && styles.active}
          disabled={isManual ? true : false}>
          <View style={styles.choice}>
            <Icon
              name="hand-o-up"
              size={20}
              color={isManual ? Colors.white : Colors.black}
              style={styles.iconStyle}></Icon>
            <Text style={{color: isManual ? Colors.white : Colors.black}}>
              Manuel
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={!isManual && styles.active}
          onPress={() => {
            setIsManual(!setIsManual);
          }}>
          <View style={styles.choice}>
            <Icon
              name="bluetooth"
              size={20}
              color={isManual ? Colors.black : Colors.white}
              style={styles.iconStyle}></Icon>
            <Text style={{color: !isManual ? Colors.white : Colors.black}}>
              Bluetooth
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {isManual ? (
        <Manuel handleUpdate={handleUpdate} />
      ) : (
        <Bluetooth handleUpdate={handleUpdate} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  choice: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT * 0.06,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 8,
    borderColor: Colors.black,
  },
  enterTypeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: '30%',
    paddingHorizontal: 24,
    height: '100%',
  },
  bg: {
    backgroundColor: 'red',
  },
  active: {
    backgroundColor: Colors.lightBlue,
    color: Colors.white,
  },
  iconStyle: {
    marginRight: 18,
  },
});

export default Home;
