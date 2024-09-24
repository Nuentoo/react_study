import LogoutButton from './Logout';
import ChannelMessanger from './ChannelApp';
import Messenger from './App';
import LoginDialog from './LoginDialog';
import { getAuthData } from './modules/actions';

export default async function SeverApp() {
  console.log('サーバーコンポーネント？');
  const data = await getAuthData();

  // console.log('data', data);

  return data ? (
    <>
      <div className="mb-7 flex gap-x-6">
        <strong>
          {' '}
          Hello 🙌{'　'}
          {data.userNickName}{' '}
        </strong>
        <LogoutButton />
      </div>
      <ChannelMessanger initialData={data} />
    </>
  ) : (
    <>
      <div className="mb-7 flex gap-x-6">
        <strong> this is demonstration </strong>
        <LoginDialog />
      </div>
      <Messenger />
    </>
  );
}
