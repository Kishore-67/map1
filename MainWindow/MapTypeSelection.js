// MapTypeSelection.js
import React from 'react';
import { View,StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { styles } from './MapStyles'; // Make sure to import your styles

export const MapTypeSelection = ({ mapType, changeMapType }) => {
  return (
    <View style={styles.mapTypeContainer}>
      <TouchableOpacity onPress={() => changeMapType('standard')}>
        <Ionicons
          name={mapType === 'standard' ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color={mapType === 'standard' ? 'blue' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeMapType('satellite')}>
        <Ionicons
          name={mapType === 'satellite' ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color={mapType === 'satellite' ? 'blue' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeMapType('terrain')}>
        <Ionicons
          name={mapType === 'terrain' ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color={mapType === 'terrain' ? 'blue' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({  
  mapTypeContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'absolute',
  bottom: 16,
  left: 16,
  right: 16,
  backgroundColor: 'white',
  borderRadius: 8,
  padding: 8,
  elevation: 4,
}
});
