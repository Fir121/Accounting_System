import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBTypography  } from 'mdb-react-ui-kit';

export default function Accounts() {
    const mystyle = {
        backgroundColor: '#55acee',
        'boxShadow': 'none',
      };
    return (
        <MDBContainer fluid>
        <MDBRow>
        <MDBCol start><MDBTypography tag='h2'>Accounts</MDBTypography></MDBCol>
        <MDBCol size="auto" end>
        <MDBBtn style={ mystyle } href='#'>
            <MDBIcon fab icon='plus' /> New
        </MDBBtn>
        </MDBCol>
        </MDBRow>
        <MDBRow><div style={{visibility:'hidden'}}>ABC</div></MDBRow>
        <MDBRow>
        <MDBTable align='middle'>
          <MDBTableHead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Type</th>
              <th scope='col'>Transaction Count</th>
              <th scope='col'>Status</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>Cash</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>Assets</p>
              </td>
              <td>10</td>
              <td>
                <MDBBadge color='success' pill>
                  Active
                </MDBBadge>
              </td>
              <td>
                <MDBBtn color='link' rounded size='sm'>
                  Edit
                </MDBBtn>
              </td>
            </tr>
            <tr>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>Sales</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>Assets</p>
              </td>
              <td>5</td>
              <td>
                <MDBBadge color='success' pill>
                  Active
                </MDBBadge>
              </td>
              <td>
                <MDBBtn color='link' rounded size='sm'>
                  Edit
                </MDBBtn>
              </td>
            </tr>
            <tr>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>Wages</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>Expense</p>
              </td>
              <td>3</td>
              <td>
                <MDBBadge color='danger' pill>
                  Inactive
                </MDBBadge>
              </td>
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