// screens/HomeScreen.js

import React from 'react';
import { View, Text, Button,StyleSheet,TouchableOpacity,textColor } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToMapScreen = () => {
    navigation.navigate('MapScreen');
  };
  const navigateToScreen3 = () => {
    navigation.navigate('Screen3');
  };
  const navigateToBusstand = ()=>{
    navigation.navigate('Busstand');
  };
  

  return (
  
      
      <>
     
      <View style={styles.container}>
      <Text style={styles.Title}>Explore the App Here!</Text>

      <View style={styles.container1}>
        <TouchableOpacity  onPress={navigateToMapScreen} style={styles.button}>
            <Text style={styles.Text}> MAP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToScreen3} style={styles.button}>
            <Text style={styles.Text}>Screen3</Text>
        </TouchableOpacity>  
        <TouchableOpacity onPress={navigateToBusstand} style={styles.button}>
            <Text style={styles.Text}>Busstand</Text>
        </TouchableOpacity>  
        </View>
     </View>
</>
      
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
    alignItems: 'center',
    fontSize: 3,
  },
  container1: {
    flex: 1,
    marginTop:190,
    backgroundColor: 'white',
    
    alignItems: 'center',
    fontSize: 3,
  },
  

  button:{
    backgroundColor: 'black',
    margin:10,
    paddingVertical:5,
    paddingHorizontal:9,
    borderRadius:10,
  },
  Text :{
    color:'white',
    fontSize:20,
  },
  Title:{
   
    marginTop:50,
    color:'black',
    fontSize:20,
    justifyContent:'center',
    textAlign:'center',
    backgroundColor:'white',
}

 
});

