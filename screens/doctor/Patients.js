import React, {useState, createRef, useRef, useEffect} from 'react';
import {FlatList, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useDebouncedCallback} from 'use-debounce';
import PatinetInfo from '../../components/PatinetInfo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {fetchMyPatients} from '../../store/slices/MyPatientsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Searchbar} from 'react-native-paper';

const Patients = props => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermInputRef = useRef('');
  const textInputRef = useRef({});
  const dispatch = useDispatch();
  const redirectToPatientDetail = user => {
    props.navigation.navigate('PatientDetail', {user: user});
  };

  const [patients, setPatients] = useState([]);
  const [patientList, setPatientList] = useState([]);

  const debouncedInputHandler = useDebouncedCallback(event => {
    setSearchTerm(event.target.value);
    //dispatch(getSearchResult(searchTerm));
  }, 2000);
  const listOfPatients = useSelector(state => state.myPatientsSlice.patients);

  useEffect(() => {
    const filteredPatients = listOfPatients.filter(user => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    searchTerm.length == 0
      ? setPatientList(patients)
      : setPatientList(filteredPatients);
  }, [searchTerm]);

  const handleFilter = term => {
    setSearchTerm(term);
  };

  useEffect(() => {
    async function getPatientsData() {
      const accessToken = await AsyncStorage.getItem('accessToken');

      try {
        const response = await axios.get(
          'http://localhost:8080/api/doctor/patients',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              doctorid: await AsyncStorage.getItem('userId'),
            },
          },
        );

        setPatients(response.data);
        setPatientList(response.data);
      } catch (error) {
        console.log('err', error);
      }
    }
    getPatientsData();
  }, []);

  const renderPatients = itemData => {
    {
      return (
        <TouchableOpacity
          onPress={redirectToPatientDetail.bind(null, itemData.item)}>
          <PatinetInfo
            name={itemData.item.name}
            surname={itemData.item.surname}
          />
        </TouchableOpacity>
      );
    }
  };
  return (
    <View>
      <View
        style={{
          marginTop: 20,
        }}>
        <Searchbar
          placeholder="Search"
          onChangeText={c => handleFilter(c)}
          value={searchTerm}
          style={{
            borderRadius: 40,
            borderColor: 'black',
            marginTop: 30,
            marginBottom: 3,
            width: '90%',
            marginLeft: '5%',
            borderWidth: 1,
          }}
        />
      </View>
      <FlatList data={patientList} renderItem={renderPatients}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginLeft: '10%',
    borderWidth: 1,
    marginTop: '10%',
    marginBottom: '10%',
  },
  inputS: {},
});

export default Patients;
