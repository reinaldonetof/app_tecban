import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Main from '../../../pages/Main';
import Education from '../../../pages/Education';
import Map from '../../../pages/Map';

const Tab = createBottomTabNavigator();

const tabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Conta">
      <Tab.Screen name="Conta" component={Main} />
      <Tab.Screen name="Education" component={Education} />
      <Tab.Screen name="Mapa" component={Map} />
    </Tab.Navigator>
  );
};

export default tabNavigator;
