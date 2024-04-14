import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const BusTimings = ({ route }) => {
  const { data } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Table Header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerCell]}>Source</Text>
        <Text style={[styles.cell, styles.headerCell]}>Destination</Text>
        <Text style={[styles.cell, styles.headerCell]}>Time</Text>
      </View>

      {/* Table Rows */}
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={[styles.cell, styles.cellWithBorder]}>{item.Source}</Text>
          <Text style={[styles.cell, styles.cellWithBorder]}>{item.Destination}</Text>
          <Text style={[styles.cell, styles.cellWithBorder]}>{item.Time}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'darkblue',
  },
  headerRow: {
    borderTopWidth: 1,
    borderTopColor: 'darkblue',
    borderBottomWidth: 1,
    borderBottomColor: 'darkblue',
    backgroundColor:'#ccc',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 19.3,
    color: 'black',
    fontWeight: 'bold',

  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    borderColor: 'darkblue',
  },
  cellWithBorder: {
    borderRightWidth: 1, 
    borderRightColor: 'darkblue',
  },
});

export default BusTimings;
