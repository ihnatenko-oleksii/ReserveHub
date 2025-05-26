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
}

const MyFavorites = () => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get<Service[]>('/favorites');
        setFavorites(res.data);
      } catch (err) {
        console.error('Failed to load favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Please login to view your favorite services.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading your favorites...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        You have no favorite services yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">❤️ My Favorites</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {favorites.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow rounded p-4 hover:shadow-md transition"
          >
            {service.imageUrl && (
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-800">{service.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{service.description}</p>
            <p className="text-gray-700 text-sm">
              💰 ${service.price} &nbsp; ⏱️ {service.duration} min
            </p>
            <p className="text-gray-500 text-sm">🗂️ {service.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
