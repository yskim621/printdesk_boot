import { useState, createRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Field, Form as FormikForm, Formik } from 'formik';
import {
  Row,
  Card,
  CardTitle,
  FormGroup,
  Label,
  CardBody,
  Input,
  Form as ReactstrapForm,
  Spinner,
} from 'reactstrap';
import { Steps, Step } from 'react-albus';

import UserLayout from '../src/containers/layout/user';
import { Colxx } from '../src/components/common/CustomBootstrap';
import TopNavigation from '../src/components/TopNavigation';
import BottomNavigation from '../src/components/BottomNavigation';

import {
  validIdSelector,
  loadingSelector,
  errorSelector,
} from '../src/store/Register/selectors';
import { checkIdAction, registerAction } from '../src/store/Register/actions';

const Wizard = dynamic(() => import('react-albus').then((mod) => mod.Wizard), {
  ssr: false,
});

const validateCompanyName = (value) => {
  let error;
  if (!value) {
    error = '업체명을 입력해주세요';
  }
  return error;
};

const Register = () => {
  const dispatch = useDispatch();
  const checkId = (id) => {
    dispatch(checkIdAction(id));
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

  const formRef = createRef();
  const [companyName, setCompanyName] = useState('');
  const [companyNumber, setCompanyNumber] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [businessCondition, setBusinessCondition] = useState('');
  const [sectors, setSectors] = useState('');
  const [address, setAddress] = useState('');
  const [taxBill, setTaxBill] = useState('');
  const [manager, setManager] = useState('');
  const [tel, setTel] = useState('');

  const [bottomNavHidden, setBottomNavHidden] = useState(false);

  const register = (form) => {
    dispatch(registerAction(form));
  };
  const loading = useSelector(loadingSelector());
  const error = useSelector(errorSelector());

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }

    if (steps.indexOf(step) === 0) {
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
          !confirmPasswordErrorMessage
        ) {
          step.isDone = true;
          goToNext();
        }
      });
    } else if (steps.indexOf(step) === 1) {
      const form = formRef.current;
      form.submitForm().then(() => {
        if (!form.errors.companyName && form.touched.companyName) {
          step.isDone = true;
          goToNext();
          setBottomNavHidden(true);

          register({
            id,
            email,
            password,
            companyName: form.values.companyName,
            companyNumber: form.values.companyNumber,
            representativeName: form.values.representativeName,
            businessCondition: form.values.businessCondition,
            sectors: form.values.sectors,
            address: form.values.address,
            taxBill: form.values.taxBill,
            manager: form.values.manager,
            tel: form.values.tel,
          });
        }
      });
    }
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }

    if (steps.indexOf(step) === 1) {
      const form = formRef.current;
      form.submitForm().then(() => {
        setCompanyName(form.values.companyName);
        setCompanyNumber(form.values.companyNumber);
        setRepresentativeName(form.values.representativeName);
        setBusinessCondition(form.values.businessCondition);
        setSectors(form.values.sectors);
        setAddress(form.values.address);
        setTaxBill(form.values.taxBill);
        setManager(form.values.manager);
        setTel(form.values.tel);
        goToPrev();
      });
    }
  };

  return (
    <UserLayout>
      <Row className="h-100">
        <Colxx xxx="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side">
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
              <CardTitle className="mb-4">Register</CardTitle>

              <CardBody className="wizard wizard-default">
                <Wizard>
                  <TopNavigation
                    className="justify-content-center"
                    disableNav
                  />
                  <Steps>
                    {/* TODO: 항목 추가/삭제 및 이메일 중복체크 추가여부 검토 */}
                    <Step id="step1" name="기본정보" desc="">
                      <ReactstrapForm className="av-tooltip tooltip-label-bottom">
                        <FormGroup className="form-group has-float-label mb-4">
                          <Label>ID</Label>
                          <Input
                            type="text"
                            value={id}
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
                            value={email}
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
                            value={password}
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
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onFocus={() => setConfirmPasswordFocus(true)}
                          />
                          {confirmPasswordErrorMessage && (
                            <div className="invalid-feedback d-block">
                              {confirmPasswordErrorMessage}
                            </div>
                          )}
                        </FormGroup>
                      </ReactstrapForm>
                    </Step>
                    {/* TODO: validation 추가해야됨. input 형태 바꿔야됨(이메일, 주소). */}
                    <Step id="step2" name="사업자정보" desc="">
                      <Formik
                        innerRef={formRef}
                        initialValues={{
                          companyName,
                          companyNumber,
                          representativeName,
                          businessCondition,
                          sectors,
                          address,
                          taxBill,
                          manager,
                          tel,
                        }}
                        onSubmit={() => {}}
                      >
                        {({ errors, touched }) => (
                          <FormikForm className="av-tooltip tooltip-label-bottom">
                            <FormGroup className="form-group has-float-label">
                              <Label>업체명</Label>
                              <Field
                                className="form-control"
                                name="companyName"
                                validate={validateCompanyName}
                              />
                              {errors.companyName && touched.companyName && (
                                <div className="invalid-feedback d-block">
                                  {errors.companyName}
                                </div>
                              )}
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>사업자등록번호</Label>
                              <Field
                                className="form-control"
                                name="companyNumber"
                              />
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>대표자명</Label>
                              <Field
                                className="form-control"
                                name="representativeName"
                              />
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>업태</Label>
                              <Field
                                className="form-control"
                                name="businessCondition"
                              />
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>업종</Label>
                              <Field className="form-control" name="sectors" />
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>사업장소재지</Label>
                              <Field className="form-control" name="address" />
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>세금계산서</Label>
                              <Field className="form-control" name="taxBill" />
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>담당자명</Label>
                              <Field className="form-control" name="manager" />
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>연락처</Label>
                              <Field className="form-control" name="tel" />
                            </FormGroup>
                          </FormikForm>
                        )}
                      </Formik>
                    </Step>
                    <Step id="step3" hideTopNav>
                      <div className="wizard-basic-step text-center pt-3">
                        {loading ? (
                          <div>
                            <Spinner color="primary" className="mb-1" />
                            <p>loading...</p>
                          </div>
                        ) : (
                          <>
                            {error ? (
                              <p>{error}</p>
                            ) : (
                              <>
                                <h2 className="mb-2">Thank You!</h2>
                                <p>Your registration completed successfully!</p>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </Step>
                  </Steps>
                  <BottomNavigation
                    onClickNext={onClickNext}
                    onClickPrev={onClickPrev}
                    className={`justify-content-center ${
                      bottomNavHidden && 'invisible'
                    }`}
                    prevLabel="Back"
                    nextLabel="Next"
                  />
                </Wizard>
              </CardBody>
            </div>
          </Card>
        </Colxx>
      </Row>
    </UserLayout>
  );
};

export default Register;
