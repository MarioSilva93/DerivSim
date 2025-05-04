import { useState } from "react";
import deliveries from "./data/deliveries";
import { addDelivery, clearRoute, calculateRouteDistance } from "./core/routeManager";
import DeliveryList from "./ui/DeliveryList";
import RoutePlanner from "./ui/RoutePlanner";
import MapView from "./ui/MapView";
import DebugPanel from "./delivsim/src/ui/DebugPanel";

export default function App() {
  const [route, setRoute] = useState([]);
  const distance = calculateRouteDistance(route);

  const handleAdd = (delivery) => setRoute(addDelivery(route, delivery));
  const handleClear = () => setRoute(clearRoute());

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-4 bg-white overflow-y-auto">
        <DeliveryList deliveries={deliveries} onAdd={handleAdd} />
        <RoutePlanner route={route} onClear={handleClear} distance={distance} />
        <DebugPanel route={route} distance={distance} />
      </div>
      <div className="w-2/3">
        <MapView deliveries={deliveries} route={route} />
      </div>
    </div>
  );
}
