export function addDelivery(route, delivery) {
    if (!route.find((e) => e.id === delivery.id)) {
      return [...route, delivery];
    }
    return route;
  }
  
  export function clearRoute() {
    return [];
  }
  
// Haversine formula to calculate distance in kilometers
export function calculateRouteDistance(route) {
    const toRad = (value) => (value * Math.PI) / 180;
  
    let total = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const [lat1, lon1] = route[i].coords;
      const [lat2, lon2] = route[i + 1].coords;
  
      const R = 6371; // Earth radius in km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
  
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
  
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      total += R * c;
    }
    return Math.round(total * 10) / 10; // round to 1 decimal
  }
    