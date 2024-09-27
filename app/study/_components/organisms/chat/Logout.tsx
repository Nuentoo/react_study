'use client';

import { useState } from 'react';
import { logout } from './modules/actions';

export default function LogoutButton() {
  const [error, setError] = useState<string | null>(null);
  const handleLogout = () => {
    logout().catch((e: Error) => {
      setError(e.message);
    });
  };

  return (
    <>
      <button
        className="block rounded-lg bg-orange-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-800"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
      <strong className="text-red-500">{error}</strong>
    </>
  );
}
