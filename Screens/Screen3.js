<<<<<<< HEAD
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const VerticalStepIndicator = () => {
  const [currentPage, setCurrentPage] = useState(0); 
  const labels = ["Stop 1", "Stop 2", "Stop 3"]; 
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
=======
import React from "react";
import { Text, View, Dimensions, Animated } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";

const { height } = Dimensions.get("window");

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center"
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
  icon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -24,
    right: 18,
    width: 48,
    height: 48,
    zIndex: 1
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
  }
};

class BottomSheet extends React.Component {
  static defaultProps = {
    draggableRange: { top: height + 180 - 64, bottom: 180 }
  };

  _draggedValue = new Animated.Value(180);

  render() {
    const { top, bottom } = this.props.draggableRange;

    const backgoundOpacity = this._draggedValue.interpolate({
      inputRange: [height - 48, height],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });

    const iconTranslateY = this._draggedValue.interpolate({
      inputRange: [height - 56, height, top],
      outputRange: [0, 56, 180 - 32],
      extrapolate: "clamp"
    });

    const textTranslateY = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 8],
      extrapolate: "clamp"
    });

    const textTranslateX = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, -112],
      extrapolate: "clamp"
    });

    const textScale = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [1, 0.7],
      extrapolate: "clamp"
    });

    return (
      <View style={styles.container}>
        <Text onPress={() => this._panel.show(360)}>Show panel</Text>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={this.props.draggableRange}
          animatedValue={this._draggedValue}
          snappingPoints={[360]}
          height={height + 180}
          friction={0.5}
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
              <Text>Bottom sheet content</Text>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

export default BottomSheet;
>>>>>>> main
