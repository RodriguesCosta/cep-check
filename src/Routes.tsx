import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from './pages/Home';
import Mapa from './pages/Mapa';

const RouteStack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <RouteStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RouteStack.Screen name="Home" component={Home} />
        <RouteStack.Screen name="Mapa" component={Mapa} />
      </RouteStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
