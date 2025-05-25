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
  const [notes, setNotes] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showBookingSummary, setShowBookingSummary] = useState(false);

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

    const isoDate = new Date(selectedDate);
    const date = isoDate.toISOString().split('T')[0];
    const time = isoDate.toTimeString().split(' ')[0];

    try {
      await axios.post('/reservations', {
        serviceId: service?.id,
        providerId: service?.ownerId,
        userId: user?.id,
        date,
        time,
        notes: notes,
      });

      showToast('Reservation created successfully!', 'success');
      setShowBookingSummary(false);
    } catch (err) {
      console.error('Failed to book service:', err);
      showToast('Failed to book service', 'error');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Loading...</p></div>;
  if (!service) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">Service not found.</p></div>;

  return (
    <div className="px-4 py-10 flex flex-col items-center" style={{ minHeight: '50vh' }}>
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
              {isOwner === false && (
                <button
                  onClick={handleLike}
                  className={`text-sm mt-1 self-end transition-colors ${liked ? 'text-red-600' : 'text-gray-500 hover:text-red-500'}`}
                >
                  {liked ? '❤️ Liked' : '🤍 Like'}
                </button>
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

          {isAuthenticated && (
            <button
              onClick={() => setShowBookingSummary(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg mt-6"
            >
              Book Now
            </button>
          )}
        </div>
      </div>

      {isAuthenticated && showBookingSummary && (
        <div className="mt-8 p-6 max-w-4xl w-full bg-gray-050 rounded-lg shadow-lg relative">
          <button
            onClick={() => setShowBookingSummary(false)}
            className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-lg"
          >
            &times;
          </button>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Reservation Summary</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Choose date and time</label>
              <input
                type="datetime-local"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border px-4 py-2 rounded-md w-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Additional notes</label>
              <textarea
                placeholder="Optional..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border px-4 py-2 rounded-md w-full min-h-[80px] resize-none shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <p className="text-gray-800">
              💰 <b>Total:</b> ${service?.price}
            </p>
            <button
              onClick={handleBooking}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-sm transition"
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
