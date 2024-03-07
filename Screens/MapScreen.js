// screens/AnotherScreen.js

import React from 'react';
import {  Text } from 'react-native';
import MapView, { Marker ,PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View ,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Mappage from '../MainWindow/MapComponent';

export default function MapScreen() {

return(
  <View style={{flex:1}}>
    <Mappage/>
    </View>
   );
};