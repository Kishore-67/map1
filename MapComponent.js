import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from './config';
import { ref, onValue } from 'firebase/database';

export default function Mappage() {
  const [mapType, setMapType] = useState('standard');
  const [markerLocations, setMarkerLocations] = useState([]);
  const [selectedGPS, setSelectedGPS] = useState(null);

  useEffect(() => {
    const starCountRef = ref(db, 'main/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMarkerLocations(data);
      }
    });
  }, []);

  const changeMapType = (type) => {
    setMapType(type);
  };

  const handleGPSMarkerPress = (gpsKey) => {
    setSelectedGPS(gpsKey);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 10.817777777777774,
          longitude: 77.01847931145132,
          latitudeDelta: 0.7,
          longitudeDelta: 0.7,
        }}
        mapType={mapType}
      >
        {Object.entries(markerLocations).map(([gpsKey, gpsData]) => (
          <React.Fragment key={gpsKey}>
            <Marker
              coordinate={{
                latitude: parseFloat(gpsData.latitude),
                longitude: parseFloat(gpsData.longitude),
              }}
              title={`GPS ${gpsKey}`}
              onPress={() => handleGPSMarkerPress(gpsKey)}
            />
            {selectedGPS === gpsKey && gpsData.Destination && Object.keys(gpsData.Destination).length > 0 && (
              <>
                <Polyline
                  coordinates={[
                    { latitude: parseFloat(gpsData.latitude), longitude: parseFloat(gpsData.longitude) },
                    { latitude: parseFloat(gpsData.Destination.stop1.lat), longitude: parseFloat(gpsData.Destination.stop1.lon) },
                    { latitude: parseFloat(gpsData.Destination.stop2.lat), longitude: parseFloat(gpsData.Destination.stop2.lon) },
                    { latitude: parseFloat(gpsData.Destination.stop3.lat), longitude: parseFloat(gpsData.Destination.stop3.lon) },
                  ]}
                  strokeWidth={4}
                  strokeColor="blue"
                  geodesic={true}
                  lineDashPattern={[5]}
                />
                {Object.entries(gpsData.Destination).map(([stopKey, stopData], index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: parseFloat(stopData.lat),
                      longitude: parseFloat(stopData.lon),
                    }}
                    title={`Stop ${index + 1}`}
                    // Add a custom icon for temporary markers
                    icon={() => (
                      <Ionicons
                        name="ios-pin"
                        size={24}
                        color="red"
                      />
                    )}
                  />
                ))}
              </>
            )}
          </React.Fragment>
        ))}
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
}

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
    elevation: 4,
  },
});
