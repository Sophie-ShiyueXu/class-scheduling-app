import Button from './Button';
import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

type BannerProps = { title: string };

const Banner: React.FC<BannerProps> = ({ title }) => {
  const { user } = useAuthState(); // 假设你的自定义 hook 返回 { user }

  return (
    <>
      <div className="p-2 flex gap-4 items-center">
        <span className="text-xl text-blue-400">
          Welcome, {user?.displayName ?? 'guest'}!
        </span>
        <span className="ml-auto">
          {user ? (
            <Button onClick={signOut}>Sign Out</Button>
          ) : (
            <Button onClick={signInWithGoogle}>Sign In</Button>
          )}
        </span>
      </div>
      <hr className="my-4" />
      <h1>{title}</h1>
    </>
  );
};

export default Banner;
