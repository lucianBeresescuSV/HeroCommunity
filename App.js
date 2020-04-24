/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './src/screens/map/MapScreen';
import HelpScreen from './src/screens/HelpScreen';
import CrowdedMap from './src/screens/crowded';
import InitialScreen from './src/screens/InitialScreen';
import AccountScreen from './src/screens/AccountScreen';
import { NeedHelpIcon, AccountIcon, CrowdedIcon, OfferHelpIcon } from './assets/svg/index';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarOptions = {
  labelStyle: {
    fontSize: 13,
  },
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
};

function NeedHelpTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          switch (route.name) {
            case 'Help':
              return <NeedHelpIcon width={25} height={25} />;
            case 'Crowded':
              return <CrowdedIcon width={25} height={25} />;
            case 'Account':
              return <AccountIcon width={25} height={25} />;
            default:
              return null;
          }
        },
      })}
      tabBarOptions={tabBarOptions}
    >
      <Tab.Screen name="Help" component={HelpScreen} />
      <Tab.Screen name="Crowded" component={CrowdedMap} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

function WantToHelpTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          switch (route.name) {
            case 'Map':
              return <OfferHelpIcon width={25} height={25} />;
            case 'Crowded':
              return <CrowdedIcon width={25} height={25} />;
            case 'Account':
              return <AccountIcon width={25} height={25} />;
            default:
              return null;
          }
        },
      })}
      tabBarOptions={{
        labelStyle: {
          fontSize: 15,
        },
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Crowded" component={CrowdedMap} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
const App = () => {
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Initial" component={InitialScreen} />
          <Stack.Screen name="Help" component={NeedHelpTabScreen} />
          <Stack.Screen name="WantToHelp" component={WantToHelpTabScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
