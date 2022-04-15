import {createStackNavigator} from 'react-navigation-stack';
import History from '../../screens/patient/History';
import HistoryDetail from '../../screens/patient/HistoryDetail';
import Colors from '../../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18N from '../../locale/i18n';
const HistoryStack = createStackNavigator({
  History: {
    screen: History,
    navigationOptions: {
      headerTitle: I18N.t('history'),
    },
  },
  Detail: {
    screen: HistoryDetail,
    navigationOptions: {
      headerTitle: I18N.t('history'),
    },
  },
});

export default HistoryStack;
