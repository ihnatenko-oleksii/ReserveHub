import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  imageUrl?: string;
}

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`/api/services/${id}`);
        setService(res.data as Service);
      } catch (err) {
        console.error('Failed to load service:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Service not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-6 rounded shadow space-y-4">
        {service.imageUrl && (
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-64 object-cover rounded"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
        <p className="text-gray-600">{service.description}</p>
        <div className="text-gray-700">
          <p>💰 Price: ${service.price}</p>
          <p>⏱️ Duration: {service.duration} min</p>
          <p>🗂️ Category: {service.category}</p>
        </div>
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceDetails;
