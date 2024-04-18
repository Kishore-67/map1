
// App.js
import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen'; // Replace with the actual path
import MapScreen from './Screens/MapScreen'; // Replace with the actual path
import BottomSheet from './Screens/Screen3';
import Busstand from './Screens/Busstand';
import BusTimings from './Screens/BusTimings';
import Splash from './Screens/splash';
import Busstop from './Screens/Busstop';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" >
       <Stack.Screen name="SplashScreen" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="Screen3" component={BottomSheet} />
        <Stack.Screen name="Busstand" component={Busstand}/>
        <Stack.Screen name="BusTimings" component={BusTimings}/>
        <Stack.Screen name="Busstop" component={Busstop}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
};

// nothings

export default App;
