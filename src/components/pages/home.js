import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavigationBar from "../layout/navbar";
import Footer from "../layout/footer";

function Home() {
    return (
        <>
            <NavigationBar />
            <div style={{ position: "relative", width: "100%", height: "400px", overflow: "hidden" }}>
                <img
                    className="d-block mx-auto"
                    src="https://www.shutterstock.com/shutterstock/videos/1088845337/thumb/1.jpg?ip=x480"
                    alt="Parking Banner"
                    style={{ width: "85%", height: "400px", objectFit: "cover", opacity: 0.3 }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        textAlign: "center",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        padding: "20px",
                        borderRadius: "8px"
                    }}
                >
                    <h2>Find Your Perfect Parking Spot</h2>
                    <p>Book your parking online in seconds with WheelSpace.</p>
                    <Button variant="primary" href="/book-parking">Book Now</Button>
                </div>
            </div>

            <Container className="my-5">
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <img
                            src="https://images.pexels.com/photos/16551615/pexels-photo-16551615.jpeg?cs=srgb&dl=pexels-badun-16551615.jpg&fm=jpg"
                            alt="Parking"
                            className="img-fluid rounded"
                        />
                    </Col>
                    <Col md={6}>
                        <h2>Seamless Parking Booking</h2>
                        <p>
                            WheelSpace lets you easily find, reserve, and pay for parking
                            spots near your destination. Enjoy hassle-free parking anytime,
                            anywhere.
                        </p>
                    </Col>
                </Row>

                <Row className="mb-5">
                    {[
                        {
                            title: "Real-Time Availability",
                            text: "View available slots instantly and reserve with a tap.",
                            image: "https://www.designindaba.com/sites/default/files/styles/thumbnail/public/news/klok2_0.jpg?itok=Zp8oRZ3F"
                        },
                        {
                            title: "Secure Payments",
                            text: "Pay online securely and get instant confirmation.",
                            image: "https://imgk.timesnownews.com/story/GettyImages-1096021192.jpg?tr=w-400,h-300,fo-auto"
                        },
                        {
                            title: "Easy Management",
                            text: "Manage your bookings and history from your profile.",
                            image: "https://www.cenango.com/wp-content/uploads/2022/10/API-Development-Easy-Data-Capture.jpg"
                        }
                    ].map((card, index) => (
                        <Col md={4} key={index}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={card.image}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <div>
                                        <Card.Title className="text-center">{card.title}</Card.Title>
                                        <Card.Text className="text-center">
                                            {card.text}
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>


                <Row className="align-items-center mb-5">
                    <Col md={6} className="order-md-2">
                        <img
                            src="https://www.smartertravel.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2022/09/AdobeStock_507888017-700x500.jpeg.webp"
                            alt="Mobile Booking"
                            className="img-fluid rounded"
                        />
                    </Col>
                    <Col md={6} className="order-md-1">
                        <h2>Book From Anywhere</h2>
                        <p>
                            With WheelSpace, you can search and book parking spaces right
                            from your mobile phone. It's fast, easy, and secure.
                        </p>
                        <Button variant="success" as="a" href="/book-parking">
                            Start Booking
                        </Button>
                    </Col>
                </Row>

                <Row className="text-center">
                    <Col>
                        <h3 className="mb-4">What Our Users Say</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm">
                            <Card.Body>
                                <Card.Text>
                                    "WheelSpace has made parking so easy for me. I can book spots
                                    in advance and never worry about finding parking!"
                                </Card.Text>
                                <Card.Footer className="bg-white border-0">
                                    <strong>- Priya S.</strong>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm">
                            <Card.Body>
                                <Card.Text>
                                    "I love the real-time availability feature. No more driving
                                    around wasting time!"
                                </Card.Text>
                                <Card.Footer className="bg-white border-0">
                                    <strong>- Amit K.</strong>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm">
                            <Card.Body>
                                <Card.Text>
                                    "Secure payment and smooth experience every time I book."
                                </Card.Text>
                                <Card.Footer className="bg-white border-0">
                                    <strong>- Neha R.</strong>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default Home;
