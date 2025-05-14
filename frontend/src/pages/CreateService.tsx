import React, { useState } from 'react';
import axios from 'axios';

const CreateService = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    image: null as File | null
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('duration', formData.duration);
      data.append('category', formData.category);
      if (formData.image) {
        data.append('image', formData.image);
      }

      const res = await axios.post('/api/services', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Service created:', res.data);
      // TODO: redirect або повідомлення
    } catch (err) {
      console.error('Failed to create service:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create a new service
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
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateService;
