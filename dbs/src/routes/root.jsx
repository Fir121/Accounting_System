import { Outlet, Link } from "react-router-dom";
import { Navbar, Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import ListIcon from '@rsuite/icons/List';
import LineChartIcon from '@rsuite/icons/LineChart';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import "rsuite/dist/rsuite.min.css";

const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props}>
      <Navbar.Brand href="#">RSUITE</Navbar.Brand>
      <Nav onSelect={onSelect} activeKey={activeKey}>
        <Nav.Item eventKey="1" icon={<HomeIcon />}>
          Home
        </Nav.Item>
        <Nav.Item eventKey="2">News</Nav.Item>
        <Nav.Item eventKey="3">Products</Nav.Item>
        <Nav.Menu title="About">
          <Nav.Item eventKey="4">Company</Nav.Item>
          <Nav.Item eventKey="5">Team</Nav.Item>
          <Nav.Item eventKey="6">Contact</Nav.Item>
        </Nav.Menu>
      </Nav>
      <Nav pullRight>
        <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default function Root() {
    return (
      <>
        <div style={{ width: 240 }} id='sidebar'>
          <Sidenav>
            <Sidenav.Body>
              <Nav activeKey="1">
                <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<ListIcon />}>
                  Transactions
                </Nav.Item>
                <Nav.Menu eventKey="3" title="Report" icon={<LineChartIcon />}>
                  <Nav.Item eventKey="3-1">R1</Nav.Item>
                  <Nav.Item eventKey="3-2">R2</Nav.Item>
                  <Nav.Item eventKey="3-3">R2</Nav.Item>
                  <Nav.Item eventKey="3-4">R4</Nav.Item>
                </Nav.Menu>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </>
    );
  }