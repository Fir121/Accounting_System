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
import AdminIcon from '@rsuite/icons/Admin';

export default function Login() {
    return (
            <Container>
                <Header>
                <Navbar appearance="inverse">
                    <Navbar.Brand>
                    <a style={{ color: '#fff' }}>TCF Accounting</a>
                    </Navbar.Brand>
                    <Nav pullRight>
                    <Nav.Item icon={<AdminIcon />} href="/signup">Sign Up</Nav.Item>
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
                            <Panel header={<h3>Login</h3>} bordered>
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
                                                Log in
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