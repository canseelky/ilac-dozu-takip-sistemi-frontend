import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from '../../config/@axios';
import {useSelector} from 'react-redux';
const SharePoint = props => {
  const id = useSelector(state => state.auth.userId);
  const accessToken = useSelector(state => state.auth.jwt);
  const [doctors, setDoctors] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    async function getDoctors() {
      setIsLoading(true);
      try {
        const response = await axios.get('/patient/getDoctors', {
          params: {
            id: id,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setDoctors(response.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    getDoctors();
  }, []);

  const navigateSharePointPermissions = drInfo => {
    props.navigation.navigate('SharePointPermission', {drInfo});
  };

  return (
    <View style={styles.container}>
      {doctors.map(request => (
        <TouchableOpacity
          onPress={navigateSharePointPermissions.bind(null, request)}>
          <View style={styles.drInfo}>
            <View style={{marginBottom: 10}}>
              <Fontisto name="doctor" size={60} />
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: 40,
              }}>
              <Text>Dr. {request?.name + ' '}</Text>
              <Text>{request?.surname}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: '10%'},
  drInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    width: '80%',

    marginLeft: 30,
  },
});
export default SharePoint;
