import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../../pages/Login';
import Qrcode from '../../pages/Qrcode';
import TabNavigator from './tabNavigator';
import Welcome from '../../pages/Welcome';
import Wallet from '../../pages/Wallet';

const Stack = createStackNavigator();

const stacks = () => {
  return (
    <Stack.Navigator
      initialRouteName="TabNavigator"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="Qrcode" component={Qrcode} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Wallet" component={Wallet} />
    </Stack.Navigator>
  );
};

export default stacks;
