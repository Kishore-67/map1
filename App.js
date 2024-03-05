
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen'; // Replace with the actual path
import MapScreen from './Screens/MapScreen'; // Replace with the actual path
import BottomSheet from './Screens/Screen3';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="Screen3" component={BottomSheet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// nothings

export default App;
