import * as HelperFunctions from "../code";
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBTypography  } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";

export default function Dashboard() {
    const contStyle = {
        backgroundColor:"rgb(39, 43, 54)",
        color: "darkgray",
        borderRadius: "20px",
        margin: "20px",
        padding:"40px",
        textAlign:"center",
        cursor:"pointer"
    };
    const navigate = useNavigate();
    const goAccounts = useCallback((e) => HelperFunctions.redirect("accounts"));
    const goTransactions = useCallback((e) => HelperFunctions.redirect("transactions"));
    const goJournal = useCallback((e) => HelperFunctions.redirect("journal"));
    return (
    <MDBContainer fluid>
        <MDBRow>
            <h2>Hi Welcome To The {HelperFunctions.getUser()} Dashboard</h2>
        </MDBRow>
        <MDBRow><div style={{visibility:'hidden'}}>ABC</div></MDBRow>
        <MDBRow><div style={{visibility:'hidden'}}>ABC</div></MDBRow>
        <MDBRow><div style={{visibility:'hidden'}}>ABC</div></MDBRow>
        <MDBRow><div style={{visibility:'hidden'}}>ABC</div></MDBRow>
        <MDBRow><div style={{visibility:'hidden'}}>ABC</div></MDBRow>
        <MDBRow>
            <h3>Get Your Work Done</h3>
            <MDBCol style={contStyle} onClick={goAccounts}>
                Accounts
            </MDBCol>
            <MDBCol style={contStyle} onClick={goTransactions}>
                Transactions
            </MDBCol>
            <MDBCol style={contStyle} onClick={goJournal}>
                Reports
            </MDBCol>
        </MDBRow>
    </MDBContainer>);
}