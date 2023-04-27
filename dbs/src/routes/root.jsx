import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import ListIcon from '@rsuite/icons/List';
import LineChartIcon from '@rsuite/icons/LineChart';
import ModelIcon from '@rsuite/icons/Model';
import 'rsuite/dist/rsuite-no-reset.min.css';
import React, { useCallback } from "react";

function redirect(loc){
  document.location.href="/"+loc;
}

export default function Root() {
    var activeKey = null
    var setActiveKey = null
    if (window.location.pathname !== '/'){
      [activeKey, setActiveKey] = React.useState(window.location.pathname.substring(1));
    }
    else{
      redirect("dashboard")
    }

    function handleActiveKey(e){
      if (e !== undefined){
        setActiveKey(e);
        //redirect(e)
      }
    }

    const navigate = useNavigate();
    const goDashboard = useCallback((e) => navigate('/dashboard', {replace: true}), [navigate]);
    const goAccounts = useCallback((e) => navigate('/accounts', {replace: true}), [navigate]);
    const goTransactions = useCallback((e) => navigate('/transactions', {replace: true}), [navigate]);

    return (
      <>
        <div style={{ width: 240 }} id='sidebar'>
          <Sidenav>
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
                  <Nav.Item eventKey="report-1">R1</Nav.Item>
                  <Nav.Item eventKey="report-2">R2</Nav.Item>
                  <Nav.Item eventKey="report-3">R2</Nav.Item>
                  <Nav.Item eventKey="report-4">R4</Nav.Item>
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