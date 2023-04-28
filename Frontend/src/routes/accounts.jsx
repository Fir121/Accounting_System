import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBTypography  } from 'mdb-react-ui-kit';
import * as HelperFunctions from "../code";

export default function Accounts() {
    const [data, setData] = React.useState([]);
    function editAccount(account_id){
      console.log(account_id);
    }
    React.useEffect(() => {
      setData(HelperFunctions.getAccounts());
    }, []);
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
              <th scope='col'>Status</th>
              <th></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
          {data.map((dataObj, index) => {
            return (
              <tr>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='ms-3'>
                    <p className='fw-bold mb-1'>{dataObj.account_name}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className='fw-normal mb-1'>{dataObj.account_type}</p>
              </td>
              <td>
                <MDBBadge color='success' pill>
                  Active
                </MDBBadge>
              </td>
              <td>
                <MDBBtn color='link' rounded size='sm' onClick={editAccount(dataObj.account_id)}>
                  Edit
                </MDBBtn>
              </td>
            </tr>
            );
          })}
          </MDBTableBody>
        </MDBTable>
        </MDBRow>
        </MDBContainer>
      );
}