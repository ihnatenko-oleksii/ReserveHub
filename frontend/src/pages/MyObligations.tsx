import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { useToast } from '../hooks/useToast';

interface Reservation {
  id: number;
  serviceName: string;
  clientName: string;
  clientAvatar?: string;
  price: number;
  duration: number;
  date: string;
  time: string;
  notes: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

const MyObligations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await api.get<Reservation[]>(`/reservations/provider/${user?.id}`);
        setReservations(res.data);
      } catch (err) {
        console.error('Failed to load reservations:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchReservations();
  }, [user]);

    const handleConfirm = async (r: Reservation) => {
  try {
    
    await api.put(`/reservations/status/${r.id}?status=CONFIRMED`);

    setReservations((prev) =>
      prev.map((res) => (res.id === r.id ? { ...res, status: 'CONFIRMED' } : res))
    );
    showToast('Reservation confirmed successfully!', 'success');
  } catch (err) {
    console.error('Failed to confirm reservation:', err);
    showToast('Failed to confirm reservation.', 'error');
  }
};

    const handleReject = async (id: number) => {
        try {
            await api.delete(`/reservations/${id}`);
            setReservations((prev) =>
                prev.map((res) => (res.id === id ? { ...res, status: 'CANCELLED' } : res))
            );
            showToast('Reservation rejected successfully.', 'success');
        } catch (err) {
            console.error('Failed to reject reservation:', err);
            showToast('Failed to reject reservation.', 'error');
        }
    };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 flex justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My Obligations</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : reservations.length === 0 ? (
          <p className="text-center text-gray-600">No reservations yet.</p>
        ) : (
          <div className="space-y-4">
            {reservations.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-xl shadow p-5 flex items-start gap-4 relative"
              >
                {r.clientAvatar ? (
                  <img
                    src={`http://localhost:8080/avatars/${r.clientAvatar}`}
                    alt="avatar"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold uppercase">
                    {r.clientName[0]}
                  </div>
                )}

                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">{r.clientName}</h2>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        r.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-700'
                          : r.status === 'CONFIRMED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    📅 {r.date} at {r.time}
                  </p>
                  <p className="text-sm text-gray-700">
                    💼 {r.serviceName} &nbsp; 💰 ${r.price} &nbsp; ⏱ {r.duration} min
                  </p>
                  {r.notes && <p className="text-sm italic text-blue-600">📝 {r.notes}</p>}

                        {(r.status === 'PENDING' || r.status === 'CONFIRMED') && (
                            <div className="flex gap-2 mt-2">
                                {r.status === 'PENDING' && (
                                    <button
                                        onClick={() => handleConfirm(r)}
                                        className="px-4 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                                    >
                                        Confirm
                                    </button>
                                )}
                                <button
                                    onClick={() => handleReject(r.id)}
                                    className="px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyObligations;
