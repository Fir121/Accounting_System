import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCheckbox } from 'mdb-react-ui-kit';
import { DatePicker } from 'rsuite';
import * as HelperFunctions from "../code";
import { Modal, Button, Placeholder, Form , Input, SelectPicker, InputNumber, InputPicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";

export default function Transactions() {
  const [data, setData] = React.useState([]);
    function editTransaction(transaction_id){
      console.log(transaction_id);
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      HelperFunctions.getAccountsList(setSelectData);
      setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const [selectData, setSelectData] = React.useState([]);
    const [datevalue, setDateValue] = React.useState(new Date());
    const changeDateValue = (e) => {
      setDateValue(e);
      HelperFunctions.getTransactions(e, setData);
    }
    const [formValue, setFormValue] = React.useState({
        name: "",
        amount: "",
        from: "",
        to: "",
    })
    const formRef = React.useRef()

    function handleSubmit(){
      HelperFunctions.createTransaction(datevalue, formValue["amount"], formValue["type"], formValue["from"], formValue["to"],setOpen,setData)
    }
    const inputData = ['Debit', 'Credit'].map(item => ({
      label: item,
      value: item
    }));

    React.useEffect(() => {
      HelperFunctions.getTransactions(datevalue, setData);
    }, []);

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
    var mystyle3 = {
        backgroundColor: 'red',
        'boxShadow': 'none',
         visibility : !visible ? "hidden" : "showing",
        marginRight: '20px'
      };
    const styles = { width: 200, display: 'block', marginBottom: 10 };
    return (
      <>
       <Modal overflow={true} open={open} onClose={handleClose}>
            <Modal.Header>
              <Modal.Title>Add Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form ref={formRef} onChange={setFormValue}>
              <Form.Group controlId="type">
                <Form.ControlLabel>Transaction Type:</Form.ControlLabel>
                <Form.Control name="type" accepter={InputPicker} data={inputData} />
              </Form.Group>
              <Form.Group controlId="amount">
                <Form.ControlLabel>Transaction Amount:</Form.ControlLabel>
                <Form.Control name="amount" accepter={InputNumber} defaultValue={0} step={0.01} />
              </Form.Group>
              <Form.Group controlId="from">
                <Form.ControlLabel>From Account:</Form.ControlLabel>
                <Form.Control name="from" accepter={SelectPicker} data={selectData} />
              </Form.Group>
              <Form.Group controlId="to">
                <Form.ControlLabel>To Account:</Form.ControlLabel>
                <Form.Control name="to" accepter={SelectPicker} data={selectData} />
              </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleSubmit} appearance="primary">
                Create
              </Button>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>

        <MDBContainer fluid>
        <MDBRow>
        <MDBCol start><MDBTypography tag='h2'>Transactions</MDBTypography></MDBCol>
        <MDBCol size="auto" end>
        <MDBBtn style={ mystyle3 } href='#'>
            <MDBIcon icon='trash' /> Delete
        </MDBBtn>
        <MDBBtn style={ mystyle2 } href='#'>
            <MDBIcon fab icon='plus' /> Add Description
        </MDBBtn>
        <MDBBtn style={ mystyle } onClick={handleOpen}>
            <MDBIcon fab icon='plus' /> New
        </MDBBtn>
        </MDBCol>
        </MDBRow>
        <MDBRow><div style={{visibility:'hidden'}}>ABC<br></br>BCD</div></MDBRow>
        <MDBRow>
        <MDBRow>
        <MDBCol start></MDBCol>
        <MDBCol size="auto" center><DatePicker size="lg" placeholder="Large" style={styles} value={datevalue} onChange={changeDateValue} /></MDBCol>
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
                <th></th> 
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {data.map((dataObj, index) => {
                return (
                  <tr>
                    <th scope='col'>
                        <MDBCheckbox></MDBCheckbox>
                    </th>
                    <td>{dataObj.transaction_amount}</td>
                    <td>{dataObj.transaction_type}</td>
                    <td>{dataObj.from_account}</td>
                    <td>{dataObj.to_account}</td>
                    <td>
                    <MDBBtn color='link' rounded size='sm' onClick={editTransaction(dataObj.transaction_id)}>
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
        </>
      );
}