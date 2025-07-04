import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaArrowLeft } from 'react-icons/fa';

function Register() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('customer');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  const [rcBook, setRcBook] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};

    if (age === '' || Number(age) <= 17 || Number(age) > 100) {
      newErrors.age = 'Age must be 18 or above.';
    }

    if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }

    if (password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    } else if (
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      newErrors.password = 'Must include uppercase, number, and special character.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextOrRegister = (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    if (userType === 'dealer') {
      setOtpStep(true);
    } else {
      setStep(2);
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmitStep2 = (e) => {
    e.preventDefault();
    setOtpStep(true);
  };

  const handleVerifyOtp = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Registration successful!",
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                {step === 2 && !otpStep && (
                  <FaArrowLeft
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    onClick={handlePrevious}
                  />
                )}
                <h3 className="mx-auto text-center">Register</h3>
              </div>

              {otpStep ? (
                <>
                  <h5 className="mb-3 text-center">OTP Verification</h5>
                  <p className="text-muted text-center">Enter the 6-digit code sent to your phone</p>
                  <Form.Group controlId="otpInput" className="mb-3 d-flex justify-content-center align-items-center gap-2">
                    <a href="#" className="text-primary" style={{ fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                      Resend OTP
                    </a>
                    <div style={{ width: '200px' }}>
                      <Form.Control
                        type="text"
                        placeholder="Enter OTP"
                        maxLength={6}
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value.replace(/[^0-9]/g, ''))}
                        required
                        className="text-center"
                      />
                    </div>
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="success" onClick={handleVerifyOtp}>
                      Verify OTP & Complete Registration
                    </Button>
                  </div>
                </>
              ) : (
                <Form onSubmit={step === 2 ? handleSubmitStep2 : handleNextOrRegister}>
                  {step === 1 && (
                    <>
                      <h5 className="mb-3">Basic Details</h5>
                      <Row>
                        <Col md={6}>
                          <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Full Name<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control type="text" placeholder="Enter full name" required />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formAge" className="mb-3">
                            <Form.Label>Age<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter age"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                              required
                            />
                            {errors.age && (
                              <Form.Text className="text-danger">{errors.age}</Form.Text>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formPhone" className="mb-3">
                            <Form.Label>Phone Number<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Enter phone number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                            {errors.phone && (
                              <Form.Text className="text-danger">{errors.phone}</Form.Text>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>Address<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control as="textarea" rows={2} placeholder="Enter address" required />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Enter password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            {errors.password && (
                              <Form.Text className="text-danger">{errors.password}</Form.Text>
                            )}
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
                        <Button variant="primary" type="submit">
                          {userType === 'dealer' ? 'Register' : 'Next'}
                        </Button>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h5 className="mt-4 mb-3">Vehicle Registration</h5>
                      <Form.Group controlId="formVehicleNo" className="mb-3">
                        <Form.Label>Vehicle Number Plate<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter vehicle number"
                          value={vehicleNo}
                          onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="formLicenseNo" className="mb-3">
                        <Form.Label>License Number<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter license number"
                          value={licenseNo}
                          onChange={(e) => setLicenseNo(e.target.value.toUpperCase())}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="formRCBook" className="mb-3">
                        <Form.Label>RC Book<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter RC number"
                          value={rcBook}
                          onChange={(e) => setRcBook(e.target.value.toUpperCase())}
                          required
                        />
                      </Form.Group>
                      <Form.Label>Vehicle Type</Form.Label>
                      <div className="d-flex gap-3">
                        <label htmlFor="twoWheeler" className="border rounded p-3 d-flex align-items-center justify-content-center gap-2 cursor-pointer" style={{ width: "250px" }}>
                          <Form.Check
                            type="radio"
                            name="vehicleType"
                            id="twoWheeler"
                            value="twoWheeler"
                            className="mb-0"
                            defaultChecked
                          />
                          <i className="bi bi-bicycle" style={{ fontSize: "1.8rem" }}></i>
                          <div className="ms-2">Two Wheeler</div>
                        </label>
                        <label htmlFor="fourWheeler" className="border rounded p-3 d-flex align-items-center justify-content-center gap-2 cursor-pointer" style={{ width: "250px" }}>
                          <Form.Check
                            type="radio"
                            name="vehicleType"
                            id="fourWheeler"
                            value="fourWheeler"
                            className="mb-0"
                          />
                          <i className="bi bi-car-front" style={{ fontSize: "1.8rem" }}></i>
                          <div className="ms-2">Four Wheeler</div>
                        </label>
                      </div>
                      <div className="d-grid mt-4 mb-3">
                        <Button variant="success" type="submit" className="w-100">
                          Register
                        </Button>
                      </div>
                    </>
                  )}
                </Form>
              )}

              <div className="text-center mt-3">
                Already have an account? <Link to="/">Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
