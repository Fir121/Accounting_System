import {
    Container,
    Header,
    Content,
    Nav,
    Navbar,
    FlexboxGrid,
    Panel,
    Form,
    ButtonToolbar,
    Button,
} from "rsuite";
import "rsuite/dist/rsuite.min.css";
import PeopleBranchIcon from '@rsuite/icons/PeopleBranch';
import React from "react";
import * as HelperFunctions from "../code";

export default function Signup() {
    if (HelperFunctions.getUserData()){
        HelperFunctions.redirect("dashboard");
        return <></>;
    }


    const [formValue, setFormValue] = React.useState({
        company: "",
    })
    const formRef = React.useRef()

    const handleSubmit = () => {
        HelperFunctions.signup(formValue["company"]);
    }

    return (
            <Container>
                <Header>
                <Navbar appearance="inverse" style={{ backgroundColor: '#18191c' }}>
                    <Navbar.Brand>
                    <a style={{fontWeight:"bolder",color:"#ac1c24",fontSize:"20px"}}>TCF Accounting</a>
                    </Navbar.Brand>
                    <Nav pullRight>
                    <Nav.Item icon={<PeopleBranchIcon />} href="/login">Log In</Nav.Item>
                    </Nav>
                </Navbar>
                </Header>
                <div style={{ textAlign: "center"}}>
                    <br></br><br></br><br></br><br></br>
                    <h2>TCF Accounting</h2>
                    <h5 style={{ color: "blue" }}>
                        Your Accounting Partner
                    </h5>
                </div>
                <Content>
                    <FlexboxGrid justify="center"
                        style={{ margin: 20 }}>
                        <FlexboxGrid.Item>
                            <Panel header={<h3>Sign Up</h3>} bordered>
                                <Form ref={formRef} onChange={setFormValue} onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.ControlLabel>
                                            Company
                                        </Form.ControlLabel>
                                        <Form.Control name="company" 
                                            type="company" required />
                                        <Form.HelpText tooltip>
                                            Required
                                        </Form.HelpText>
                                    </Form.Group>
                                    <Form.Group>
                                        <ButtonToolbar>
                                            <Button appearance="primary"
                                                color="blue" type="submit">
                                                Sign Up
                                            </Button>
                                        </ButtonToolbar>
                                    </Form.Group>
                                </Form>
                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
            </Container>
    );
}