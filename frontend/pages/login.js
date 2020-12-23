import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { Formik, Form, Field } from 'formik';

import { Colxx } from '../src/components/common/CustomBootstrap';
import { withTranslation } from '../src/i18n';
import { NotificationManager } from '../src/components/common/react-notifications';

import { loadingSelector, errorSelector } from '../src/store/Login/selectors';
import { loginAction } from '../src/store/Login/actions';

const LoginPage = ({ t }) => {
  const [id] = useState('');
  const [password] = useState('');

  const validateId = (value) => {
    let error;
    if (!value) {
      error = t('login-error-id-empty');
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = t('login-error-password-empty');
    } else if (value.length < 6) {
      error = t('login-error-password-length');
    }
    return error;
  };

  const dispatch = useDispatch();
  const login = (form) => {
    dispatch(loginAction(form));
  };

  const loading = useSelector(loadingSelector());
  const error = useSelector(errorSelector());

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  const initialValues = { id, password };

  const onUserLogin = (values) => {
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
        login(values);
      }
    }
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{' '}
              <Link href="/register" passHref>
                <a className="white">register</a>
              </Link>
              .
            </p>
          </div>

          <div className="form-side">
            <Link href="/" passHref>
              <a className="white">
                <span className="logo-single" />
              </a>
            </Link>
            <CardTitle className="mb-4">Login</CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>ID</Label>
                    <Field
                      className="form-control"
                      type="text"
                      name="id"
                      validate={validateId}
                    />
                    {errors.id && touched.id && (
                      <div className="invalid-feedback d-block">
                        {errors.id}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>Password</Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link href="/user/forgot-password">
                      {t('forgot-password-question')}
                    </Link>
                    <Button
                      type="submit"
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">LOGIN</span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

LoginPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation()(LoginPage);
