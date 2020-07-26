import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../../pages/Login';
import Qrcode from '../../pages/Qrcode';
import TabNavigator from './tabNavigator';
import Welcome from '../../pages/Welcome';

const Stack = createStackNavigator();

const stacks = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Qrcode" component={Qrcode} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export default stacks;
