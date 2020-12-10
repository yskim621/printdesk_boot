import { useState } from 'react';
import Router from 'next/router';
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
} from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';

import UserLayout from '../../src/containers/layout/user';
import TopNavigation from '../../src/components/TopNavigation';
import BottomNavigation from '../../src/components/BottomNavigation';
import { Colxx } from '../../src/components/common/CustomBootstrap';

const Init = () => {
  const [name, setName] = useState('');
  const [bottomNavHidden, setBottomNavHidden] = useState(false);

  const topNavClick = (stepItem, push) => {
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 2 <= steps.indexOf(step)) {
      setBottomNavHidden(true);
    }
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  return (
    <UserLayout>
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <CardBody className="wizard wizard-default">
              <Wizard>
                <TopNavigation
                  className="justify-content-center"
                  disableNav={false}
                  topNavClick={topNavClick}
                />
                <Steps>
                  <Step id="step1" name="회사정보" desc="">
                    <div className="wizard-basic-step">
                      <Form>
                        <FormGroup>
                          <Label>명칭</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>명칭</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>명칭</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>명칭</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormGroup>
                      </Form>
                    </div>
                  </Step>
                  <Step id="step2" name="기본설정" desc="">
                    <div className="wizard-basic-step">
                      <Form>
                        <FormGroup>
                          <Label>명칭</Label>
                          <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormGroup>
                      </Form>
                    </div>
                  </Step>
                  <Step id="step4" hideTopNav>
                    <div className="wizard-basic-step text-center">
                      <h2 className="mb-2">Thank You!</h2>
                      <p>Your registration completed successfully!</p>
                    </div>
                  </Step>
                </Steps>
                {bottomNavHidden && (
                  <div className="wizard-buttons justify-content-center">
                    <Button
                      color="primary"
                      onClick={() => Router.push('/login')}
                    >
                      로그인 페이지로 이동
                    </Button>
                  </div>
                )}
                <BottomNavigation
                  onClickNext={onClickNext}
                  onClickPrev={onClickPrev}
                  // className={`justify-content-center ${
                  //   bottomNavHidden && 'invisible'
                  // }`}
                  className="justify-content-center"
                  prevLabel="Back"
                  nextLabel="Next"
                />
              </Wizard>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </UserLayout>
  );
};

export default Init;
