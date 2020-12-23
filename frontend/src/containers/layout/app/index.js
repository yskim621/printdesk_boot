import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { containerClassnamesSelector } from '../../../store/Layout/selectors';

// const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });

const Layout = ({ children }) => {
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
