import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ deliveries, route }) {
  return (
    <MapContainer center={[46.8, 8.2]} zoom={8} className="h-full w-full">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {deliveries.map((delivery) => (
        <Marker key={delivery.id} position={delivery.coords}>
          <Popup>{delivery.name}</Popup>
        </Marker>
      ))}
      {route.length > 1 && (
        <Polyline positions={route.map((e) => e.coords)} color="blue" />
      )}
    </MapContainer>
  );
}
