import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Card,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Input,
} from 'reactstrap';
import Link from 'next/link';

import UserLayout from '../../src/containers/layout/user';
import { Colxx } from '../../src/components/common/CustomBootstrap';

import {
  checkIdAction,
  registerAction,
} from '../../src/store/Register/actions';
import {
  validIdSelector,
  loadingSelector,
} from '../../src/store/Register/selectors';

const Register = () => {
  const dispatch = useDispatch();
  const checkId = (value) => {
    dispatch(checkIdAction(value));
  };
  const validId = useSelector(validIdSelector());
  const [id, setId] = useState('');
  const [idFocus, setIdFocus] = useState(false);
  const [idErrorMessage, setIdErrorMessage] = useState('');

  useEffect(() => {
    if (idFocus) {
      if (!id) {
        setIdErrorMessage('id is required');
      } else if (id.length < 4) {
        setIdErrorMessage('required to be more than 3');
      } else {
        checkId(id);
        if (!validId) {
          setIdErrorMessage('this id is already used');
        } else {
          setIdErrorMessage('');
        }
      }
    }
  }, [id, idFocus, validId]);

  const [email, setEmail] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  useEffect(() => {
    if (emailFocus) {
      if (!email) {
        setEmailErrorMessage('email is required');
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        setEmailErrorMessage('invalid email format');
      } else {
        setEmailErrorMessage('');
      }
    }
  }, [email, emailFocus]);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [
    confirmPasswordErrorMessage,
    setConfirmPasswordErrorMessage,
  ] = useState('');

  useEffect(() => {
    if (passwordFocus) {
      if (!password) {
        setPasswordErrorMessage('password is required');
      } else if (password.length < 6) {
        setPasswordErrorMessage('required to be more than 5');
      } else {
        setPasswordErrorMessage('');
      }
    }

    if (confirmPasswordFocus) {
      if (!confirmPassword) {
        setConfirmPasswordErrorMessage('confirm password is required');
      } else if (confirmPassword !== password) {
        setConfirmPasswordErrorMessage('different from the password');
      } else {
        setConfirmPasswordErrorMessage('');
      }
    }
  }, [password, confirmPassword, passwordFocus, confirmPasswordFocus]);

  const register = (id_, email_, password_) => {
    dispatch(registerAction({ id: id_, email: email_, password: password_ }));
  };
  const loading = useSelector(loadingSelector());

  const onSubmit = () => {
    const nullCheck = new Promise((resolve) => {
      if (!id) {
        setIdErrorMessage('id is required');
      }
      if (!email) {
        setEmailErrorMessage('email is required');
      }
      if (!password) {
        setPasswordErrorMessage('password is required');
      }
      if (!confirmPassword) {
        setConfirmPasswordErrorMessage('confirm password is required');
      }
      if (id && email && password && confirmPassword) {
        resolve(true);
      }
    });

    nullCheck.then(() => {
      if (
        !idErrorMessage &&
        !emailErrorMessage &&
        !passwordErrorMessage &&
        !confirmPasswordErrorMessage &&
        !loading
      ) {
        register(id, email, password);
      }
    });
  };

  return (
    <UserLayout>
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
              <p className="white mb-0">
                Please use this form to register. <br />
                If you are a member, please{' '}
                <Link href="/login">
                  <a className="white">login</a>
                </Link>
                .
              </p>
            </div>

            <div className="form-side">
              <Link href="/">
                <a className="white">
                  <span className="logo-single" />
                </a>
              </Link>
              <CardTitle className="mb-4">Register</CardTitle>

              <Form className="av-tooltip tooltip-label-bottom">
                <FormGroup className="form-group has-float-label mb-4">
                  <Label>ID</Label>
                  <Input
                    type="text"
                    onChange={(e) => setId(e.target.value)}
                    onFocus={() => setIdFocus(true)}
                  />
                  {idErrorMessage && (
                    <div className="invalid-feedback d-block">
                      {idErrorMessage}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-float-label mb-4">
                  <Label>E-mail</Label>
                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocus(true)}
                  />
                  {emailErrorMessage && (
                    <div className="invalid-feedback d-block">
                      {emailErrorMessage}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-float-label mb-4">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocus(true)}
                  />
                  {passwordErrorMessage && (
                    <div className="invalid-feedback d-block">
                      {passwordErrorMessage}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-float-label mb-4">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setConfirmPasswordFocus(true)}
                  />
                  {confirmPasswordErrorMessage && (
                    <div className="invalid-feedback d-block">
                      {confirmPasswordErrorMessage}
                    </div>
                  )}
                </FormGroup>

                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    type="button"
                    color="primary"
                    className={`btn-shadow btn-multiple-state ${
                      loading ? 'show-spinner' : ''
                    }`}
                    size="lg"
                    onClick={onSubmit}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">REGISTER</span>
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Colxx>
      </Row>
    </UserLayout>
  );
};

export default Register;
