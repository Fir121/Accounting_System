import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCheckbox } from 'mdb-react-ui-kit';
import { DatePicker } from 'rsuite';

export default function Transactions() {
    const mystyle = {
        backgroundColor: '#55acee',
        'boxShadow': 'none',
      };
    const [visible, setVisible] = React.useState(true);
    var mystyle2 = {
        backgroundColor: '#96038f',
        'boxShadow': 'none',
         visibility : !visible ? "hidden" : "showing",
        marginRight: '20px'
      };
    const styles = { width: 200, display: 'block', marginBottom: 10 };
    return (
        <MDBContainer fluid>
        <MDBRow>
        <MDBCol start><MDBTypography tag='h2'>Transactions</MDBTypography></MDBCol>
        <MDBCol size="auto" end>
        <MDBBtn style={ mystyle2 } href='#'>
            <MDBIcon fab icon='plus' /> Add Description
        </MDBBtn>
        <MDBBtn style={ mystyle } href='#'>
            <MDBIcon fab icon='plus' /> New
        </MDBBtn>
        </MDBCol>
        </MDBRow>
        <MDBRow><div style={{visibility:'hidden'}}>ABC<br></br>BCD</div></MDBRow>
        <MDBRow>
        <MDBRow>
        <MDBCol start></MDBCol>
        <MDBCol size="auto" center><DatePicker size="lg" placeholder="Large" style={styles} /></MDBCol>
        <MDBCol end></MDBCol>
        </MDBRow>
        <MDBTable align='middle'>
            <MDBTableHead light>
                <tr>
                <th scope='col'>
                    <MDBCheckbox></MDBCheckbox>
                </th>
                <th scope='col'>Amount</th>
                <th scope='col'>Type</th>
                <th scope='col'>From Account</th>
                <th scope='col'>To Account</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                <tr>
                <th scope='col'>
                    <MDBCheckbox></MDBCheckbox>
                </th>
                <td>1000</td>
                <td>Debit</td>
                <td>Cash</td>
                <td>Wages</td>
                <td>
                <MDBBtn color='link' rounded size='sm'>
                  Edit
                </MDBBtn>
              </td>
                </tr>
                <tr>
                <th scope='col'>
                    <MDBCheckbox></MDBCheckbox>
                </th>
                <td>3000</td>
                <td>Debit</td>
                <td>Bank</td>
                <td>Wages</td>
                <td>
                <MDBBtn color='link' rounded size='sm'>
                  Edit
                </MDBBtn>
              </td>
                </tr>
                <tr>
                <th scope='col'>
                    <MDBCheckbox></MDBCheckbox>
                </th>
                <td>1000</td>
                <td>Credit</td>
                <td>Sales</td>
                <td>Cash</td>
                <td>
                <MDBBtn color='link' rounded size='sm'>
                  Edit
                </MDBBtn>
              </td>
                </tr>
            </MDBTableBody>
        </MDBTable>
        </MDBRow>
        </MDBContainer>
      );
}