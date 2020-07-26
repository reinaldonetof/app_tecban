import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Main from '../../../pages/Main';
import Education from '../../../pages/Education';
import Map from '../../../pages/Map';

const Tab = createBottomTabNavigator();

const tabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Education"
      tabBarOptions={{activeTintColor: '#006666', showLabel: false}}>
      <Tab.Screen
        name="Conta"
        component={Main}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicon name="cash-outline" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Education"
        component={Education}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcon name="school" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={Map}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicon name="location-outline" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default tabNavigator;
