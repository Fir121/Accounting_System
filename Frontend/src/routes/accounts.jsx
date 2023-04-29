import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBContainer, MDBRow, MDBCol, MDBTypography  } from 'mdb-react-ui-kit';
import * as HelperFunctions from "../code";
import { Modal, Button, Placeholder, Form , Input, SelectPicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

export default function Accounts() {
    const [data, setData] = React.useState([]);
    function editAccountLocal(account_id){
      setIsEdit({"state":true,"account_id":account_id});
      HelperFunctions.editAccountReader(account_id, setFormValue, setOpen);
    }
    
    const mystyle = {
        backgroundColor: '#55acee',
        'boxShadow': 'none',
      };

    function handleDelete(){
      HelperFunctions.deleteAccount(isEdit.account_id,handleClose,setData);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setFormValue({
        name: "",
        type: "",
        description: "",
    });
    setNameErrorVisible(false);
      setTypeErrorVisible(false);
    setIsEdit({"state":false});
      setOpen(false);
    }
    const [formValue, setFormValue] = React.useState({
        name: "",
        type: "",
        description: "",
    })

    function changeFormValue(e){
      for(var i in e){
        formValue[i] = e[i]
      }
      setFormValue(formValue);
    }
    const formRef = React.useRef()

    function handleSubmit(){
      setNameErrorVisible(false);
      setTypeErrorVisible(false);
      console.log(formValue);
      var flag = false;
      if (HelperFunctions.isEmpty(formValue["name"])){
        setNameErrorVisible(true);
        flag = true;
      }
      if (HelperFunctions.isEmpty(formValue["type"])){
        setTypeErrorVisible(true);
        flag = true;
      }
      if (!flag){
        if (isEdit.state){
          HelperFunctions.editAccount(isEdit.account_id,formValue["name"], formValue["type"], formValue["description"],handleClose,setData);
        }
        else{
          HelperFunctions.createAccount(formValue["name"], formValue["type"], formValue["description"],handleClose,setData);
        }
      }
    }
    const selectData = ['Asset', 'Income', 'Equity', 'Money', 'Liability', 'Expense'].map(item => ({
      label: item,
      value: item
    }));

    const [isEdit, setIsEdit] = React.useState({"state":false});
    const editStyle = {
      display: (isEdit.state) ? "":"none"
    }

    React.useEffect(() => {
      HelperFunctions.getAccounts(setData);
    }, []);

    const [nameErrorVisible, setNameErrorVisible] = React.useState(false);
    const [typeErrorVisible, setTypeErrorVisible] = React.useState(false);
    const nameErrorMessage = nameErrorVisible ? 'Name is required' : null;
    const typeErrorMessage = typeErrorVisible ? 'Type is required' : null;
    return (
      <>
            <Modal overflow={true} open={open} onClose={handleClose}>
            <Modal.Header>
              <Modal.Title>Add Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form ref={formRef} onChange={changeFormValue}>
              <Form.Group controlId="name">
                <Form.ControlLabel>Account Name</Form.ControlLabel>
                <Form.Control name="name" errorMessage={nameErrorMessage} defaultValue={formValue["name"]}/>
              </Form.Group>
              <Form.Group controlId="type">
                <Form.ControlLabel>Account Type:</Form.ControlLabel>
                <Form.Control name="type" accepter={SelectPicker} data={selectData} errorMessage={typeErrorMessage} defaultValue={formValue["type"]}/>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.ControlLabel>Account Description</Form.ControlLabel>  
                <Form.Control rows={5} name="description" accepter={Textarea} defaultValue={formValue["description"]}/>
                <Form.HelpText>Account Description is not required</Form.HelpText>
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
        <MDBCol start><MDBTypography tag='h2'>Accounts</MDBTypography></MDBCol>
        <MDBCol size="auto" end>
        <MDBBtn style={ mystyle } onClick={handleOpen}>
            <MDBIcon fab icon='plus'/> New
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
                <MDBBtn color='link' rounded size='sm' onClick={()=>{editAccountLocal(dataObj.account_id)}}>
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