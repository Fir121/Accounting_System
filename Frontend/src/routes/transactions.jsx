import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCheckbox } from 'mdb-react-ui-kit';
import { DatePicker } from 'rsuite';
import * as HelperFunctions from "../code";
import { Modal, Button, Placeholder, Form , Input, SelectPicker, InputNumber, InputPicker,Checkbox,CheckboxGroup } from 'rsuite';
import "rsuite/dist/rsuite.min.css";

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

export default function Transactions() {
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState([]);
    function editTransaction(transaction_id){
      console.log(transaction_id);
    }
    function editDescription(description_id){
      console.log(description_id);
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      HelperFunctions.getAccountsList(setSelectData);
      setOpen(true);
    }
    const handleDescription = () => {
      setOpen2(true);
    }

    const handleClose = () => {
      setFormValue({
        name: "",
        amount: "",
        from: "",
        to: "",
    });
      setOpen(false);
      setAmountErrorVisible(false);
      setTypeErrorVisible(false);
      setFromErrorVisible(false);
      setToErrorVisible(false);
    }
    const [selectData, setSelectData] = React.useState([]);
    const [datevalue, setDateValue] = React.useState(new Date());
    const changeDateValue = (e) => {
      setDateValue(e);
      HelperFunctions.getTransactions(e, setData);
      HelperFunctions.getDescriptions(e,setData2);
    }
    const [formValue, setFormValue] = React.useState({
        name: "",
        amount: "",
        from: "",
        to: "",
    })
    const formRef = React.useRef()

    function handleSubmit(){
      setAmountErrorVisible(false);
      setTypeErrorVisible(false);
      setFromErrorVisible(false);
      setToErrorVisible(false);
      var flag = false;
      if (HelperFunctions.isEmpty(formValue["type"])){
        setTypeErrorVisible(true);
        flag = true;
      }
      if (HelperFunctions.isEmpty(formValue["amount"])){
        setAmountErrorVisible(true);
        flag = true;
      }
      if (HelperFunctions.isEmpty(formValue["from"])){
        setFromErrorVisible(true);
        flag = true;
      }
      if (HelperFunctions.isEmpty(formValue["to"])){
        setToErrorVisible(true);
        flag = true;
      }
      if (!flag){
        HelperFunctions.createTransaction(datevalue, formValue["amount"], formValue["type"], formValue["from"], formValue["to"],setOpen,setData,setFormValue)
      }
    }
    
    const inputData = ['Debit', 'Credit'].map(item => ({
      label: item,
      value: item
    }));

    React.useEffect(() => {
      HelperFunctions.getTransactions(datevalue, setData);
      HelperFunctions.getDescriptions(datevalue, setData2);
    }, []);

    const mystyle = {
        backgroundColor: '#55acee',
        'boxShadow': 'none',
      };
    const [checkboxValue, setCheckboxValue] = React.useState([]);
    var mystyle2 = {
        backgroundColor: '#96038f',
        'boxShadow': 'none',
         visibility : (checkboxValue.length == 0) ? "hidden" : "visible",
        marginRight: '20px'
      };
    const styles = { width: 200, display: 'block', marginBottom: 10 };

    const [typeErrorVisible, setTypeErrorVisible] = React.useState(false);
    const [amountErrorVisible, setAmountErrorVisible] = React.useState(false);
    const [fromErrorVisible, setFromErrorVisible] = React.useState(false);
    const [toErrorVisible, setToErrorVisible] = React.useState(false);
    const typeErrorMessage = typeErrorVisible ? 'Type is required' : null;
    const amountErrorMessage = amountErrorVisible ? 'Amount is required' : null;
    const fromErrorMessage = fromErrorVisible ? 'From is required' : null;
    const toErrorMessage = toErrorVisible ? 'To is required' : null;

    
    const [open2, setOpen2] = React.useState(false);
    const handleClose2 = () => {
      setFormValue({
        description: ""
    });
    setDescErrorVisible(false);
      setOpen2(false);
    }
    const [formValue2, setFormValue2] = React.useState({
        name: "",
        type: "",
        description: "",
    })
    const formRef2 = React.useRef()

    function handleSubmit2(){
      setDescErrorVisible(false);
      var flag = false;
      if (HelperFunctions.isEmpty(formValue2["description"])){
        setDescErrorVisible(true);
        flag = true;
      }
      if (!flag){
        HelperFunctions.setDescription(formValue2["description"],checkboxValue,setOpen2,setFormValue2,setSelectData,datevalue,setData2)
      }
    }

    const [descErrorVisible, setDescErrorVisible] = React.useState(false);
    const descErrorMessage = descErrorVisible ? 'Description is required' : null;

    return (
      <>
      <Modal overflow={true} open={open2} onClose={handleClose2}>
            <Modal.Header>
              <Modal.Title>Add Description</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form ref={formRef2} onChange={setFormValue2}>
            <Form.Group controlId="description">
                <Form.ControlLabel>Description</Form.ControlLabel>  
                <Form.Control rows={5} name="description" accepter={Textarea} errorMessage={descErrorMessage}/>
              </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleSubmit2} appearance="primary">
                Create
              </Button>
              <Button onClick={handleClose2} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>

       <Modal overflow={true} open={open} onClose={handleClose}>
            <Modal.Header>
              <Modal.Title>Add Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form ref={formRef} onChange={setFormValue}>
              <Form.Group controlId="type">
                <Form.ControlLabel>Transaction Type:</Form.ControlLabel>
                <Form.Control name="type" accepter={InputPicker} data={inputData} errorMessage={typeErrorMessage}/>
              </Form.Group>
              <Form.Group controlId="amount">
                <Form.ControlLabel>Transaction Amount:</Form.ControlLabel>
                <Form.Control name="amount" accepter={InputNumber} defaultValue={0} step={0.01} errorMessage={amountErrorMessage}/>
              </Form.Group>
              <Form.Group controlId="from">
                <Form.ControlLabel>From Account:</Form.ControlLabel>
                <Form.Control name="from" accepter={SelectPicker} data={selectData} errorMessage={fromErrorMessage}/>
              </Form.Group>
              <Form.Group controlId="to">
                <Form.ControlLabel>To Account:</Form.ControlLabel>
                <Form.Control name="to" accepter={SelectPicker} data={selectData} errorMessage={toErrorMessage}/>
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
        <MDBBtn style={ mystyle2 } onClick={handleDescription}>
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
                        <CheckboxGroup inline name="checkboxList" value={checkboxValue}
                        onChange={value => {
                          setCheckboxValue(value);
                        }}>
                          <Checkbox value={dataObj.transaction_id}></Checkbox>
                        </CheckboxGroup>
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
        <MDBRow>

        </MDBRow>
        <MDBRow>
        <MDBTable align='middle'>
            <MDBTableHead light>
                <tr>
                <th scope='col'>Description</th>
                <th scope='col'>Transaction Count</th>
                <th></th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
            
                {data2.map((dataObj2, index2) => {
                return (
                  <tr>
                    <td>{dataObj2.description}</td>
                    <td>{dataObj2.transaction_count}</td>
                    <td>
                    <MDBBtn color='link' rounded size='sm' onClick={editDescription(dataObj2.description_id)}>
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