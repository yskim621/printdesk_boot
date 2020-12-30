import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { containerClassnamesSelector } from '../../../store/Layout/selectors';

const Layout = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const token = cookie.get('token');
    if (!token) router.push('/login');
  }, []);

  const containerClassnames = useSelector(containerClassnamesSelector());

  return (
    <div id="app-container" className={containerClassnames}>
      <Navbar />
      <Sidebar />
      <main>
        <div className="container-fluid">
          <div className="dashboard-wrapper">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
