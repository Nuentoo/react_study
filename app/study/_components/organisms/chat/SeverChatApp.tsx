import LogoutButton from './Logout';
import ClienChatApp from './ClienChatApp';
import LoginDialog from './LoginDialog';
import { getAuthData } from './modules/actions';

export default async function SeverChatApp() {
  const data = await getAuthData();
  console.log('サーバーコンポーネント')

  // console.log('data', data);

  return data ? (
    <>
      <div className="mb-7 flex gap-x-6">
        <strong>
          Hello 🙌{'　'}
          {data.userNickname}
        </strong>
        <LogoutButton />
      </div>
      <ClienChatApp initialData={data} />
    </>
  ) : (
    <>
      <div className="space-y-6">
        <strong> Let&apos;s Sign up or Login </strong>
        <div className="flex">
          <LoginDialog />
        </div>
      </div>
    </>
  );
}
