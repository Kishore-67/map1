import { Text, View } from 'react-native';
//import FetchData from './src';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Home from './src/Bottom/temp2';
import Map from './src/Bottom/Map';
import Profile from './src/stack/Profile';


const Tab = createMaterialBottomTabNavigator();
const  Stack = createStackNavigator();


function TabNavigator(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={StackNavigator} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  )
}
function StackNavigator() {
  return(
    <Stack.Navigator>
      <Stack.Screen name='HOME' component={Home}/>
      <Stack.Screen name='Profile' component={Profile}/>
    </Stack.Navigator>
  )
  }


  const Main = () => {
    const navigation = navigation();
  
    return (
      <View style={styles.container}>
        <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
        <Text>Home</Text>
      </View>
    );
  }
  
  
  export default function App() {
    return (
     

      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>



    )
  }

