import { withTranslation } from '../src/i18n';

const HomePage = ({ t }) => {
  return (
    <div>
      {t('greeting')}
    </div>
  );
};

HomePage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'navbar'],
});

export default withTranslation('common')(HomePage);
