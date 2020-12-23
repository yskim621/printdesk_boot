import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import {
  containerClassnamesSelector,
  menuClickCountSelector,
  selectedMenuHasSubItemsSelector,
} from '../../../store/Layout/selectors';
import {
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
} from '../../../store/Layout/actions';

import { MenuIcon, MobileMenuIcon } from '../../../components/svg';
import Notifications from './Notifications';
import { i18n, withTranslation } from '../../../i18n';

import koFlag from '../../../../public/assets/img/flags/korea.jpg';
import usFlag from '../../../../public/assets/img/flags/us.jpg';
import cnFlag from '../../../../public/assets/img/flags/china.jpg';

const Navbar = ({ t }) => {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState('ko');
  const clickOnMobileMenu = (containerClassnames) => {
    dispatch(clickOnMobileMenuAction(containerClassnames));
  };
  const containerClassnames = useSelector(containerClassnamesSelector());
  const menuClickCount = useSelector(menuClickCountSelector());
  const setContainerClassnames = (
    clickIndex,
    strCurrentClasses,
    selectedMenuHasSubItems
  ) => {
    dispatch(
      setContainerClassnamesAction(
        clickIndex,
        strCurrentClasses,
        selectedMenuHasSubItems
      )
    );
  };
  const selectedMenuHasSubItems = useSelector(
    selectedMenuHasSubItemsSelector()
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnames(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenu(_containerClassnames);
  };

  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <a
          className="menu-button d-none d-md-block"
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
          style={{ cursor: 'pointer' }}
          aria-hidden
        >
          <MenuIcon />
        </a>
        <a
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
          style={{ cursor: 'pointer' }}
          aria-hidden
        >
          <MobileMenuIcon />
        </a>

        <div className="d-inline-block">
          <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">{language.toUpperCase()}</span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <DropdownItem onClick={() => setLanguage('ko')}>
                <img src={koFlag} alt="flag" height="16" className="mr-1" />
                {t('korean')}
              </DropdownItem>
              <DropdownItem onClick={() => setLanguage('cn')}>
                <img src={cnFlag} alt="flag" height="16" className="mr-1" />
                {t('chinese')}
              </DropdownItem>
              <DropdownItem onClick={() => setLanguage('en')}>
                <img src={usFlag} alt="flag" height="16" className="mr-1" />
                {t('english')}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <Link href="/" passHref>
        <a className="navbar-logo">
          <span className="logo d-none d-xs-block" />
          <span className="logo-mobile d-block d-xs-none" />
        </a>
      </Link>

      <div className="navbar-right">
        <div className="header-icons d-inline-block align-middle">
          <Notifications />
        </div>
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span className="name mr-1">Sarah Kortney</span>
              <span>
                <img alt="Profile" src="/assets/img/profiles/l-1.jpg" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <DropdownItem>Account</DropdownItem>
              <DropdownItem>Features</DropdownItem>
              <DropdownItem>History</DropdownItem>
              <DropdownItem>Support</DropdownItem>
              <DropdownItem divider />
              {/* TODO: sign out onclick handler 구현 */}
              <DropdownItem
                onClick={() => {
                  console.log('logout');
                }}
              >
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
};

export default withTranslation('navbar')(Navbar);
