import React, { useState, useEffect, useRef } from 'react';
import StepIndicator from 'react-native-step-indicator';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const VerticalStepIndicator = ({ initialLatitude, initialLongitude, stops, distances }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepIndicatorOpen, setIsStepIndicatorOpen] = useState(true);
  const [latitude, setLatitude] = useState(initialLatitude);
  const [longitude, setLongitude] = useState(initialLongitude);
  const visitedStopsRef = useRef(new Set()); // Using a Set to keep track of visited stops

  const handleGpsMarkerMove = () => {
    let minDistance = Infinity;
    let closestStopIndex = currentStep;

    stops.forEach((stop, index) => {
      if (!visitedStopsRef.current.has(index)) {
        const lat1 = latitude;
        const lon1 = longitude;
        const lat2 = stop.latitude;
        const lon2 = stop.longitude;
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180; // Convert degrees to radians
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers

        if (distance < minDistance) {
          minDistance = distance;
          closestStopIndex = index;
        }
      }
    });

    if (closestStopIndex !== currentStep) {
      visitedStopsRef.current.add(currentStep); // Mark the current stop as visited
      setCurrentStep(closestStopIndex);
    }
  };
  
  useEffect(() => {
    // Update GPS marker position when latitude or longitude changes
    handleGpsMarkerMove();
  }, [latitude, longitude, stops]); // Re-run effect when latitude or longitude changes

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
          labels={stops.map((stop, index) => {
            const distanceObject = distances.find(item => item.stopIndex === index + 1); // Finding distance object for current stop
            const distance = distanceObject ? parseFloat(distanceObject.distance) : undefined; // Extracting distance and converting to float
            const formattedDistance = distance !== undefined ? ` ${distance.toFixed(2)} km` : stop.label;
            return formattedDistance;
          })}
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

export default  VerticalStepIndicator;
