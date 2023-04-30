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
      setIsEdit({"state":true,"transaction_id":transaction_id});
      HelperFunctions.editTransactionReader(transaction_id, setFormValue, handleOpen);
    }
    const [isEdit, setIsEdit] = React.useState({"state":false});
    const editStyle = {
      display: (isEdit.state) ? "":"none"
    }
    function handleDelete(){
      HelperFunctions.deleteTransaction(isEdit.transaction_id,datevalue,handleClose,setData,setData2);
    }

    function editDescription(description_id){
      setIsEdit2({"state":true,"description_id":description_id});
      HelperFunctions.editDescriptionReader(description_id, setFormValue2, setOpen2);
    }
    const [isEdit2, setIsEdit2] = React.useState({"state":false});
    const editStyle2 = {
      display: (isEdit2.state) ? "":"none"
    }
    function handleDelete2(){
      HelperFunctions.deleteDescription(isEdit2.description_id,datevalue,handleClose2,setData2);
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
        amount: 0,
        from: "",
        to: "",
    });
    setIsEdit({"state":false});
      setOpen(false);
      setAmountErrorVisible(false);
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
        amount: 0,
        from: "",
        to: "",
    })
    function changeFormValue(e){
      for(var i in e){
        formValue[i] = e[i]
      }
      setFormValue(formValue);
    }
    function changeFormValue2(e){
      for(var i in e){
        formValue2[i] = e[i]
      }
      setFormValue2(formValue2);
    }
    const formRef = React.useRef()

    function handleSubmit(){
      setAmountErrorVisible(false);
      setFromErrorVisible(false);
      setToErrorVisible(false);
      var flag = false;
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
        if (isEdit.state){
          HelperFunctions.editTransaction(datevalue, isEdit.transaction_id, formValue["amount"], formValue["from"], formValue["to"],setData,handleClose)
        }
        else{
          HelperFunctions.createTransaction(datevalue, formValue["amount"], formValue["from"], formValue["to"],setData,handleClose) 
        }
      }
    }

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

    const [amountErrorVisible, setAmountErrorVisible] = React.useState(false);
    const [fromErrorVisible, setFromErrorVisible] = React.useState(false);
    const [toErrorVisible, setToErrorVisible] = React.useState(false);
    const amountErrorMessage = amountErrorVisible ? 'Amount is required' : null;
    const fromErrorMessage = fromErrorVisible ? 'From is required' : null;
    const toErrorMessage = toErrorVisible ? 'To is required' : null;

    
    const [open2, setOpen2] = React.useState(false);
    const handleClose2 = (e) => {
      setFormValue2({
        description: ""
    });
    setDescErrorVisible(false);
    setIsEdit2({"state":false});
      setOpen2(false);
      if (e){setCheckboxValue([]);}
      
      
    }
    const [formValue2, setFormValue2] = React.useState({
        description: ""
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
        if (isEdit2.state){
          HelperFunctions.editDescription(isEdit2.description_id, formValue2["description"],handleClose2,datevalue,setData2)
        }
        else{
          HelperFunctions.setDescription(formValue2["description"],checkboxValue,handleClose2,datevalue,setData2)
        }
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
            <Form ref={formRef2} onChange={changeFormValue2}>
            <Form.Group controlId="description">
                <Form.ControlLabel>Description</Form.ControlLabel>  
                <Form.Control rows={5} name="description" accepter={Textarea} errorMessage={descErrorMessage} defaultValue={formValue2["description"]}/>
              </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleSubmit2} appearance="primary">
                {(isEdit2.state) ? "Edit": "Create"}
              </Button>
              <Button onClick={handleDelete2} style={editStyle2} appearance="primary" color="red">
                Delete
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
            <Form ref={formRef} onChange={changeFormValue}>
              <Form.Group controlId="amount">
                <Form.ControlLabel>Transaction Amount:</Form.ControlLabel>
                <Form.Control name="amount" accepter={InputNumber} step={0.01} errorMessage={amountErrorMessage} defaultValue={formValue["amount"]}/>
              </Form.Group>
              <Form.Group controlId="from">
                <Form.ControlLabel>From Account:</Form.ControlLabel>
                <Form.Control name="from" accepter={SelectPicker} data={selectData} errorMessage={fromErrorMessage} defaultValue={formValue["from"]}/>
              </Form.Group>
              <Form.Group controlId="to">
                <Form.ControlLabel>To Account:</Form.ControlLabel>
                <Form.Control name="to" accepter={SelectPicker} data={selectData} errorMessage={toErrorMessage} defaultValue={formValue["to"]}/>
              </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleSubmit} appearance="primary">
                {(isEdit.state) ? "Edit": "Create"}
              </Button>
              <Button onClick={handleDelete} style={editStyle} appearance="primary" color="red">
                Delete
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
        <MDBCol size="auto" center><DatePicker size="lg" appearance="default" placeholder="Large" style={styles} value={datevalue} onChange={changeDateValue} /></MDBCol>
        <MDBCol end></MDBCol>
        </MDBRow>
        <MDBTable align='middle'>
            <MDBTableHead dark>
                <tr>
                <th scope='col'>
                    
                </th>
                <th scope='col'>Amount</th>
                <th scope='col'>From Account</th>
                <th scope='col'>To Account</th>
                <th></th> 
                </tr>
            </MDBTableHead>
            <MDBTableBody className='tablebody'>
            
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
                    <td>{dataObj.from_account}</td>
                    <td>{dataObj.to_account}</td>
                    <td>
                    <MDBBtn color='link' rounded size='sm' onClick={()=>{editTransaction(dataObj.transaction_id)}}>
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
            <MDBTableHead dark>
                <tr>
                <th scope='col'>Description</th>
                <th scope='col'>Transaction Count</th>
                <th></th>
                </tr>
            </MDBTableHead>
            <MDBTableBody className='tablebody'>
            
                {data2.map((dataObj2, index2) => {
                return (
                  <tr>
                    <td>{dataObj2.description}</td>
                    <td>{dataObj2.transaction_count}</td>
                    <td>
                    <MDBBtn color='link' rounded size='sm' onClick={()=>{editDescription(dataObj2.description_id)}}>
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