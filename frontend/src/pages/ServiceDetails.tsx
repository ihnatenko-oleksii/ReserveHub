import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  imageUrl?: string;
  rating?: number;
  likes?: number;
  providerName?: string;
}

const ServiceDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth(); // лишаємо user
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get<Service>(`/services/${id}`);
        setService(res.data);
      } catch (err) {
        console.error('Failed to load service:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleLike = async () => {
    try {
      setLiked((prev) => !prev);
      await axios.post(`/services/${id}/like`);
    } catch (err) {
      console.error('Failed to like service:', err);
    }
  };

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

        {service.providerName && (
          <p className="text-sm text-gray-600">Provided by: {service.providerName}</p>
        )}

        <p className="text-gray-600">{service.description}</p>

        <div className="text-gray-700 space-y-1">
          <p>💰 Price: ${service.price}</p>
          <p>⏱️ Duration: {service.duration} min</p>
          <p>🗂️ Category: {service.category}</p>
          {service.rating !== undefined && (
            <p>⭐ Rating: {service.rating.toFixed(1)}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          {isAuthenticated ? (
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm ${
                liked ? 'text-red-600' : 'text-gray-500'
              }`}
            >
              {liked ? '❤️ Liked' : '🤍 Like'}
            </button>
          ) : (
            <span className="text-sm text-gray-400 italic">Login to like</span>
          )}

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
