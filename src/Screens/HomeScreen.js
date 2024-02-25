// screens/HomeScreen.js

import React from 'react';
import { View, Text, Button,StyleSheet,TouchableOpacity,textColor } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToMappage = () => {
    navigation.navigate('Mappage');
  };
  const navigateToScreen3 = () => {
    navigation.navigate('Screen3');
  };
  

  return (
  
      <View style={styles.container}>

        <Button  title="MAP" onPress={navigateToMappage}/>
      
    

      <Button  title="Go to Screen3" onPress={navigateToScreen3}  />
      </View>
      
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent:'center',
    alignItems: 'center',
   
    fontSize: 5,
  },
  Button:{
    shape:"rounded-pill",
    backgroundColor:"white",
  },
 
});

