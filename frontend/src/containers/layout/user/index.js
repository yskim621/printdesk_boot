import { useEffect } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get('token');
    if (token) router.push('/');

    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);

  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
};

export default Layout;
