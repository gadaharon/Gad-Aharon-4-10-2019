import React, { useContext } from "react";
import { connect } from "react-redux";
import { toggleAnimations } from "../actions/settingsActions";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Switch from "./Switch";

const NavBar = ({ settings, toggleAnimations }) => {
  const { showAnimations } = settings;
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        <Link to="/" className="navbar-brand color-secondary">
          Weather App
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Switch
          label="Animations"
          checked={showAnimations}
          tooltipTitle="Enable or Disable Animations"
          onValueChange={v => toggleAnimations(v)}
        />
        <Nav className="ml-auto">
          <Nav.Item as="li">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="/favorites">
              Favorites
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { toggleAnimations }
)(NavBar);
