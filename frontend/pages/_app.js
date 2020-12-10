import App from 'next/app';
import Head from 'next/head';
import { wrapper } from '../src/store';
import { appWithTranslation } from '../src/i18n';
import { NotificationContainer } from '../src/components/common/react-notifications';

import '../public/styles/assets/css/vendor/bootstrap.rtl.only.min.css';
import '../public/styles/assets/css/vendor/bootstrap.min.css';
import '../public/styles/assets/css/sass/themes/gogo.light.purplemonster.scss';

const MyApp = ({ Component, pageProps }) => {
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
      <NotificationContainer />
      <Component {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default wrapper.withRedux(appWithTranslation(MyApp));
