import App from './App';
import LoginDialog from './LoginDialog';
import { loginCheck } from './modules/actions';

export default async function SeverApp() {
  console.log('サーバーコンポーネント？');
  const islogined = await loginCheck();

  if (islogined) {
    return <p>Hello!!!</p>;
  }

  return (
    <>
      <LoginDialog />
      <App />
    </>
  );
}
