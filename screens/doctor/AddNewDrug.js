import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import NumericInput from 'react-native-numeric-input';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
//import useDebouncedInput from '../../hooks/useDebouncedInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../config/@axios';
import {SearchBar} from 'react-native-elements';
import {Snackbar} from 'react-native-paper';
const SCREEN_HEIGHT = Dimensions.get('screen').height;
import Tag from '../../components/Tag';

const AddNewDrug = props => {
  const [drugs, setDrugs] = useState([]);
  const [drugName, setDrugName] = useState('');
  const [baseDose, setBaseDose] = useState('');
  const [updateFreq, setUpdateFreq] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  //const {searchTerm, setSearchTerm, debouncedInputHandler} =
  //useDebouncedInput();
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [drugOptions, setDrugOptions] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [isError, setIsError] = useState(false);

  const patientId = props.navigation.getParam('patientId');

  const addNewDrug = async () => {
    const drugData = {
      drugid: selectedDrug.id,
      updateFreq: updateFreq,
      baseDose: baseDose,
      doctorid: await AsyncStorage.getItem('userId'),
      patientid: patientId,
    };

    API.post(
      '/doctor/drug/addDrugToPatient',
      {},
      {
        params: {...drugData},
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
        },
      },
    )
      .then(res => {
        setSelectedDrug(null);
        setDrugName('');
        setIsAdded(true);
        setBaseDose('');
        setUpdateFreq('');
      })
      .catch(err => {
        setIsError(true);
        setBaseDose('');
        setUpdateFreq('');
      });
  };

  useEffect(() => {
    async function search() {
      try {
        const data = await axios({
          method: 'GET',
          url: 'http://localhost:8080/api/doctor/drug/search',
          params: {
            term: searchTerm,
          },
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem(
              'accessToken',
            )}`,
          },
        });
        setDrugOptions(data.data);
        drugOptions.forEach(item =>
          setDrugs([
            {id: item.id, name: item.drugName, category: item.category},
          ]),
        );
      } catch (err) {
        console.log(err);
      }
    }
    searchTerm && search();
  }, [searchTerm]);
  const renderSeparator = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          width: '90%',
          marginBottom: 10,
          justifyContent: 'center',
          borderRadius: 4,
          borderColor: 'black',
          borderWidth: 0.3,
        }}
      />
    );
  };
  const onDrugSelect = drug => {
    setSelectedDrug(drug);
    setDrugOptions([]);
    setSearchTerm('');
  };

  return (
    <View style={styles.container}>
      <View>
        <SearchBar
          placeholder="Search"
          lightTheme={true}
          onClear={() => {
            setSearchTerm('');
            setDrugOptions([]);
          }}
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
          containerStyle={{
            borderRadius: 40,
            backgroundColor: 'white',
            color: 'white',
            width: '90%',
            marginLeft: '5%',
            marginTop: '2%',
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
          }}
        />
      </View>
      <View style={{height: SCREEN_HEIGHT}}>
        {drugOptions.length > 0 && searchTerm.length > 0 && (
          <FlatList
            style={{
              flex: 1,
              padding: 25,
              width: '90%',
              marginLeft: '5%',
              height: SCREEN_HEIGHT * 0.6,
              backgroundColor: Colors.gray2,
            }}
            data={drugOptions}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={item => item.id}
            renderItem={({item, index, separators}) => (
              <TouchableOpacity
                key={item.key}
                style={{
                  marginTop: 4,
                  height: 50,
                  backgroundColor: Colors.white,
                  display: 'flex',
                  justifyContent: 'center',
                }}
                onPress={() => onDrugSelect(item)}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 16}}>
                    {item?.drugName}
                    {' (' + item?.activeIngredient + ')' ||
                      'No Active Ingredient'}
                  </Text>
                  <Tag tag={item.category} />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        {searchTerm.length <= 0 && (
          <>
            <View style={styles.baseDoseContainer}>
              <Text>{I18N.t('baseDose')}</Text>

              <View style={{marginLeft: '30%'}}>
                <NumericInput
                  type="up-down"
                  minValue={0}
                  onChange={value => setBaseDose(value)}
                  rounded
                  totalWidth={100}
                  totalHeight={40}
                />
              </View>
            </View>
            <View style={styles.frequencyContainer}>
              <Text>{I18N.t('dataUpdateFreq')}</Text>

              <View style={{marginLeft: '10%'}}>
                <NumericInput
                  type="up-down"
                  minValue={0}
                  onChange={value => setUpdateFreq(value)}
                  rounded
                  totalWidth={100}
                  totalHeight={40}
                />
              </View>
            </View>

            <View style={{marginLeft: '30%', marginTop: '10%'}}>
              <TouchableOpacity style={styles.addBtn} onPress={addNewDrug}>
                <Text style={{color: Colors.white}}>{I18N.t('add')}</Text>
              </TouchableOpacity>
            </View>
            {selectedDrug != null && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '5%',
                  justifyContent: 'center',
                }}>
                <Text>
                  {I18N.t('selectedDrug')}:{selectedDrug.drugName}
                </Text>
                <View style={{width: '70%', marginLeft: '4%'}}>
                  <Tag tag={selectedDrug?.category} />
                </View>
              </View>
            )}
            <View
              style={{
                justifyContent: 'space-between',
                marginTop: SCREEN_HEIGHT * 0.5,
              }}>
              <Snackbar
                theme={{colors: {accent: Colors.white}}}
                style={styles.snackbarStyle}
                visible={isError}
                onDismiss={() => console.log('Dismiss Pressed')}
                action={{
                  label: I18N.t('ok'),
                  onPress: () => setIsError(false),
                }}>
                {I18N.t('drugAddedError')}
              </Snackbar>
              <Snackbar
                theme={{colors: {accent: Colors.white}}}
                visible={isAdded}
                style={styles.snackbarStyle}
                onDismiss={() => console.log('Dismiss Pressed')}
                action={{
                  label: I18N.t('ok'),
                  onPress: () => setIsAdded(false),
                }}>
                {I18N.t('addNewDrugSuccess')}
              </Snackbar>
            </View>
          </>
        )}
      </View>
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
  container: {
    height: SCREEN_HEIGHT,
  },
  frequencyContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '2%',
    alignItems: 'center',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    backgroundColor: Colors.primaryColor,
  },
  baseDoseContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    alignItems: 'center',
    marginLeft: '2%',
    marginTop: '3%',
  },
  snackbarStyle: {
    backgroundColor: Colors.primaryColor2,
    color: Colors.white,
  },
});
export default AddNewDrug;
