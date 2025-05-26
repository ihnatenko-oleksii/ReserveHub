const AdminPage = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full space-y-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Only accessible by users with the ADMIN role.</p>
        </div>
      </div>
    );
  };
  
  export default AdminPage;
  