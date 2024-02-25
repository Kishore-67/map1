// screens/AnotherScreen.js

import React from 'react';
import {  Text } from 'react-native';
import MapView, { Marker ,PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View ,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';



export default function Mappage() {

  const [mapType, setMapType] = React.useState('standard');

  const changeMapType = (type) => {
    setMapType(type);
  };
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 10.817971101909635,
          longitude: 77.01847931145132,
          latitudeDelta: 0.7,
          longitudeDelta: 0.7,
        }}
        mapType={
          mapType === 'standard'
            ? 'standard'
            : mapType === 'satellite'
            ? 'satellite'
            : 'terrain'
        }
        
        
      >
         <Marker
          coordinate={{ latitude: 10.828679877363305, longitude:  77.06056944149961 }}
          title="Current location"
          description="Marker 1"
        />

      </MapView>
    
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
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
    elevation:4,
},
})




// const Mappage = () => {
//   return (
//     <View>
//       <Text>Another Screen</Text>
//     </View>
//   );
// };

// export default Mappage;
