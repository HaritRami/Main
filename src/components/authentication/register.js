import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaArrowLeft } from 'react-icons/fa';


function Register() {
  const [step, setStep] = useState(1);

  const [userType, setUserType] = useState('customer');
  const [selectedParkingTypes, setSelectedParkingTypes] = useState({
    twoWheeler: false,
    fourWheeler: false,
  });

  // Controlled inputs for validation
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [totalCapacity, setTotalCapacity] = useState('');
  const [availableParking, setAvailableParking] = useState('');
  const [twoWheelerCount, setTwoWheelerCount] = useState('');
  const [fourWheelerCount, setFourWheelerCount] = useState('');

  const handleParkingTypeChange = (e) => {
    const { name, checked } = e.target;
    setSelectedParkingTypes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // STEP 1: Basic Details validation
  const handleNext = (e) => {
    e.preventDefault();

    if (age === '' || Number(age) <= 0 || Number(age) > 100) {
      Swal.fire('Validation Error', 'Age must be between 1 and 100.', 'error');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      Swal.fire('Validation Error', 'Phone number must be exactly 10 digits.', 'error');
      return;
    }

    setStep(2);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(1);
  };

  // STEP 2: Final validation and submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType === 'dealer') {
      const total = Number(totalCapacity);
      const available = Number(availableParking);

      if (total <= 0) {
        Swal.fire('Validation Error', 'Total capacity must be greater than 0.', 'error');
        return;
      }

      if (available > total) {
        Swal.fire('Validation Error', 'Available parkings cannot be greater than total capacity.', 'error');
        return;
      }

      if (selectedParkingTypes.twoWheeler && Number(twoWheelerCount) > total) {
        Swal.fire('Validation Error', 'Number of 2-Wheeler parkings cannot be greater than total capacity.', 'error');
        return;
      }

      if (selectedParkingTypes.fourWheeler && Number(fourWheelerCount) > total) {
        Swal.fire('Validation Error', 'Number of 4-Wheeler parkings cannot be greater than total capacity.', 'error');
        return;
      }
    }

    Swal.fire('Success', 'Registration successful!', 'success');
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
{step === 2 && (
  <FaArrowLeft
    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
    onClick={handlePrevious}
  />
)}

  <h3 className="mb-4 text-center">Register</h3>
  <div style={{ width: '80px' }} /> {/* empty space to balance */}
</div>

              <Form onSubmit={handleSubmit}>
                {step === 1 && (
                  <>
                    {/* BASIC DETAILS */}
                    <h5 className="mb-3">Basic Details</h5>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formName" className="mb-3">
                          <Form.Label>
                            Full Name<span style={{ color: 'red' }}>*</span>
                          </Form.Label>
                          <Form.Control type="text" placeholder="Enter full name" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formEmail" className="mb-3">
                          <Form.Label>
                            Email<span style={{ color: 'red' }}>*</span>
                          </Form.Label>
                          <Form.Control type="email" placeholder="Enter email" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formAge" className="mb-3">
                          <Form.Label>
                            Age<span style={{ color: 'red' }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formPhone" className="mb-3">
                          <Form.Label>
                            Phone Number<span style={{ color: 'red' }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group controlId="formAddress" className="mb-3">
                          <Form.Label>
                            Address<span style={{ color: 'red' }}>*</span>
                          </Form.Label>
                          <Form.Control as="textarea" rows={2} placeholder="Enter address" required />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group controlId="formImage" className="mb-3">
                          <Form.Label>Profile Image</Form.Label>
                          <Form.Control type="file" />
                        </Form.Group>
                      </Col>
                       <Col md={12}>
                      <h5 className="mb-3">Select User Type</h5>
                    <Form.Check
                      inline
                      label="Parking User"
                      name="userType"
                      type="radio"
                      id="customer"
                      value="customer"
                      checked={userType === 'customer'}
                      onChange={(e) => setUserType(e.target.value)}
                    />
                    <Form.Check
                      inline
                      label="Parking Manager"
                      name="userType"
                      type="radio"
                      id="dealer"
                      value="dealer"
                      checked={userType === 'dealer'}
                      onChange={(e) => setUserType(e.target.value)}
                    />
                    </Col>
                    </Row>

                    <div className="d-grid mt-4 mb-3">
                      <Button variant="primary" onClick={handleNext}>
                        Next
                      </Button>
                    </div>
                    
                  </>
                )}

                {step === 2 && (
                  <>
                    {/* USER TYPE */}
                    

                    {userType === 'customer' && (
                      <>
                        <h5 className="mt-4 mb-3">Vehicle Registration</h5>
                        <Form.Group controlId="formVehicleNo" className="mb-3">
                          <Form.Label>
                            Vehicle Number Plate<span style={{ color: 'red' }}>*</span>
                          </Form.Label>
                          <Form.Control type="text" placeholder="Enter vehicle number" required />
                        </Form.Group>
                        <Form.Group controlId="formLicenseNo" className="mb-3">
                          <Form.Label>
                            License Number<span style={{ color: 'red' }}>*</span>
                          </Form.Label>
                          <Form.Control type="text" placeholder="Enter license number" required />
                        </Form.Group>
                        <Form.Group controlId="formRCBook" className="mb-3">
                          <Form.Label>
                            RC Book<span style={{ color: 'red' }}>*</span>
                          </Form.Label>
                          <Form.Control type="text" placeholder="Enter RC number" required />
                        </Form.Group>
                        <Form.Label>Vehicle Type</Form.Label>
                        <Form.Check
                          type="radio"
                          label="Two Wheeler"
                          name="vehicleType"
                          id="twoWheeler"
                          className="mb-2"
                          defaultChecked
                        />
                        <Form.Check
                          type="radio"
                          label="Four Wheeler"
                          name="vehicleType"
                          id="fourWheeler"
                        />
                      </>
                    )}

                    {userType === 'dealer' && (
                      <>
                        <h5 className="mt-4 mb-3">Parking Owner Details</h5>
                        <Form.Group controlId="formAreaSize" className="mb-3">
                          <Form.Label>
                            Property Area Size (sq ft)<span style={{ color: 'red' }}>*</span>
                          </Form.Label>
                          <Form.Control type="text" placeholder="Enter area size" required />
                        </Form.Group>
                        <Form.Group controlId="formTotalCapacity" className="mb-3">
                          <Form.Label>
                            Total Capacity<span style={{ color: 'red' }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter total capacity"
                            value={totalCapacity}
                            onChange={(e) => setTotalCapacity(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group controlId="formAvailableParking" className="mb-3">
                          <Form.Label>
                            Available Parkings<span style={{ color: 'red' }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter available parkings"
                            value={availableParking}
                            onChange={(e) => setAvailableParking(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Label>
                          Type of Parking<span style={{ color: 'red' }}>*</span>
                        </Form.Label>
                        <Row>
                          <Col md={6}>
                            <Form.Check
                              type="checkbox"
                              label="Two Wheeler"
                              name="twoWheeler"
                              checked={selectedParkingTypes.twoWheeler}
                              onChange={handleParkingTypeChange}
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Check
                              type="checkbox"
                              label="Four Wheeler"
                              name="fourWheeler"
                              checked={selectedParkingTypes.fourWheeler}
                              onChange={handleParkingTypeChange}
                            />
                          </Col>
                        </Row>

                        {selectedParkingTypes.twoWheeler && (
                          <Row className="mt-3">
                            <Col md={6}>
                              <Form.Group controlId="formTwoWheelerAmount" className="mb-3">
                                <Form.Label>
                                  2-Wheeler Per Hour Amount<span style={{ color: 'red' }}>*</span>
                                </Form.Label>
                                <Form.Control type="number" placeholder="Enter amount" required />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formTwoWheelerCount" className="mb-3">
                                <Form.Label>
                                  Number of 2-Wheeler Parkings<span style={{ color: 'red' }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="Enter count"
                                  value={twoWheelerCount}
                                  onChange={(e) => setTwoWheelerCount(e.target.value)}
                                  required
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        )}

                        {selectedParkingTypes.fourWheeler && (
                          <Row>
                            <Col md={6}>
                              <Form.Group controlId="formFourWheelerAmount" className="mb-3">
                                <Form.Label>
                                  4-Wheeler Per Hour Amount<span style={{ color: 'red' }}>*</span>
                                </Form.Label>
                                <Form.Control type="number" placeholder="Enter amount" required />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group controlId="formFourWheelerCount" className="mb-3">
                                <Form.Label>
                                  Number of 4-Wheeler Parkings<span style={{ color: 'red' }}>*</span>
                                </Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="Enter count"
                                  value={fourWheelerCount}
                                  onChange={(e) => setFourWheelerCount(e.target.value)}
                                  required
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        )}
                      </>
                    )}

                    <div className="d-grid mt-4 mb-3">
<Button variant="success" type="submit" className="w-100">
  Register
</Button>

</div>

                  </>
                )}

                <div className="text-center">
                  Already have an account? <Link to="/">Login</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
