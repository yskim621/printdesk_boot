import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div
      id="app-container"
      className="menu-default menu-sub-hidden main-hidden sub-hidden"
    >
      <Navbar />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
