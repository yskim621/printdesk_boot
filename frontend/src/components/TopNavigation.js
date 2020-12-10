/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import { WithWizard } from 'react-albus';

const TopNavigation = ({ className, disableNav, topNavClick }) => {
  const getClassName = (steps, step, index, stepItem) => {
    if (steps.indexOf(step) === index) {
      return 'step-doing';
    }
    if (steps.indexOf(step) > index || stepItem.isDone) {
      stepItem.isDone = true;
      return 'step-done';
    }
    return 'step';
  };

  const itemClick = (stepItem, push) => {
    if (disableNav) {
      return;
    }
    topNavClick(stepItem, push);
  };

  return (
    <WithWizard
      render={({ next, previous, step, steps, go, push }) => (
        <ul
          className={`nav nav-tabs ${className}${
            disableNav ? ' disabled' : ''
          }`}
        >
          {steps.map((stepItem, index) => {
            if (!stepItem.hideTopNav) {
              return (
                <li
                  key={`topNavStep_${index}`}
                  className={`nav-item ${getClassName(
                    steps,
                    step,
                    index,
                    stepItem
                  )}`}
                >
                  <a
                    className="nav-link"
                    onClick={() => itemClick(stepItem, push)}
                  >
                    <span>{stepItem.name}</span>
                    <small>{stepItem.desc}</small>
                  </a>
                </li>
              );
            }
            return <span key={`topNavStep_${index}`} />;
          })}
        </ul>
      )}
    />
  );
};

export default TopNavigation;
