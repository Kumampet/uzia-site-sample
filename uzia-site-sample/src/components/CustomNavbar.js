import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import _forEach from 'lodash/forEach';
import _isEmpty from 'lodash/isEmpty';
import { replaceURLPublicPath } from '../common';

class CustomNavbar extends Component {
  static propTypes = {
    fixed: PropTypes.string,
    sticky: PropTypes.string,
    flex: PropTypes.bool,
    navlinkMargin: PropTypes.string
  }

  static defaultProps = {
    flex: false,
    navlinkMargin: 'sm'
  }

  constructor(props) {
    super(props);
    this.state = {
      navlinkMargin: props.navlinkMargin,
      flex: props.flex,
      fixed: props.fixed,
      sticky: props.sticky,
      bg: props.bg || 'light',
      expand: props.size || 'md',
      navNemuData: props.navMenuData,
      navbarMenus: []
    }
  }

  componentDidMount() {
    this._isMounted = true;
    // ヘッダーの要素の文言設定を読み込む
    const { navNemuData } = this.state;
    this.getHeaderTitle(navNemuData.mainTitle);
    this.createNavbarMenus(navNemuData.menuLists);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // JSONからヘッダーメニュータイトル取得
  getHeaderTitle = (title) => {
    this.setState({ brandTitle: title });
  }

  /**
   * type: link -> NavLinkに設定
   * type: dropdown -> NavDropdownに設定
   */
  createNavbarMenus = (menuLists = []) => {
    const menus = [];
    _forEach(menuLists, (menu) => {
      const type = menu.type;
      switch (type) {
        case "link":
          menus.push(this.createNavbarLink(menu));
          break;
        case "dropdown":
          menus.push(this.createNavbarDropdown(menu));
          break;
        default:
          return null;
      }
    });
    this.setState({ navbarMenus: menus });
  }

  createNavbarLink = (menuLink = {}) => {
    const linkName = menuLink.name;
    const linkHref = replaceURLPublicPath(menuLink.href);
    return linkName && linkHref ? <Nav.Link href={linkHref}>{linkName}</Nav.Link> : null;
  }

  createNavbarDropdown = (dropdown = {}) => {
    const dropDownTitle = dropdown.name
    const dropdownButtonArray = dropdown.buttonArray;
    const newDropdown = [];
    _forEach(dropdownButtonArray, (_dropdown) => {
      const type = _dropdown.type;
      switch (type) {
        case "item":
          newDropdown.push(this.createNavbarDropdownItem(_dropdown));
          break;
        case "dropdown":
          newDropdown.push(this.createNavbarDropdown(_dropdown));
          break;
        case "devider":
          newDropdown.push(<NavDropdown.Divider />);
          break;
        default:
          return null;
      }
    });
    return (
      <NavDropdown title={dropDownTitle} id={"basic-nav-dropdown" + dropDownTitle}>
        {_forEach(newDropdown, dropItem => dropItem)}
      </NavDropdown>
    );
  }

  createNavbarDropdownItem = (item = {}) => {
    const itemName = item.name;
    const itemHref = replaceURLPublicPath(item.href);
    return itemName && itemHref ? <NavDropdown.Item href={itemHref}>{itemName}</NavDropdown.Item> : null;
  }

  render() {
    const { brandTitle, navbarMenus, fixed, sticky, flex, navlinkMargin } = this.state;

    return (
      <Navbar className="main-navbar" variant="dark" bg="dark" expand="lg" fixed={fixed} sticky={sticky}>
        {/* Flex */}
        {flex ? (
          <React.Fragment>
            <Container className="d-flex flex-row flex-nowrap">
              <Navbar.Brand href={replaceURLPublicPath("/")}>{brandTitle}</Navbar.Brand>
              {!_isEmpty(navbarMenus) && (
                <React.Fragment>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </React.Fragment>
              )}
            </Container>
            {!_isEmpty(navbarMenus) && (
              <Container>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className={classnames("me-auto", {
                    "navlink-margin-sm": navlinkMargin === 'sm',
                    "navlink-margin-md": navlinkMargin === 'md',
                    "navlink-margin-lg": navlinkMargin === 'lg',
                  })}
                  >
                    {_forEach(navbarMenus, menu => menu)}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            )}
          </React.Fragment>
        ) : (
          <Container>
            <Navbar.Brand href={replaceURLPublicPath("/")}>{brandTitle}</Navbar.Brand>
            {!_isEmpty(navbarMenus) && (
              <React.Fragment>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className={classnames("me-auto", {
                    "navlink-margin-sm": navlinkMargin === 'sm',
                    "navlink-margin-md": navlinkMargin === 'md',
                    "navlink-margin-lg": navlinkMargin === 'lg',
                  })}
                  >
                    {_forEach(navbarMenus, menu => menu)}
                  </Nav>
                </Navbar.Collapse>
              </React.Fragment>
            )}
          </Container>
        )}
      </Navbar>
    );
  }
}

export default CustomNavbar;