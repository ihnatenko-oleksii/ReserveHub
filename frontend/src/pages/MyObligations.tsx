import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

interface Reservation {
    id: number;
    serviceName: string;
    date: string;
    clientName: string;
    clientAvatar?: string;
    price: number;
    duration: number;
}

const MyObligations = () => {
    const { user } = useAuth();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                My Obligations
            </h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : reservations.length === 0 ? (
                <p className="text-center text-gray-600">No reservations yet.</p>
            ) : (
                <div className="space-y-4">
                    {reservations.map((r) => (
                        <div
                            key={r.id}
                            className="bg-white shadow rounded p-4 flex items-center gap-4"
                        >
                            {r.clientAvatar ? (
                                <img
                                    src={`http://localhost:8080/avatars/${r.clientAvatar}`}
                                    alt="avatar"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm uppercase">
                                    {r.clientName[0]}
                                </div>
                            )}

                            <div className="flex-grow">
                                <p className="font-semibold text-gray-800">{r.clientName}</p>
                                <p className="text-gray-600 text-sm">
                                    {new Date(r.date).toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-700">
                                    💼 {r.serviceName} &nbsp; 💰 ${r.price} &nbsp; ⏱ {r.duration} min
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyObligations;
