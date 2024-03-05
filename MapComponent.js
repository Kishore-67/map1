import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from './config';
import { ref, onValue } from 'firebase/database';
import MapViewDirections from 'react-native-maps-directions';
import SlidingUpPanel from "rn-sliding-up-panel";

const { height } = Dimensions.get("window");

const StopMarker = ({ coordinate, title, index }) => (
  <Marker
    coordinate={coordinate}
    title={title}
    pinColor='green'
  />
);

export default function Mappage() {
  const [mapType, setMapType] = useState('standard');
  const [markerLocations, setMarkerLocations] = useState([]);
  const [selectedGPS, setSelectedGPS] = useState(null);
  const [showRoute, setShowRoute] = useState(false);
  const [showSlidingWindow, setShowSlidingWindow] = useState(false);
  const [stopDistances, setStopDistances] = useState([]);
  const _draggedValue = new Animated.Value(180);

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

  const handleGPSMarkerPress = async (gpsKey) => {
    if (selectedGPS === gpsKey) {
      setSelectedGPS(null);
      setShowRoute(false);
      setShowSlidingWindow(false);
      setStopDistances([]);
    } else {
      setSelectedGPS(gpsKey);
      setShowRoute(true);
      setShowSlidingWindow(true);
      await calculateDistances(gpsKey);
    }
  };

  const calculateDistances = async (gpsKey) => {
    const selectedGPSData = markerLocations[gpsKey];
    const waypoints = Object.values(selectedGPSData.Destination).map(stop => ({
      latitude: parseFloat(stop.lat),
      longitude: parseFloat(stop.lon),
    }));

    const distances = [];
    for (let i = 0; i < waypoints.length - 1; i++) {
      const start = waypoints[i];
      const end = waypoints[i + 1];
      const directions = await getDirections(start, end, []);

      if (directions) {
        distances.push({
          stopIndex: i + 1,
          name: `Stop ${i + 1}`,
          distance: directions.distance.toFixed(2),
          duration: formatDuration(directions.duration),
        });
      }
    }

    setStopDistances(distances);
  };

  const getDirections = async (origin, destination, waypoints) => {
    const apiKey = 'AIzaSyDouSDXuZs-C61VHt6eJiIgP4ndfv41pDU';
    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&waypoints=${waypoints
      .map((waypoint) => `${waypoint.latitude},${waypoint.longitude}`)
      .join('|')}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'OK' && data.routes.length > 0) {
        const route = data.routes[0];
        const distance = route.legs.reduce((acc, leg) => acc + leg.distance.value, 0);
        const duration = route.legs.reduce((acc, leg) => acc + leg.duration.value, 0);

        return {
          distance: distance / 1000, // Convert meters to kilometers
          duration: duration / 3600, // Convert seconds to hours
        };
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }

    return null;
  };

  const formatDuration = (duration) => {
    const hours = Math.floor(duration);
    const minutes = Math.floor((duration % 1) * 60);

    if (hours > 0 && minutes > 0) {
      return `${hours} hour ${minutes} minutes`;
    } else if (hours > 0) {
      return `${hours} hour`;
    } else {
      return `${minutes} minutes`;
    }
  };

  const BottomSheet = ({ visible, onClose, stopDistances }) => {
    const backgoundOpacity = _draggedValue.interpolate({
      inputRange: [height - 48, height],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    const iconTranslateY = _draggedValue.interpolate({
      inputRange: [height - 56, height, height + 180 - 64],
      outputRange: [0, 56, 180 - 32],
      extrapolate: "clamp"
    });

    const textTranslateY = _draggedValue.interpolate({
      inputRange: [height + 180 - 64, height + 180],
      outputRange: [0, 8],
      extrapolate: "clamp"
    });

    const textTranslateX = _draggedValue.interpolate({
      inputRange: [height + 180 - 64, height + 180],
      outputRange: [0, -112],
      extrapolate: "clamp"
    });

    const textScale = _draggedValue.interpolate({
      inputRange: [height + 180 - 64, height + 180],
      outputRange: [1, 0.7],
      extrapolate: "clamp"
    });

    return (
      <SlidingUpPanel
        ref={c => (this._panel = c)}
        draggableRange={{ top: height + 180 - 64, bottom: 180 }}
        animatedValue={_draggedValue}
        snappingPoints={[360]}
        height={height + 180}
        friction={0.5}
        visible={visible}
      >
        <View style={styles.panel}>
          <Animated.View
            style={[
              styles.iconBg,
              {
                opacity: backgoundOpacity,
                transform: [{ translateY: iconTranslateY }]
              }
            ]}
          />
          <View style={styles.panelHeader}>
            <Animated.View
              style={{
                transform: [
                  { translateY: textTranslateY },
                  { translateX: textTranslateX },
                  { scale: textScale }
                ]
              }}
            >
              <Text style={styles.textHeader}>Sliding Up Panel</Text>
            </Animated.View>
          </View>
          <View style={styles.container}>
            {stopDistances.map((stop, index) => (
              <View key={index} style={styles.stepDetail}>
                <Text>{stop.name}</Text>
                <Text>Distance: {stop.distance} km</Text>
                <Text>Duration: {stop.duration}</Text>
              </View>
            ))}
          </View>
        </View>
      </SlidingUpPanel

>
    );
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
            title={gpsKey}
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

      <BottomSheet
        visible={showSlidingWindow}
        onClose={() => setShowSlidingWindow(false)}
        stopDistances={stopDistances}
      />

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
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative"
  },
  panelHeader: {
    height: 180,
    backgroundColor: "#b197fc",
    justifyContent: "flex-end",
    padding: 24
  },
  textHeader: {
    fontSize: 28,
    color: "#FFF"
  },
  iconBg: {
    backgroundColor: "#2b8a3e",
    position: "absolute",
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    zIndex: 1
  },
  stepDetail: {
    marginBottom: 10,
  },
});


