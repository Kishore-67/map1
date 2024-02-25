import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const Map = () => {
  return (
    <View style={styles.container}>
      <Text>map</Text>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems: 'center',

    
  },
});