import React, { useState ,useEffect} from "react";
import { View, TextInput,Image,TouchableWithoutFeedback,Keyboard } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Button } from "react-native-paper";
import axios from "axios";

const Busstop = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [busStops, setBusStops] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleFetchStops = () => {
    Keyboard.dismiss();
    fetchNearbyBusStops(latitude, longitude);
  };

  const mapRef = React.useRef(null);

  const getCurrentLocation = async () => { 
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
   
      setCurrentLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error fetching current location:", error);
    }
  };


  const fetchNearbyBusStops = async (lat, lng) => {
    try {
      const radius =10000;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=bus_station&key=AIzaSyDouSDXuZs-C61VHt6eJiIgP4ndfv41pDU`
      );
      if (response.data && response.data.results) {
        setBusStops(response.data.results);
          mapRef.current.animateToRegion({
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error('Error fetching nearby bus stops:', error);
    }
  };

 

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
        <TextInput
            placeholder="Enter Latitude"
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numeric"
            style={{ margin: 10, padding: 10, borderWidth: 1 }}
        />
        <TextInput
            placeholder="Enter Longitude"
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numeric"
            style={{ margin: 10, padding: 10, borderWidth: 1 }}
        />
        <Button mode="contained" onPress={handleFetchStops}>
            Fetch Nearby Bus Stops
        </Button>
        <MapView
            ref={mapRef} 
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
            latitude: parseFloat(11.386429157302963) || 0,
            longitude: parseFloat (77.76795282943844) || 0,
            latitudeDelta: 4.7,
            longitudeDelta: 4.7,
            }}
        >
            {currentLocation && (
            <Marker
                coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                }}
                title="Current Location"
                description="You are here"
            >
                <Image source={require('./image/busstop.png')} style={{ width: 37, height: 30 }} />
            </Marker>
            )}

            {busStops.map((stop, index) => (
            <Marker
                key={index}
                coordinate={{
                latitude: stop.geometry.location.lat,
                longitude: stop.geometry.location.lng,
                }}
                title={stop.name}
            >
                <Image source={require('./image/busstop.png')} style={{ width: 37, height: 30 }}/>
            </Marker>
            ))}
        </MapView>
        </View>
    </TouchableWithoutFeedback>
  );
};

export default Busstop;