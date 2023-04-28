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
    function editAccount(account_id){
      console.log(account_id);
    }
    
    const mystyle = {
        backgroundColor: '#55acee',
        'boxShadow': 'none',
      };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formValue, setFormValue] = React.useState({
        name: "",
        type: "",
        description: "",
    })
    const formRef = React.useRef()

    function handleSubmit(){
      HelperFunctions.createAccount(formValue["name"], formValue["type"], formValue["description"],setOpen,setData)
    }
    const selectData = ['Asset', 'Income', 'Equity', 'Money', 'Liability', 'Expense'].map(item => ({
      label: item,
      value: item
    }));

    React.useEffect(() => {
      HelperFunctions.getAccounts(setData);
    }, []);
    return (
      <>
            <Modal overflow={true} open={open} onClose={handleClose}>
            <Modal.Header>
              <Modal.Title>Add Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form ref={formRef} onChange={setFormValue}>
              <Form.Group controlId="name">
                <Form.ControlLabel>Account Name</Form.ControlLabel>
                <Form.Control name="name" />
                <Form.HelpText>Account Name is required</Form.HelpText>
              </Form.Group>
              <Form.Group controlId="type">
                <Form.ControlLabel>Account Type:</Form.ControlLabel>
                <Form.Control name="type" accepter={SelectPicker} data={selectData} />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.ControlLabel>Account Description</Form.ControlLabel>  
                <Form.Control rows={5} name="description" accepter={Textarea} />
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
        </>

      );
}