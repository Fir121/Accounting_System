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

export default function Signup() {
    return (
            <Container>
                <Header>
                <Navbar appearance="inverse">
                    <Navbar.Brand>
                    <a style={{ color: '#fff' }}>TCF Accounting</a>
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
                                <Form>
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
                                                color="green">
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