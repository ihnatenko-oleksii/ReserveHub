import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

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
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const res = await api.get<Service[]>('/services/my');
      setServices(res.data);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('Delete this service?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/services/${id}`);
      setServices(prev => prev.filter(service => service.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Could not delete service.');
    }
  };

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
              className="bg-white shadow p-4 rounded border border-gray-200 flex flex-col"
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
              <p className="text-sm text-gray-700 font-medium mb-2">${service.price}</p>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => navigate(`/services/${service.id}`)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/services/${service.id}/edit`)}
                  className="text-yellow-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyServices;
