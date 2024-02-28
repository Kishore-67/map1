import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from './config';
import { ref, onValue } from 'firebase/database';
import MapViewDirections from 'react-native-maps-directions';

const StopMarker = ({ coordinate, title, index }) => (
  <Marker
    coordinate={coordinate}
    title={title}
    pinColor='green'
  >
    {/* <View style={styles.marker}>
      <Text style={styles.markerText}>{`Stop ${index}`}</Text>
    </View> */}
  </Marker>
);

export default function Mappage() {
  const [mapType, setMapType] = useState('standard');
  const [markerLocations, setMarkerLocations] = useState([]);
  const [selectedGPS, setSelectedGPS] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [showSlidingWindow, setShowSlidingWindow] = useState(false);

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
    if (selectedGPS === gpsKey) {
      setSelectedGPS(null);
      setShowRoute(false);
      setShowSlidingWindow(false); // Hide sliding window when GPS marker is deselected
    } else {
      setSelectedGPS(gpsKey);
      setShowRoute(true);
      setShowSlidingWindow(true); // Show sliding window when GPS marker is selected
    }
  };

  const toggleSlidingWindow = () => {
    setShowSlidingWindow(!showSlidingWindow);
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
          <Marker
            key={gpsKey}
            coordinate={{
              latitude: parseFloat(gpsData.latitude),
              longitude: parseFloat(gpsData.longitude),
            }}
            title={`${gpsKey}`}
            onPress={() => handleGPSMarkerPress(gpsKey)}
          />
        ))}
        {selectedGPS &&
          markerLocations[selectedGPS] &&
          showRoute &&
          Object.values(markerLocations[selectedGPS].Destination).map((stop, index) => (
            <StopMarker
              key={index}
              coordinate={{
                latitude: parseFloat(stop.lat),
                longitude: parseFloat(stop.lon),
              }}
              title={`Stop ${index + 1}`}
              // index={index + 1}
              
            />
          ))}
        {selectedGPS && markerLocations[selectedGPS] && showRoute && (
          <MapViewDirections
            origin={{
              latitude: parseFloat(markerLocations[selectedGPS].Destination.stop1.lat),
              longitude: parseFloat(markerLocations[selectedGPS].Destination.stop1.lon),
            }}
            waypoints={Object.values(markerLocations[selectedGPS].Destination).map(stop => ({
              latitude: parseFloat(stop.lat),
              longitude: parseFloat(stop.lon),
            }))}
            destination={{
              latitude: parseFloat(Object.values(markerLocations[selectedGPS].Destination)[Object.values(markerLocations[selectedGPS].Destination).length - 1].lat),
              longitude: parseFloat(Object.values(markerLocations[selectedGPS].Destination)[Object.values(markerLocations[selectedGPS].Destination).length - 1].lon),
            }}
            apikey={'AIzaSyDouSDXuZs-C61VHt6eJiIgP4ndfv41pDU'}
            strokeWidth={4}
            strokeColor="blue"
            mode={"DRIVING"} 
            precision={'high'}
            resetOnChange={false}
            optimizeWaypoints={true}
          />
        )}
      </MapView>

      {showSlidingWindow && (
  <View style={styles.slidingWindow}>
    <TouchableOpacity onPress={toggleSlidingWindow} style={styles.exitButton}>
      <Ionicons name="close-circle" size={24} color="black" />
    </TouchableOpacity>
    <Text style={styles.slidingWindowText}>This is the sliding window content.</Text>
    {/* Add your custom content here */}
  </View>
)}

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
    elevation: 4,
  },
  slidingWindow: {
    position: 'absolute',
    bottom: 6,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 35,
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    borderBottomLeftRadius:23,
    borderBottomRightRadius:23,
  },
  slidingWindowText: {
    fontSize: 20, // Adjust font size to increase size
    fontWeight: 'bold',
    marginBottom: 200, // Adjust margin bottom for spacing
  },
  exitButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  marker: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 5,
    borderRadius: 5,
  },
  markerText: {
    fontWeight: 'bold',
},
});
