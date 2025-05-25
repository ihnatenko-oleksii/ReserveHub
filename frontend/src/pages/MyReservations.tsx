import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Link } from 'react-router-dom';

interface Reservation {
  id: number;
  date: string;
  time: string;
  notes: string;
  status: string;
  serviceId: number;
  serviceName: string;
  serviceDescription: string;
  providerName: string;
}

const MyReservations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await api.get<Reservation[]>(`/reservations/user/${user?.id}`);
        setReservations(res.data);
        console.log('Fetched reservations:', res.data);
      } catch (err) {
        console.error('Failed to fetch reservations', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchReservations();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">My Reservations</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : reservations.length === 0 ? (
        <p className="text-center text-gray-600">You don’t have any reservations yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {reservations.map((r) => (
            <div key={r.id} className="bg-white rounded-lg shadow p-6 space-y-2">
              <div className="text-sm text-gray-400">Reservation ID: {r.id}</div>
              <div className="font-semibold text-gray-900">{r.serviceName}</div>
              <div className="text-gray-700 text-sm">{r.serviceDescription}</div>

              <p className="text-sm text-gray-600">📅 {r.date} 🕓 {r.time}</p>
              {r.notes && <p className="text-sm text-gray-600">📝 Notes: {r.notes}</p>}
              <p className="text-sm text-gray-600">👤 Provider: {r.providerName}</p>

              <span className={`text-xs inline-block px-3 py-1 rounded-full bg-gray-100 border font-medium mt-2`}>
                {r.status}
              </span>

              <Link to={`/services/${r.serviceId}`} className="text-blue-600 hover:underline text-sm block mt-2">
                View Service →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
