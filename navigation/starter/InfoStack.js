import Intro from '../../screens/starter/Intro';
import Starter from '../../screens/starter/Starter';

import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
const starterStack = createMaterialTopTabNavigator(
  {
    Intro: {screen: Intro},
    Starter: {screen: Starter},
  },
  {
    initialRouteName: 'Intro',

    tabBarOptions: {
      tabStyle: {height: 0},
      style: {backgroundColor: 'transparent'},
      indicatorStyle: {backgroundColor: 'transparent'},
    },
  },
);

const InfoStack = createAppContainer(starterStack);

export default InfoStack;
