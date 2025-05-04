export default function RoutePlanner({ route, onClear, distance }) {
    return (
      <div>
        <h2 className="text-lg font-semibold mt-6">Selected Route</h2>
        <ol className="list-decimal list-inside">
          {route.map((delivery) => (
            <li key={delivery.id}>{delivery.name}</li>
          ))}
        </ol>
  
        {distance > 0 && (
          <p className="mt-2 font-medium">Total Distance: {distance} km</p>
        )}
  
        {route.length > 0 && (
          <button
            onClick={onClear}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear Route
          </button>
        )}
      </div>
    );
  }
   