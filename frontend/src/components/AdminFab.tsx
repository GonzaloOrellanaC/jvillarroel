import React, { useEffect, useState } from 'react';

const AdminFab: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!localStorage.getItem('admin_token'));
  }, []);

  if (!visible) return null;

  return (
    <button
      id="admin-fab"
      title="Panel Admin"
      className="fixed bottom-6 right-6 z-50 bg-blue-800 text-white rounded-full shadow-lg p-4 hover:bg-blue-900 transition"
      onClick={() => {
        const event = new CustomEvent('open-admin-panel');
        window.dispatchEvent(event);
      }}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
};

export default AdminFab;
