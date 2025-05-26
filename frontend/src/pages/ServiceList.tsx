import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/axios';

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
  images?: ServiceImage[];
}

const categories = [
  'HAIRDRESSING', 'BEAUTY', 'MASSAGE', 'FITNESS',
  'EDUCATION', 'CONSULTING', 'OTHER',
];

const ServiceList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [services, setServices] = useState<Service[]>([]);
  const [filtered, setFiltered] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('grid');

  const [filters, setFilters] = useState({
    category: '',
    maxPrice: '',
    minDuration: '',
  });

  const SERVICE_IMAGE_BASE_URL = 'http://localhost:8080/services_photos/';

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setFilters((prev) => ({ ...prev, category: categoryFromUrl }));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get<Service[]>('/services');
        setServices(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    let result = services;

    if (filters.category) {
      result = result.filter((s) => s.category === filters.category);
    }

    if (filters.maxPrice) {
      result = result.filter((s) => s.price <= parseFloat(filters.maxPrice));
    }

    if (filters.minDuration) {
      result = result.filter((s) => s.duration >= parseFloat(filters.minDuration));
    }

    setFiltered(result);
  }, [filters, services]);

  return (
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Available Services</h1>

        {/* 🔍 Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <select name="category" value={filters.category} onChange={handleFilterChange} className="border px-4 py-2 rounded">
            <option value="">All Categories</option>
            {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange}
                 className="border px-4 py-2 rounded" placeholder="Max Price" />
          <input type="number" name="minDuration" value={filters.minDuration} onChange={handleFilterChange}
                 className="border px-4 py-2 rounded" placeholder="Min Duration (min)" />

          <select
              value={viewStyle}
              onChange={(e) => setViewStyle(e.target.value as 'grid' | 'list')}
              className="border px-4 py-2 rounded"
          >
            <option value="grid">Grid view</option>
            <option value="list">List view</option>
          </select>
        </div>

        {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
        ) : filtered.length === 0 ? (
            <p className="text-center text-gray-600">No services match your filters.</p>
        ) : viewStyle === 'grid' ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((service) => (
                  <div key={service.id} className="bg-white rounded shadow p-4 flex flex-col">
                    {service.images?.[0]?.imageUrl && (
                        <img
                            src={SERVICE_IMAGE_BASE_URL + service.images[0].imageUrl}
                            alt={service.name}
                            className="w-full h-40 object-cover rounded mb-3"
                        />
                    )}
                    <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{service.description}</p>
                    <p className="text-sm text-gray-700 mb-2">
                      💰 ${service.price} &nbsp; ⏱ {service.duration} min
                    </p>
                    <button onClick={() => navigate(`/services/${service.id}`)}
                            className="mt-auto text-blue-600 hover:underline text-sm">
                      View
                    </button>
                  </div>
              ))}
            </div>
        ) : (
            <div className="space-y-4">
              {filtered.map((service) => (
                  <div key={service.id} className="bg-white rounded shadow p-4 flex gap-6 items-center">
                    {service.images?.[0]?.imageUrl && (
                        <img
                            src={SERVICE_IMAGE_BASE_URL + service.images[0].imageUrl}
                            alt={service.name}
                            className="w-36 h-36 object-cover rounded"
                        />
                    )}
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{service.description}</p>
                      <p className="text-sm text-gray-700">
                        💰 ${service.price} &nbsp; ⏱ {service.duration} min &nbsp; 🗂 {service.category}
                      </p>
                    </div>
                    <button onClick={() => navigate(`/services/${service.id}`)}
                            className="text-blue-600 hover:underline text-sm">
                      View
                    </button>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default ServiceList;
