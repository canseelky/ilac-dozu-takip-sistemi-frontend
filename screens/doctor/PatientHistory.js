import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import I18N from '../../locale/i18n';
import {fetchHistory} from '../../store/slices/HistorySlice';
import {useDispatch, useSelector} from 'react-redux';
import HistoryWrapper from '../../components/HistoryWrapper';
const PatientHistory = props => {
  const dispatch = useDispatch();
  const patientId = props.navigation.getParam('patientId');
  const [history, setHistory] = useState([]);
  const historyData = useSelector(state => state.history.history);
  const isLoading = useSelector(state => state.history.isLoading);

  useEffect(() => {
    async function getData() {
      await dispatch(fetchHistory(patientId));
    }
    getData();
  }, [dispatch]);

  return (
    <>
      {isLoading && <Text>Loading...</Text>}
      {historyData?.map(data => (
        <HistoryWrapper historyObj={data}></HistoryWrapper>
      ))}
    </>
  );
};

export default PatientHistory;
