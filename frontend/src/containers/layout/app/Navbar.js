import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { MenuIcon, MobileMenuIcon } from '../../../components/svg';
import Notifications from './Notifications';
import { i18n, withTranslation } from '../../../i18n';

import koFlag from '../../../../public/assets/img/flags/korea.jpg';
import usFlag from '../../../../public/assets/img/flags/us.jpg';
import cnFlag from '../../../../public/assets/img/flags/china.jpg';

const Navbar = ({ t }) => {
  const [language, setLanguage] = useState('ko');

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <a className="menu-button d-none d-md-block">
          <MenuIcon />
        </a>
        <a className="menu-button-mobile d-xs-block d-sm-block d-md-none">
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
