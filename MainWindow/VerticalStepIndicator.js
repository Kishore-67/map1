import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const VerticalStepIndicator = ({ totalStops }) => {
  const [currentPage, setCurrentPage] = useState(0); 

  const labels = Array.from({ length: totalStops }, (_, index) => `Stop ${index + 1}`);

  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#4aae4f',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#4aae4f',
    stepStrokeUnFinishedColor: '#d4d4d4',
    separatorFinishedColor: '#4aae4f',
    separatorUnFinishedColor: '#d4d4d4',
    stepIndicatorFinishedColor: '#4aae4f',
    stepIndicatorUnFinishedColor: '#d4d4d4',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#000000',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#000000',
    labelColor: '#000000',
    labelSize: 13,
    currentStepLabelColor: '#4aae4f',
  };

  const handleNext = () => {
    if (currentPage < labels.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepIndicatorContainer}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPage}
          labels={labels}
          stepCount={labels.length}
          direction="vertical"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text>{labels[currentPage]}</Text>
        {/* Add your content for each step here */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  stepIndicatorContainer: {
    marginRight: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#4aae4f',
    borderRadius: 5,
  },
});

export default VerticalStepIndicator;
