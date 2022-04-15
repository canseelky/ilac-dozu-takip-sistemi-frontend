import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Colors from '../utils/Colors';
import I18N from '../locale/i18n';
const Tag = ({tag}) => {
  return (
    <View style={styles.tagContainer}>
      <View style={styles.tag}>
        <Text style={styles.tagText}>
          {tag == 2 ? I18N.t('DDD') : I18N.t('narrowTherapeutic')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: Colors.primaryColor2,
    height: 30,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginRight: 10,
  },
  tagText: {
    color: Colors.white,
  },
});

export default Tag;
