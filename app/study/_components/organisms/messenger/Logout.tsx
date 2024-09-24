'use client';

import { logout } from './modules/actions';
// import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
// import { createClient } from '@/_utils/supabase/auth_chat/client';

export default function LogoutButton() {
  // const supabase = createClient();
  // // const router = useRouter();
  // // ログアウト
  // const logout = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   // router.push('/study');
  //   redirect('/study');
  // };

  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  return (
    <button
      className="block rounded-lg bg-orange-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-800"
      type="button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
