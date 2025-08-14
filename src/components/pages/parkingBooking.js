import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

function BookParking() {
  return (
    <Container className="my-5">
      <h2>Book Your Parking Spot</h2>
      <Card className="p-4 mt-3 shadow-sm">
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="location" className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter destination" required />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="date" className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="time" className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" required />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Search Parking
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default BookParking;
