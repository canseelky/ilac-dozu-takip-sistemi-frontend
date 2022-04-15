import AsyncStorage from '@react-native-community/async-storage';
const useLogout = async props => {
  try {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userAuthority');
    props.navigation.navigate('loginScreen');
  } catch (e) {
    console.log(e);
  }
};
