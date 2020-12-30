import AppLayout from '../src/containers/layout/app';
import { withTranslation } from '../src/i18n';

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
