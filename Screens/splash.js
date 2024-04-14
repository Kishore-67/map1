//Splash Screen
import { View, Text, StyleSheet,navigation,navigate } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
const Splash = ({navigation}) => {
    useEffect(()=>
{
    setTimeout(()=>{
        navigation.navigate('HomeScreen')}, 2500);
},[]);
 
  return (
    
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
        <LottieView style={{width: 300,height: 300}}
        source={require("./busanimate2.json")}
        autoPlay
        loop
        />
      <Animatable.Text style={{color:"black",fontSize:36,fontWeight:800}} duration={2000} animation="fadeInUp">BUS TRACKER</Animatable.Text>
    </View>
  )
}

export default Splash;
