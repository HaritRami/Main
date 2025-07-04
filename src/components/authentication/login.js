import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function Login() {
  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-4 text-center">Login</h3>
              <Form>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email address<span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password<span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control type="password" placeholder="Password" required />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Login <Link to="/home"></Link>
                  </Button>
                </div>

                <div className="text-center">
                  Don't have an account? <Link to="/register">Register</Link>
                </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
