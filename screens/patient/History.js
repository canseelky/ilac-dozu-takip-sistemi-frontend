import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import HistoryWrapper from '../../components/HistoryWrapper';
import I18N from '../../locale/i18n';
import Colors from '../../utils/Colors';
import {useSelector} from 'react-redux';
import axios from '../../config/@axios';

const History = props => {
  const token = useSelector(state => state.auth.jwt);
  const uuid = useSelector(state => state.auth.userId);
  const [history, setHistory] = useState([]);

  const renderData = itemData => {
    return <HistoryWrapper historyObj={itemData.item}></HistoryWrapper>;
  };
  useEffect(() => {
    async function getHistory() {
      try {
        const response = await axios.get(`/history/patientHistory`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            patientId: uuid,
          },
        });
        setHistory(response.data);
      } catch (e) {
        console.log('error', e);
      }
    }
    getHistory();
  }, []);
  return (
    <FlatList
      data={history}
      renderItem={renderData}
      keyExtractor={item => item.id}></FlatList>
  );
};

export default History;

History.navigationOptions = {
  title: I18N.t('history'),
  headerTintColor: Colors.primaryColor,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
