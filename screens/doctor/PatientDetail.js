import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import I18N from '../../locale/i18n';
import DrugInfo from '../../components/DrugInfo';
import Colors from '../../utils/Colors';

const PatientDetail = props => {
  const user = props.navigation.getParam('user');
  const redirectToAddNewDrug = () => {
    props.navigation.navigate('AddNewDrug', {patientId: user.id});
  };

  const redirectToPatientHistory = () => {
    props.navigation.navigate('PatientHistory', {patientId: user.id});
  };

  return (
    <View>
      <View style={styles.userDetail}>
        <FontAwesome name="user" size={80} style={{marginRight: '10%'}} />
        <Text style={{fontWeight: 'bold'}}>
          {user.name} {user.surname}
        </Text>
      </View>
      <View>
        <Text style={{marginLeft: '30%', marginTop: '10%'}}>
          {I18N.t('monitoringDrug')}
        </Text>
        <ScrollView style={styles.followedDrugs}>
          {user?.drugs?.map((drug, index) => (
            <DrugInfo
              indx={index + 1}
              name={drug.drugName.toUpperCase()}
              id={drug.id}
              patientId={user.id}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={redirectToAddNewDrug}>
          <Text style={{color: Colors.white}}>{I18N.t('addNewDrug')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={redirectToPatientHistory}>
          <Text style={{color: Colors.white}}>{I18N.t('history')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  followedDrugs: {
    width: '60%',
    borderWidth: 1,
    marginLeft: '14%',
    marginTop: '4%',

    marginBottom: '6%',
  },
  buttonContainer: {
    marginLeft: '20%',
  },
  btnStyle: {
    backgroundColor: Colors.primaryColor,
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    margin: '4%',
    justifyContent: 'center',
  },
});
export default PatientDetail;
