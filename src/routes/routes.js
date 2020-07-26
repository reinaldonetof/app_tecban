import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RouteStack from './stacks';

export default function RoutesApp() {
  return (
    <NavigationContainer>
      <RouteStack />
    </NavigationContainer>
  );
}
