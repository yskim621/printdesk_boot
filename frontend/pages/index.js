import { withTranslation } from '../src/i18n';
import AppLayout from '../src/containers/layout/app';

const HomePage = ({ t }) => {
  return (
    <AppLayout>
      {t('greeting')}
    </AppLayout>
  );
};

HomePage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'navbar'],
});

export default withTranslation('common')(HomePage);
