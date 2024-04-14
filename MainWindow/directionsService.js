// directionsService.js
export const getDirections = async (origin, destination, waypoints) => {
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
  