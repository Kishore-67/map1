// MapStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    backgroundColor: 'white',
    position: 'relative',
  },
  panelHeader: {
    height: 100,
    backgroundColor: "#b197fc",
    justifyContent: "flex-end",
    padding: 24
  },
  textHeader: {
    fontSize: 28,
    color: "#FFF"
  },
 
  stepDetail: {
    marginBottom: 10,
  },
  
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2,
  },
});
