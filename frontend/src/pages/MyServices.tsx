import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Service {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
}

const MyServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/services/my'); // 🔁 бекенд має повертати тільки свої
        setServices(res.data as Service[]);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">My Services</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-600">You haven't added any services yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <div
              key={service.id}
              className="bg-white shadow p-4 rounded border border-gray-200"
            >
              {service.imageUrl && (
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
              <p className="text-sm text-gray-500 mb-1">Category: {service.category}</p>
              <p className="text-sm text-gray-700 font-medium">${service.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyServices;
