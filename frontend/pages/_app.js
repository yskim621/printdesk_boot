import App from 'next/app';
import Head from 'next/head';
import { wrapper } from '../src/store';
import { appWithTranslation } from '../src/i18n';
import { NotificationContainer } from '../src/components/common/react-notifications';

import '../public/styles/assets/css/vendor/bootstrap.rtl.only.min.css';
import '../public/styles/assets/css/vendor/bootstrap.min.css';
import '../public/styles/assets/css/sass/themes/gogo.light.purplemonster.scss';

import UserLayout from '../src/containers/layout/user';
import AppLayout from '../src/containers/layout/app';

const MyApp = ({ Component, pageProps, pathname }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0, user-scalable=no, maximum-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
      </Head>
      {/* TODO: 권한별로 나뉘도록 작업해야됨. */}
      {pathname === '/register' || pathname === '/login' ? (
        <UserLayout>
          <NotificationContainer />
          <Component {...pageProps} />
        </UserLayout>
      ) : (
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      )}
    </>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const { pathname } = appContext.ctx;

  return {
    pathname,
    ...(await App.getInitialProps(appContext)),
  };
};

export default wrapper.withRedux(appWithTranslation(MyApp));
