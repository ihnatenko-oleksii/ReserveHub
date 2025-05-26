import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

interface Invoice {
  id: number;
  amount: number;
  status: string;
  pdfPath: string;
  createdAt: string;

  reservationId: number;
  serviceName: string;

  clientId: number;
  clientName: string;

  providerId: number;
  providerName: string;
}

const MyInvoices = () => {
    const { user } = useAuth();
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await api.get<Invoice[]>(`/invoices/user/${user?.id}`);
                setInvoices(res.data);
                console.log('Fetched invoices:', res.data);
            } catch (err) {
                console.error('Failed to load invoices:', err);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchInvoices();
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My Invoices</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : invoices.length === 0 ? (
                <p className="text-center text-gray-600">No invoices found.</p>
            ) : (
                <div className="space-y-4 max-w-4xl mx-auto">
                            {invoices.map((inv) => {
                                const isClient = user?.id === inv.clientId.toString();
                                return (
                                    <div
                                        key={inv.id}
                                        className="bg-white p-4 shadow rounded flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                                    >
                                        <div>
                                            <p className="text-sm text-gray-500">Invoice ID: #{inv.id}</p>
                                            <p className="font-semibold text-gray-800">
                                                Service: {inv.serviceName || '—'}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                Role:{' '}
                                                <span
                                                    className={`font-medium ${isClient ? 'text-blue-600' : 'text-green-600'}`}
                                                >
                                                    {isClient ? 'Client' : 'Provider'}
                                                </span>
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Date: {new Date(inv.createdAt).toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="text-right space-y-2">
                                            <p className="text-sm">
                                                💰 <b>${inv.amount}</b> &nbsp; | &nbsp; Status:{' '}
                                                <span className="font-medium">{inv.status}</span>
                                            </p>
                                            <a
                                                href={`http://localhost:8080/api/invoices/${inv.id}/pdf`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 underline text-sm"
                                            >
                                                View PDF
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}

                </div>
            )}
        </div>
    );
};

export default MyInvoices;
