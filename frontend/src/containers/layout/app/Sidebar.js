import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ReactDOM from 'react-dom';
import Router from 'next/router';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';
import { Nav, NavItem, Collapse } from 'reactstrap';
import classnames from 'classnames';

import {
  getMenuAction,
  menuChangeHasSubItemStatusAction,
  setContainerClassnamesAction,
  addContainerClassnameAction,
} from '../../../store/Layout/actions';
import {
  menuSelector,
  selectedMenuHasSubItemsSelector,
  containerClassnamesSelector,
  menuClickCountSelector,
  menuHiddenBreakpointSelector,
  subHiddenBreakpointSelector,
} from '../../../store/Layout/selectors';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParentMenu: '',
      viewingParentMenu: '',
      collapsedMenus: [],
    };
  }

  componentDidMount() {
    const { menuItems, getMenu } = this.props;
    if (!menuItems) getMenu();
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    Router.events.on('routeChangeStart', this.handleScroll);
    Router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentDidUpdate(prevProps) {
    const { menuItems } = this.props;
    if (prevProps.menuItems !== menuItems) {
      this.setSelectedLiActive(this.setHasSubItemStatus);
    }

    this.handleProps();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    this.removeEvents();
    Router.events.off('routeChangeStart', this.handleScroll);
    Router.events.off('routeChangeComplete', this.handleRouteChange);
  }

  handleScroll = (url) => {
    if (url !== Router.pathname) {
      window.scrollTo(0, 0);
    }
  };

  handleRouteChange = () => {
    this.setSelectedLiActive(this.setHasSubItemStatus);
  };

  getContainer = () => {
    // eslint-disable-next-line react/no-find-dom-node
    return ReactDOM.findDOMNode(this);
  };

  getIsHasSubItem = () => {
    const { selectedParentMenu } = this.state;
    const { menuItems } = this.props;
    const menuItem = menuItems.find((x) => x.id === selectedParentMenu * 1);
    if (menuItem)
      return !!(menuItem && menuItem.children && menuItem.children.length > 0);
    return false;
  };

  toggle = () => {
    const {
      changeSelectedMenuHasSubItems,
      containerClassnames,
      menuClickCount,
      setContainerClassnames,
    } = this.props;

    const hasSubItems = this.getIsHasSubItem();
    changeSelectedMenuHasSubItems(hasSubItems);
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter((x) => x !== '')
      : '';
    let clickIndex = -1;

    if (!hasSubItems) {
      if (
        currentClasses.includes('menu-default') &&
        (menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
      ) {
        clickIndex = 1;
      } else if (
        currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 2 || menuClickCount === 3)
      ) {
        clickIndex = 0;
      } else if (
        currentClasses.includes('menu-hidden') ||
        currentClasses.includes('menu-mobile')
      ) {
        clickIndex = 0;
      }
    } else if (
      currentClasses.includes('menu-sub-hidden') &&
      menuClickCount === 3
    ) {
      clickIndex = 2;
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      clickIndex = 0;
    }
    if (clickIndex >= 0) {
      setContainerClassnames(clickIndex, containerClassnames, hasSubItems);
    }
  };

  setHasSubItemStatus = () => {
    const { changeSelectedMenuHasSubItems } = this.props;
    const hasSubmenu = this.getIsHasSubItem();
    changeSelectedMenuHasSubItems(hasSubmenu);
    this.toggle();
  };

  setSelectedLiActive = (callback) => {
    const oldli = document.querySelector('.sub-menu  li.active');
    if (oldli != null) {
      oldli.classList.remove('active');
    }

    const oldliSub = document.querySelector('.third-level-menu  li.active');
    if (oldliSub != null) {
      oldliSub.classList.remove('active');
    }

    /* set selected parent menu */
    const thirdLevelMenu = document.querySelectorAll('.third-level-menu');
    let selectedMenu = null;

    thirdLevelMenu.forEach((menu) => {
      const tag = menu.getElementsByTagName('a');
      tag.forEach((anchor) => {
        if (anchor.pathname === Router.pathname) {
          selectedMenu = anchor;
        }
      });
    });

    if (selectedMenu) {
      const selectedLi = selectedMenu.parentElement;
      selectedLi.classList.add('active');

      const selectedUl = selectedLi.parentElement.parentElement.parentElement;
      selectedUl.classList.add('active');

      this.setState(
        {
          selectedParentMenu: selectedUl.parentElement.getAttribute(
            'data-parent'
          ),
        },
        callback
      );
    }
  };

  handleDocumentClick = (e) => {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('menu-button') ||
        e.target.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.parentElement.classList.contains(
          'menu-button-mobile'
        ))
    ) {
      isMenuClick = true;
    }
    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return;
    }
    this.setState({
      viewingParentMenu: '',
    });
    this.toggle();
  };

  addEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  };

  removeEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  };

  handleProps = () => {
    this.addEvents();
  };

  getMenuClassesForResize = (classes) => {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
    let nextClasses = classes.split(' ').filter((x) => x !== '');
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile');
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden');
      }
    } else {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter((x) => x !== 'menu-sub-hidden');
      }
    }
    return nextClasses;
  };

  handleWindowResize = (event) => {
    if (event && !event.isTrusted) {
      return;
    }
    const {
      containerClassnames,
      selectedMenuHasSubItems,
      setContainerClassnames,
    } = this.props;
    const nextClasses = this.getMenuClassesForResize(containerClassnames);
    setContainerClassnames(0, nextClasses.join(' '), selectedMenuHasSubItems);
  };

  openSubMenu = (e, menuItem) => {
    const {
      changeSelectedMenuHasSubItems,
      setContainerClassnames,
      addContainerClassname,
    } = this.props;
    const selectedParent = menuItem.id;
    const hasSubMenu = menuItem.children && menuItem.children.length > 0;
    changeSelectedMenuHasSubItems(hasSubMenu);
    if (!hasSubMenu) {
      this.setState({
        viewingParentMenu: selectedParent,
        selectedParentMenu: selectedParent,
      });
      this.toggle();
    } else {
      e.preventDefault();

      const { containerClassnames, menuClickCount } = this.props;
      const currentClasses = containerClassnames
        ? containerClassnames.split(' ').filter((x) => x !== '')
        : '';

      if (!currentClasses.includes('menu-mobile')) {
        if (
          currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          setContainerClassnames(3, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          setContainerClassnames(2, containerClassnames, hasSubMenu);
        } else if (
          currentClasses.includes('menu-default') &&
          !currentClasses.includes('menu-sub-hidden') &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          setContainerClassnames(0, containerClassnames, hasSubMenu);
        }
      } else {
        addContainerClassname('sub-show-temporary', containerClassnames);
      }
      this.setState({
        viewingParentMenu: selectedParent,
      });
    }
  };

  toggleMenuCollapse = (e, menuKey) => {
    e.preventDefault();

    const { collapsedMenus } = this.state;
    if (collapsedMenus.indexOf(menuKey) > -1) {
      this.setState({
        collapsedMenus: collapsedMenus.filter((x) => x !== menuKey),
      });
    } else {
      collapsedMenus.push(menuKey);
      this.setState({
        collapsedMenus,
      });
    }
    return false;
  };

  render() {
    const {
      selectedParentMenu,
      viewingParentMenu,
      collapsedMenus,
    } = this.state;
    const { menuItems } = this.props;
    return (
      <div className="sidebar">
        {menuItems && (
          <>
            <div className="main-menu">
              <div className="scroll" style={{ overflowY: 'scroll' }}>
                <Nav vertical className="list-unstyled">
                  {menuItems.map((item) => {
                    return (
                      <NavItem
                        key={item.id}
                        className={classnames({
                          active:
                            (selectedParentMenu * 1 === item.id &&
                              viewingParentMenu === '') ||
                            viewingParentMenu === item.id,
                        })}
                      >
                        <a
                          onClick={(e) => this.openSubMenu(e, item)}
                          data-flag={item.id}
                          style={{ cursor: 'pointer' }}
                          aria-hidden
                        >
                          <i className={item.newIcon} /> {item.name}
                        </a>
                      </NavItem>
                    );
                  })}
                </Nav>
              </div>
            </div>
            <div className="sub-menu">
              <div className="scroll" style={{ overflowY: 'scroll' }}>
                {menuItems.map((item) => (
                  <Nav
                    key={item.id}
                    className={classnames({
                      'd-block':
                        (selectedParentMenu === item.id &&
                          viewingParentMenu === '') ||
                        viewingParentMenu === item.id,
                    })}
                    data-parent={item.id}
                  >
                    {item.children &&
                      item.children.length > 0 &&
                      item.children.map((child, index) => (
                        <NavItem
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${item.id}_${index}`}
                          className={`${
                            child.children && child.children.length > 0
                              ? 'has-sub-item'
                              : ''
                          }`}
                        >
                          {child.children && child.children.length > 0 ? (
                            <>
                              <Link href={child.url} passHref>
                                <a
                                  className={`rotate-arrow-icon opacity-50 ${
                                    collapsedMenus.indexOf(
                                      `${item.id}_${index}`
                                    ) === -1
                                      ? ''
                                      : 'collapsed'
                                  }`}
                                  id={`${item.id}_${index}`}
                                  onClick={(e) =>
                                    this.toggleMenuCollapse(
                                      e,
                                      `${item.id}_${index}`
                                    )
                                  }
                                  aria-hidden
                                >
                                  <i className="simple-icon-arrow-down" />{' '}
                                  {child.name}
                                </a>
                              </Link>

                              <Collapse
                                isOpen={
                                  collapsedMenus.indexOf(
                                    `${item.id}_${index}`
                                  ) === -1
                                }
                              >
                                <Nav className="third-level-menu">
                                  {child.children.map(
                                    (thirdSub, thirdIndex) => {
                                      return (
                                        <NavItem
                                          // eslint-disable-next-line react/no-array-index-key
                                          key={`${item.id}_${index}_${thirdIndex}`}
                                        >
                                          <Link href={thirdSub.url} passHref>
                                            <a>
                                              <i className={thirdSub.newIcon} />{' '}
                                              {thirdSub.name}
                                            </a>
                                          </Link>
                                        </NavItem>
                                      );
                                    }
                                  )}
                                </Nav>
                              </Collapse>
                            </>
                          ) : (
                            <Link href={child.url} passHref>
                              <a>
                                <i className={child.newIcon} /> {child.name}
                              </a>
                            </Link>
                          )}
                        </NavItem>
                      ))}
                  </Nav>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  menuItems: menuSelector(),
  containerClassnames: containerClassnamesSelector(),
  selectedMenuHasSubItems: selectedMenuHasSubItemsSelector(),
  menuClickCount: menuClickCountSelector(),
  menuHiddenBreakpoint: menuHiddenBreakpointSelector(),
  subHiddenBreakpoint: subHiddenBreakpointSelector(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getMenu: () => dispatch(getMenuAction()),
    setContainerClassnames: (
      clickIndex,
      strCurrentClasses,
      selectedMenuHasSubItems
    ) =>
      dispatch(
        setContainerClassnamesAction(
          clickIndex,
          strCurrentClasses,
          selectedMenuHasSubItems
        )
      ),
    changeSelectedMenuHasSubItems: (hasSubItems) =>
      dispatch(menuChangeHasSubItemStatusAction(hasSubItems)),
    addContainerClassname: (classname, strCurrentClasses) =>
      dispatch(addContainerClassnameAction(classname, strCurrentClasses)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Sidebar);
