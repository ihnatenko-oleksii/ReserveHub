import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { User } from '../types/types';
import { useToast } from '../hooks/useToast';

const splitFullName = (fullName: string) => {
  const [firstName, ...rest] = fullName.trim().split(' ');
  const lastName = rest.join(' ');
  return { firstName, lastName };
};

const ProfileEdit = () => {
  const { user, login } = useAuth();
  const showToast = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    description: '',
    avatar: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const { firstName, lastName } = splitFullName(user.name || '');
      setFormData({
        firstName,
        lastName,
        phone: user.phone || '',
        description: user.description || '',
        avatar: null,
      });
      const avatarUrl = user.avatarUrl
          ? `http://localhost:8080/avatars/${user.avatarUrl}`
          : null;
      setPreview(avatarUrl);
    }
  }, [user]);

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const data = new FormData();
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      data.append('name', fullName);
      data.append('phone', formData.phone);
      data.append('description', formData.description);
      if (formData.avatar) {
        data.append('avatar', formData.avatar);
      }

      const res = await api.put<User>(`/users/${user.id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { firstName, lastName } = splitFullName(res.data.name || '');

      login({
        token: localStorage.getItem('token')!,
        user: {
          ...res.data,
          firstName,
          lastName,
        },
      });

      showToast('Profile updated!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      showToast('Update failed.');
    }
  };

  return (
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar upload */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Avatar Preview
            </label>

            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 shadow">
              {preview ? (
                  <img
                      src={preview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                  />
              ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xl">
                    ?
                  </div>
              )}
            </div>

            <label
                htmlFor="avatar-upload"
                className="cursor-pointer text-blue-600 hover:underline text-sm mt-2"
            >
              Choose new avatar
            </label>
            <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
            />
          </div>

          <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
  );
};

export default ProfileEdit;
