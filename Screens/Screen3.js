import React, { useState, useEffect, useRef } from 'react';
import StepIndicator from 'react-native-step-indicator';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepIndicatorOpen, setIsStepIndicatorOpen] = useState(true);
  const gpsCoordinatesRef = useRef({
    latitude: 10.983078974048661, 
    longitude: 76.96157895267486
  });

  const stops = [
    { label: 'Station A', latitude: 11.00263030326227, longitude: 76.96159983679122 },
    { label: 'Station B', latitude: 10.983078974048661, longitude: 76.96157895267486 },
    { label: 'Station C', latitude: 10.904693126991116, longitude: 76.99734119727543 },
    { label: 'Station D', latitude: 10.817520695612044, longitude: 77.017875587379 },
  ];

  const handleGpsMarkerMove = (coordinates) => {
    gpsCoordinatesRef.current = coordinates;

    // Check the proximity of the GPS marker to each stop
    const closestStopIndex = stops.findIndex((stop) => {
      return (
        coordinates.latitude >= stop.latitude &&
        coordinates.latitude <= stop.latitude + 0.005 && // Adjust proximity range as needed
        coordinates.longitude >= stop.longitude &&
        coordinates.longitude <= stop.longitude + 0.005
      );
    });

    if (closestStopIndex !== -1 && closestStopIndex !== currentStep) {
      setCurrentStep(closestStopIndex);
    }
  };

  useEffect(() => {
    // Simulate continuous GPS updates
    const gpsUpdateInterval = setInterval(() => {
      // Update the GPS marker position (simulate real-time updates)
      const newGpsPosition = {
        latitude: gpsCoordinatesRef.current.latitude + 0.0001,
        longitude: gpsCoordinatesRef.current.longitude + 0.0001,
      };
      handleGpsMarkerMove(newGpsPosition);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(gpsUpdateInterval);
  }, []);

  const toggleStepIndicator = () => {
    setIsStepIndicatorOpen(!isStepIndicatorOpen);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Open/Close Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleStepIndicator} style={styles.button}>
          <Text>{isStepIndicatorOpen ? 'Close' : 'Open'} Step Indicator</Text>
        </TouchableOpacity>
      </View>

      {/* Step Indicator */}
      {isStepIndicatorOpen && (
        <StepIndicator
          customStyles={{
            stepIndicatorSize: 25,
            currentStepIndicatorSize: 30,
            separatorStrokeWidth: 2,
            currentStepStrokeWidth: 3,
            stepStrokeCurrentColor: 'green',
            stepStrokeWidth: 3,
            stepStrokeFinishedColor: 'green',
            stepStrokeUnFinishedColor: 'red',
            separatorFinishedColor: 'green',
            separatorUnFinishedColor: 'red',
            stepIndicatorFinishedColor: 'green',
            stepIndicatorUnFinishedColor: 'red',
            stepIndicatorCurrentColor: 'green',
            stepIndicatorLabelFontSize: 13,
            currentStepIndicatorLabelFontSize: 13,
            stepIndicatorLabelCurrentColor: 'green',
            stepIndicatorLabelFinishedColor: 'green',
            stepIndicatorLabelUnFinishedColor: 'red',
            labelColor: 'black',
            labelSize: 13,
            currentStepLabelColor: 'blue',
          }}
          currentPosition={currentStep}
          labels={stops.map((stop) => stop.label)}
          stepCount={stops.length}
          direction="vertical"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});

export default App;
