import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from './config';
import { ref, onValue } from 'firebase/database';
import MapViewDirections from 'react-native-maps-directions'; // Import MapViewDirections

export default function Mappage() {
  const [mapType, setMapType] = useState('standard');
  const [markerLocations, setMarkerLocations] = useState([]);
  const [selectedGPS, setSelectedGPS] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

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
    } else {
      setSelectedGPS(gpsKey);
      setShowRoute(true);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 10.817777777777774,
          longitude: 77.01847931145132,
          latitudeDelta: 0.9,
          longitudeDelta: 0.9,
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
        {selectedGPS && markerLocations[selectedGPS] && showRoute && (
          <MapViewDirections
            origin={{
              latitude: parseFloat(markerLocations[selectedGPS].latitude),
              longitude: parseFloat(markerLocations[selectedGPS].longitude),
            }}
            waypoints={Object.values(markerLocations[selectedGPS].Destination).map(stop => ({
              latitude: parseFloat(stop.lat),
              longitude: parseFloat(stop.lon),
            }))}
            destination={{
              latitude: parseFloat(markerLocations[selectedGPS].Destination.stop3.lat),
              longitude: parseFloat(markerLocations[selectedGPS].Destination.stop3.lon),
            }}
            apikey={'AIzaSyDouSDXuZs-C61VHt6eJiIgP4ndfv41pDU'} // Replace with your actual API key
            strokeWidth={4}
            strokeColor="blue"
            mode={"DRIVING"} 
            precision={'high'}
            resetOnChange={false}
            optimizeWaypoints={true}
            // Specify driving mode in uppercase
          />
        )}
        {/* Display marker for each stop */}
        {selectedGPS &&
          markerLocations[selectedGPS] &&
          showRoute &&
          Object.values(markerLocations[selectedGPS].Destination).map((stop, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(stop.lat),
                longitude: parseFloat(stop.lon),
              }}
              pinColor='yellow'
              title={`Stop ${index + 1}`}
            >
              {/* <View style={styles.marker}>
                <Text style={styles.markerText}>{`Stop ${index + 1}`}</Text>
              </View> */}
            </Marker>
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
    elevation: 4,
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




// import React, { useState, useEffect } from 'react';
// import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
// import { StyleSheet, View, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { db } from './config';
// import { ref, onValue } from 'firebase/database';
// import MapViewDirections from 'react-native-maps-directions'; // Import MapViewDirections

// export default function Mappage() {
//   const [mapType, setMapType] = useState('standard');
//   const [markerLocations, setMarkerLocations] = useState([]);
//   const [selectedGPS, setSelectedGPS] = useState(null);
//   const [showRoute, setShowRoute] = useState(false);
//   const [snappedCoordinates, setSnappedCoordinates] = useState([]);

//   useEffect(() => {
//     const starCountRef = ref(db, 'main/');
//     onValue(starCountRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setMarkerLocations(data);
//       }
//     });
//   }, []);

//   const changeMapType = (type) => {
//     setMapType(type);
//   };

//   const handleGPSMarkerPress = (gpsKey) => {
//     if (selectedGPS === gpsKey) {
//       setSelectedGPS(null);
//       setShowRoute(false);
//     } else {
//       setSelectedGPS(gpsKey);
//       setShowRoute(true);
//       fetchSnappedCoordinates(gpsKey);
//     }
//   };

//   const fetchSnappedCoordinates = async (gpsKey) => {
//     const origin = markerLocations[gpsKey];
//     const waypoints = Object.values(origin.Destination).map(stop => `${stop.lat},${stop.lon}`);
//     const destination = `${origin.Destination.stop3.lat},${origin.Destination.stop3.lon}`;
    
//     const coordinates = [
//       `${origin.latitude},${origin.longitude}`,
//       ...waypoints,
//       destination
//     ].join('|');

//     try {
//       const response = await fetch(`https://roads.googleapis.com/v1/snapToRoads?path=${coordinates}&interpolate=true&key=AIzaSyDouSDXuZs-C61VHt6eJiIgP4ndfv41pDU`);
//       const data = await response.json();
//       if (data.snappedPoints) {
//         const snappedCoords = data.snappedPoints.map(point => ({
//           latitude: point.location.latitude,
//           longitude: point.location.longitude,
//         }));
//         setSnappedCoordinates(snappedCoords);
//       }
//     } catch (error) {
//       console.error('Error fetching snapped coordinates:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={{
//           latitude: 10.817777777777774,
//           longitude: 77.01847931145132,
//           latitudeDelta: 0.7,
//           longitudeDelta: 0.7,
//         }}
//         mapType={mapType}
//       >
//         {Object.entries(markerLocations).map(([gpsKey, gpsData]) => (
//           <Marker
//             key={gpsKey}
//             coordinate={{
//               latitude: parseFloat(gpsData.latitude),
//               longitude: parseFloat(gpsData.longitude),
//             }}
//             title={`${gpsKey}`}
//             onPress={() => handleGPSMarkerPress(gpsKey)}
//           />
//         ))}
//         {selectedGPS && showRoute && (
//           <Polyline
//             coordinates={snappedCoordinates}
//             strokeWidth={4}
//             strokeColor="blue"
//           />
//         )}
//         {selectedGPS &&
//           markerLocations[selectedGPS] &&
//           showRoute &&
//           Object.values(markerLocations[selectedGPS].Destination).map((stop, index) => (
//             <Marker
//               key={index}
//               coordinate={{
//                 latitude: parseFloat(stop.lat),
//                 longitude: parseFloat(stop.lon),
//               }}
//               title={`Stop ${index + 1}`}
//             />
//           ))}
//       </MapView>

//       <View style={styles.mapTypeContainer}>
//         <TouchableOpacity onPress={() => changeMapType('standard')}>
//           <Ionicons
//             name={mapType === 'standard' ? 'radio-button-on' : 'radio-button-off'}
//             size={24}
//             color={mapType === 'standard' ? 'blue' : 'black'}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => changeMapType('satellite')}>
//           <Ionicons
//             name={mapType === 'satellite' ? 'radio-button-on' : 'radio-button-off'}
//             size={24}
//             color={mapType === 'satellite' ? 'blue' : 'black'}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => changeMapType('terrain')}>
//           <Ionicons
//             name={mapType === 'terrain' ? 'radio-button-on' : 'radio-button-off'}
//             size={24}
//             color={mapType === 'terrain' ? 'blue' : 'black'}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   mapTypeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 16,
//     left: 16,
//     right: 16,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 8,
//     elevation: 4,
//   },
// });
