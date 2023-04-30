import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBTypography  } from 'mdb-react-ui-kit';
import * as HelperFunctions from "../code";
import "rsuite/dist/rsuite.min.css";
import { DatePicker } from 'rsuite';

export default function Accounts() {
    const [datevalue, setDateValue] = React.useState(new Date());
    const changeDateValue = (e) => {
      setDateValue(e);
      HelperFunctions.getDailyJournal(e, setData);
    }
    const styles = { width: 200, display: 'block', marginBottom: 10 };
    const [data,setData] = React.useState([]);
    React.useEffect(() => {
      HelperFunctions.getDailyJournal(datevalue, setData);
    }, []);

    return (
      <>
        <MDBContainer fluid>
        <MDBRow>
        <MDBCol start><MDBTypography tag='h2'>Daily Journal</MDBTypography></MDBCol>
        </MDBRow>
        <MDBRow><div style={{visibility:'hidden'}}>ABC</div></MDBRow>
        <MDBRow>
        <MDBRow>
        <MDBCol start></MDBCol>
        <MDBCol size="auto" center><DatePicker size="lg" appearance="default" placeholder="Large" style={styles} value={datevalue} onChange={changeDateValue} /></MDBCol>
        <MDBCol end></MDBCol>
        </MDBRow>
        <MDBTable align='middle'>
          <MDBTableHead dark>
            <tr>
              <th scope='col'>S. No.</th>
              <th scope='col'>Particulars</th>
              <th scope='col'>Debit</th>
              <th scope='col'>Credit</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody className='tablebody'>
          {data.map((dataObj, index) => {
            return (
              <tr>
              <td>
                <p className='fw-normal mb-1'>{dataObj.sno}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{dataObj.particular}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{dataObj.debit}</p>
              </td>
              <td>
                <p className='fw-normal mb-1'>{dataObj.credit}</p>
              </td>
            </tr>
            );
          })}
          </MDBTableBody>
        </MDBTable>
        </MDBRow>
        </MDBContainer>
        </>

      );
}