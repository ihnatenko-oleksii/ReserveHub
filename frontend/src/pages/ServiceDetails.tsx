import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { useToast } from '../hooks/useToast';

interface ServiceImage {
  id: number;
  imageUrl: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  rating?: number;
  likes?: number;
  ownerName?: string;
  ownerId: string;
  images?: ServiceImage[];
}

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const showToast = useToast();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');

  const SERVICE_IMAGE_BASE_URL = 'http://localhost:8080/services_photos/';
  const isOwner = user?.id === service?.ownerId;

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get<Service>(`/services/${id}`);
        setService(res.data);
        if (res.data.images && res.data.images.length > 0) {
          setMainImage(res.data.images[0].imageUrl);
        }
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

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this service?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/services/${id}`);
      navigate('/my-services');
    } catch (err) {
      console.error('Failed to delete service:', err);
      alert('Failed to delete service.');
    }
  };

  const handleBooking = async () => {
    if (!selectedDate) return alert('Please select a date');

    try {
      await axios.post('/reservations', {
        serviceId: service?.id,
        providerId: service?.ownerId,
        reservationDate: selectedDate,
      });
      showToast('Reservation created successfully!');
    } catch (err) {
      console.error('Failed to book service:', err);
      alert('Failed to book service');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Loading...</p></div>;
  if (!service) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">Service not found.</p></div>;

  return (
      <div className="px-4 py-10 flex justify-center" style={{ minHeight: '50vh' }}>
        <div className="bg-gray-50 w-full max-w-6xl bg-white rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-10 p-8">
          {/* Image gallery */}
          <div className="flex flex-col">
            {mainImage && (
                <>
                  <img src={SERVICE_IMAGE_BASE_URL + mainImage} alt="Main" className="w-full h-[400px] object-cover rounded-xl border" />
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {service.images?.map((img) => (
                        <img
                            key={img.id}
                            src={SERVICE_IMAGE_BASE_URL + img.imageUrl}
                            alt="Thumbnail"
                            className={`w-24 h-24 object-cover rounded-lg cursor-pointer border ${img.imageUrl === mainImage ? 'border-blue-600' : 'border-gray-300'}`}
                            onClick={() => setMainImage(img.imageUrl)}
                        />
                    ))}
                  </div>
                </>
            )}
          </div>

          {/* Service details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                {isOwner && (
                    <div className="flex gap-3">
                      <button onClick={() => navigate(`/services/${service.id}/edit`)} className="text-blue-600 hover:underline">✏️ Edit</button>
                      <button onClick={handleDelete} className="text-red-600 hover:underline">🗑 Delete</button>
                    </div>
                )}
              </div>

              {service.ownerName && (
                  <p className="text-sm text-gray-600 mb-2">
                    Provided by <span className="font-semibold">{service.ownerName}</span>
                  </p>
              )}

              <p className="text-gray-700 mb-4">{service.description}</p>

              <div className="text-gray-800 space-y-2">
                <p><b>💰 Price:</b> ${service.price}</p>
                <p><b>⏱️ Duration:</b> {service.duration} minutes</p>
                <p><b>🗂️ Category:</b> {service.category}</p>
                {service.rating !== undefined && (
                    <p><b>⭐ Rating:</b> {service.rating.toFixed(1)}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-6 mt-6">
              {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3">
                      <input
                          type="datetime-local"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="border px-3 py-2 rounded w-full"
                      />
                      <button onClick={handleBooking} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Book Now
                      </button>
                    </div>
                    <button
                        onClick={handleLike}
                        className={`text-sm mt-2 self-start ${liked ? 'text-red-600' : 'text-gray-500'}`}
                    >
                      {liked ? '❤️ Liked' : '🤍 Like'}
                    </button>
                  </>
              ) : (
                  <span className="text-sm text-gray-400 italic">Login to like and book</span>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ServiceDetails;
