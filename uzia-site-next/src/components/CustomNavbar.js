import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import _forEach from 'lodash/forEach';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

export default function CustomNavbar(props) {
  console.log({props})
  const {
    navlinkMargin,
    flex,
    fixed,
    sticky,
    bg = 'light',
    expand = 'md',
    navMenuData,
  } = props;

  const [brandTitle, setBrandTitle] = useState("");
  const [navbarMenus, setNavbarMenus] = useState([]);

  const createNavbarLink = (menuLink = {}) => {
    const linkName = menuLink.name;
    const linkHref = menuLink.href;
    return linkName && linkHref ? <Nav.Link href={linkHref}>{linkName}</Nav.Link> : null;
  }

  const createNavbarDropdown = (dropdown = {}) => {
    const dropDownTitle = dropdown.name
    const dropdownButtonArray = dropdown.buttonArray;
    const newDropdown = [];
    _forEach(dropdownButtonArray, (_dropdown) => {
      const type = _dropdown.type;
      switch (type) {
        case "item":
          newDropdown.push(createNavbarDropdownItem(_dropdown));
          break;
        case "dropdown":
          newDropdown.push(createNavbarDropdown(_dropdown));
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

  const createNavbarDropdownItem = (item = {}) => {
    const itemName = item.name;
    const itemHref = item.href;
    return itemName && itemHref ? <NavDropdown.Item href={itemHref}>{itemName}</NavDropdown.Item> : null;
  }

  const createNavbarMenus = (menuLists = []) => {
    const menus = [];
    _forEach(menuLists, (menu) => {
      const type = menu.type;
      switch (type) {
        case "link":
          menus.push(createNavbarLink(menu));
          break;
        case "dropdown":
          menus.push(createNavbarDropdown(menu));
          break;
        default:
          return null;
      }
    });
    setNavbarMenus(menus);
  }

  useEffect(() => {
    createNavbarMenus(_get(navMenuData, "menuLists"));
    setBrandTitle(_get(navMenuData, "mainTitle"))
  }, []);

  return (
    <Navbar className="main-navbar" variant="dark" bg="dark" expand="lg" fixed={fixed} sticky={sticky}>
      {/* Flex */}
      {flex ? (
        <React.Fragment>
          <Container className="d-flex flex-row flex-nowrap">
            <Navbar.Brand href="/">{brandTitle}</Navbar.Brand>
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
          <Navbar.Brand href="/">{brandTitle}</Navbar.Brand>
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
