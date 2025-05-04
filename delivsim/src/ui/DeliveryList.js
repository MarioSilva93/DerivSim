export default function DeliveryList({ deliveries, onAdd }) {
    return (
      <div>
        <h1 className="text-xl font-bold mb-2">Available Deliveries</h1>
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="mb-2">
            <button
              onClick={() => onAdd(delivery)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {delivery.name}
            </button>
          </div>
        ))}
      </div>
    );
  }
  