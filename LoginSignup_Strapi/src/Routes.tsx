import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PagesTypes} from './types/routes';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';

const RootStack = createNativeStackNavigator();

const defaultScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
};

export default function Routes() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={PagesTypes.Loading}>
        <RootStack.Group>
          <RootStack.Screen name={PagesTypes.Loading} component={LoadingPage} options={defaultScreenOptions} />
          <RootStack.Screen name={PagesTypes.Login} component={LoginPage} options={defaultScreenOptions} />
          <RootStack.Screen name={PagesTypes.Register} component={RegisterPage} />
          <RootStack.Screen name={PagesTypes.Home} component={HomePage} options={defaultScreenOptions} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
