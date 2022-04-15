import React from 'react';
import {Text} from 'react-native';
const Detail = props => {
  const historyItem = props.navigation.getParam('historyObj');

  return <Text>Detail</Text>;
};

export default Detail;
