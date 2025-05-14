import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  imageUrl?: string;
}

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    image: null as File | null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get<Service>(`/services/${id}`);
        const service = res.data;
        setFormData({
          name: service.name,
          description: service.description,
          price: service.price.toString(),
          duration: service.duration.toString(),
          category: service.category,
          image: null,
        });
      } catch (err) {
        console.error('Failed to load service:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user?.role !== 'PROVIDER') {
      alert('Only providers can edit services.');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price.toString());
      data.append('duration', formData.duration.toString());
      data.append('category', formData.category);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await api.put(`/services/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/dashboard'); // або на сторінку сервісу
    } catch (err) {
      console.error('Failed to update service:', err);
      alert('Failed to update service');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Edit Service
        </h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Service name"
          required
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Service description"
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price (USD)"
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          required
          className="w-full border px-4 py-2 rounded"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Select category</option>
          <option value="HAIRDRESSING">Hairdressing</option>
          <option value="BEAUTY">Beauty</option>
          <option value="MASSAGE">Massage</option>
          <option value="FITNESS">Fitness</option>
          <option value="EDUCATION">Education</option>
          <option value="CONSULTING">Consulting</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditService;
