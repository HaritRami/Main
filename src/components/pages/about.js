import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">About WheelSpace</h2>
      <p className="text-center mx-auto" style={{ maxWidth: "900px" }}>
        WheelSpace is a cutting-edge platform revolutionizing the way people find parking.
        Our goal is to eliminate the frustration of searching for parking spots in crowded cities.
        With real-time availability, secure payment options, and an intuitive interface,
        WheelSpace makes parking hassle-free and efficient.
      </p>
      <p className="text-center mx-auto" style={{ maxWidth: "900px" }}>
        Founded by a passionate team of technologists and urban mobility enthusiasts,
        WheelSpace empowers drivers to save time, reduce fuel consumption, and contribute
        to a more sustainable future. Whether you're commuting to work or exploring a new city,
        WheelSpace ensures that your parking needs are met with ease and reliability.
      </p>

      <h3 className="text-center mt-5 mb-4">Meet Our Team</h3>
      <Row className="g-4 justify-content-center">
        <Col xs={12} md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/300x300"
              alt="Harit Rami"
              className="img-fluid"
            />
            <Card.Body className="text-center">
              <Card.Title>Harit Rami</Card.Title>
              <Card.Text>Team Lead & Full Stack Developer</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/300x300"
              alt="Member 2"
              className="img-fluid"
            />
            <Card.Body className="text-center">
              <Card.Title>Member 2 Name</Card.Title>
              <Card.Text>Frontend Developer</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/300x300"
              alt="Member 3"
              className="img-fluid"
            />
            <Card.Body className="text-center">
              <Card.Title>Member 3 Name</Card.Title>
              <Card.Text>Backend Developer</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
