import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Sidenav, Nav, Container, Header, Content, Sidebar } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import ListIcon from '@rsuite/icons/List';
import LineChartIcon from '@rsuite/icons/LineChart';
import ModelIcon from '@rsuite/icons/Model';
import 'rsuite/dist/rsuite-no-reset.min.css';
import React, { useCallback } from "react";
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import ExitIcon from '@rsuite/icons/Exit';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import * as HelperFunctions from "../code";



const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav>
        <Nav.Menu
          noCaret
          placement="topStart"
          trigger="click"
          title={<HelpOutlineIcon style={{ width: 20, height: 20 }} size="sm" />}
        >
          <Nav.Item>Delete Account</Nav.Item>
          <Nav.Item>Help</Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default function Root() {
    var activeKey = null
    var setActiveKey = null

    if (window.location.pathname === '/'){
      HelperFunctions.redirect("dashboard");
      return <></>;
    }

    if (HelperFunctions.getUserData()){
      [activeKey, setActiveKey] = React.useState(window.location.pathname.substring(1));
    }
    else{
      HelperFunctions.redirect("login");
      return <></>;
    }

    function signOut(){
      localStorage.clear(); 
      HelperFunctions.redirect("login");
    }
    

    function handleActiveKey(e){
      if (e !== undefined){
        setActiveKey(e);
      }
    }

    const navigate = useNavigate();
    const goDashboard = useCallback((e) => navigate('/dashboard', {replace: true}), [navigate]);
    const goAccounts = useCallback((e) => navigate('/accounts', {replace: true}), [navigate]);
    const goTransactions = useCallback((e) => navigate('/transactions', {replace: true}), [navigate]);
    const goJournal = useCallback((e) => navigate('/journal', {replace: true}), [navigate]);
    const goAccountReport = useCallback((e) => navigate('/accountreport', {replace: true}), [navigate]);

    const [expand, setExpand] = React.useState(true);

    return (
      <>
      <Container>
        <Header>
          <Navbar appearance="inverse" style={{ backgroundColor: '#18191c' }}>
            <Navbar.Brand>
              <a style={{fontWeight:"bolder",color:"#ac1c24",fontSize:"20px"}}>TCF Accounting</a>
            </Navbar.Brand>
            <Nav pullRight onClick={signOut}>
              <Nav.Item icon={<ExitIcon />}>Sign Out</Nav.Item>
            </Nav>
          </Navbar>
        </Header>
        <Container>
          <Sidebar
            style={{ display: 'flex', flexDirection: 'column', backgroundColor:'#272b36' }}
            width={expand ? 260 : 56}
            collapsible
          >
          <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
            <Sidenav.Body>
              <Nav activeKey={activeKey} onSelect={handleActiveKey}>
                <Nav.Item eventKey="dashboard" icon={<DashboardIcon />} onClick={goDashboard}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="accounts" icon={<ModelIcon />} onClick={goAccounts}>
                  Accounts
                </Nav.Item>
                <Nav.Item eventKey="transactions" icon={<ListIcon />} onClick={goTransactions}>
                  Transactions
                </Nav.Item>
                <Nav.Menu eventKey="report" title="Report" icon={<LineChartIcon />}>
                  <Nav.Item eventKey="journal" onClick={goJournal}>Journal</Nav.Item>
                  <Nav.Item eventKey="accountreport" onClick={goAccountReport}>Account</Nav.Item>
                </Nav.Menu>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
          </Sidebar>
          <Content style={{padding:'20px'}}>
            <Outlet />
          </Content>
        </Container>
      </Container>
      </>
    );
  }