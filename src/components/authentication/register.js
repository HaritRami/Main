import { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import vehicleType from '../../services/vehicleType';
import auth from '../../services/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import Loader from '../loader';

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
  const [errors, setErrors] = useState({});
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const response = await vehicleType.getAllVehicleTypes();
        setVehicleTypes(response.data);
      } catch (error) {
        showErrorToast("Error fetching vehicle types", error);
      }
    };

    fetchVehicleTypes();
  }, []);


  const validateStep1 = () => {

    const newErrors = {};

    if (!fullName?.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      newErrors.fullName = 'Full name must contain only letters and spaces.';
    }

    if (!email?.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    const numericAge = Number(age);
    if (!age || isNaN(numericAge) || numericAge < 18 || numericAge > 100) {
      newErrors.age = 'Age must be between 18 and 100.';
    }

    if (!phone?.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }

    if (!address?.trim()) {
      newErrors.address = 'Address is required.';
    }

    if (!password?.trim()) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    } else if (
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      newErrors.password = 'Password must include uppercase, number, and special character.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStep2 = () => {
    const newErrors = {};

    const vehiclePattern = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    if (!vehicleNo || vehicleNo.trim() === '') {
      newErrors.vehicleNo = 'Vehicle number is required.';
    } else if (!vehiclePattern.test(vehicleNo)) {
      newErrors.vehicleNo = 'Invalid vehicle number format.';
    }

    const licensePattern = /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/;
    if (!licenseNo || licenseNo.trim() === '') {
      newErrors.licenseNo = 'License number is required.';
    } else if (!licensePattern.test(licenseNo)) {
      newErrors.licenseNo = 'Invalid license number.';
    }

    const rcBookPattern = /^[A-Z0-9]{6,}$/;
    if (!rcBook || rcBook.trim() === '') {
      newErrors.rcBook = 'RC Book number is required.';
    } else if (!rcBookPattern.test(rcBook)) {
      newErrors.rcBook = 'Invalid RC Book number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextOrRegister = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    if (userType === 'dealer') {
      setLoading(true);
      const payload = {
        full_name: fullName,
        phone_number: phone,
        address: address,
        password,
        user_type: 'owner',
        age: Number(age),
        email
      };

      try {
        const response = await auth.register(payload);
        if (response.status === 200 || response.status === 201) {
          setOtpStep(true);
          showSuccessToast('OTP sent to your email');
        }
        setLoading(false);
      } catch (error) {

        showErrorToast(
          error?.response?.data?.data?.[0] && typeof error.response.data.data[0] === 'object'
            ? Object.values(error.response.data.data[0])[0]?.[0]
            : 'Registration failed')
      }
      finally {
        setLoading(false)
      }
    } else {
      setStep(2);
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmitStep2 = async (e) => {

    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);

    const selectedVehicle = document.querySelector('input[name="vehicleType"]:checked');
    const vehicle_type = selectedVehicle?.value || '';

    const selectedVehicleObj = vehicleTypes.find(v => v.vehicle_type === vehicle_type);
    const vehicle_type_id = selectedVehicleObj?.id;

    const payload = {
      full_name: fullName,
      phone_number: phone,
      address: address,
      password,
      user_type: 'customer',
      age: Number(age),
      email,
      number_plate: vehicleNo,
      licence_number: licenseNo,
      rc_book_number: rcBook,
      vehicle_type: vehicle_type_id,
      insurance_document: ""
    };

    try {
      const response = await auth.register(payload);      
      if (response.status === 200 || response.status === 201) {
        showSuccessToast('OTP sent to your email');
        setOtpStep(true);
        setLoading(false);
      }

    } catch (error) {
      console.log(error)
      showErrorToast(
        error?.response?.data?.data?.[0] && typeof error.response.data.data[0] === 'object'
          ? Object.values(error.response.data.data[0])[0]?.[0]
          : 'Registration failed')
    }
    finally {
      setLoading(false)
    }
  };

  const handleVerifyOtp = async () => {

    const newErrors = {};
    if (otp.some((digit) => digit === '')) {
      newErrors.otp = 'Please enter the OTP';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setErrors({});

    try {
      const code = otp.join('');

      const payload = {
        otp: code,
        email: email
      };

      await auth.verifyOtp(payload);
      showSuccessToast('OTP Verified! Your registration is complete.')
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 2000);

    } catch (error) {
      showErrorToast(error?.response?.data?.message || 'Verification Failed: Invalid OTP or server error')
    }
    finally {
      setLoading(false);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const payload = {
        email: email
      };

      await auth.resendOtp(payload);
      
      
      setLoading(false);
      showSuccessToast('OTP Resent! A new OTP has been sent to your email.')
    } catch (error) {
      setLoading(false);
      showErrorToast(error?.response?.data?.message || 'Resend Failed: Unable to resend OTP. Please try again.')
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <ToastContainer />
      {loading && <Loader text="Processing your request..." />}

      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              {!otpStep && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  {step === 2 && (
                    <FaArrowLeft
                      style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                      onClick={handlePrevious}
                    />
                  )}
                  <h3 className="mx-auto text-center">Register</h3>
                </div>
              )}


              {otpStep ? (
                <>
                 {loading && <Loader text="Processing your request..." />}
                  <h4 className="mb-3 text-center">OTP Verification</h4>
                  <p className="text-center mb-1">Email: <strong>{email}</strong></p>
                  <p className="text-muted text-center mb-4">Enter the 4-digit code sent to your email</p>

                  <Form.Group className="mb-3 d-flex justify-content-center gap-2">
                    {otp.map((digit, index) => (
                      <Form.Control
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
  const value = e.target.value.replace(/[^0-9]/g, '');
  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);
  if (value && index < 3) {
    inputRefs.current[index + 1].focus();
  }
}}
                        onKeyDown={(e) => {
  if (e.key === 'Backspace') {
    const newOtp = [...otp];
    if (otp[index]) {
      newOtp[index] = '';
      setOtp(newOtp);
    } else if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }
}}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="text-center"
                        style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}
                      />

                    ))}
                  </Form.Group>
                  {errors.otp && (
                    <div className="text-danger text-center mb-2" style={{ fontSize: '0.875rem' }}>
                      {errors.otp}
                    </div>
                  )}

                  <div className="text-center mb-3">
                    <a
                      href="#"
                      className="text-primary"
                      style={{ fontSize: '0.9rem' }}
                      onClick={handleResendOtp}
                    >
                      Resend OTP
                    </a>
                  </div>

                  <div className="d-grid">
                    <Button variant="success" onClick={() => handleVerifyOtp(otp.join(''))}>
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
                            <Form.Control
                              type="text"
                              placeholder="Enter full name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              isInvalid={!!errors.fullName}

                            />
                            {errors.fullName && (
                              <Form.Text className="text-danger">{errors.fullName}</Form.Text>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              isInvalid={!!errors.email}
                            />
                            {errors.email && (
                              <Form.Text className="text-danger">{errors.email}</Form.Text>
                            )}
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
                              isInvalid={!!errors.age}
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
                              isInvalid={!!errors.phone}
                            />
                            {errors.phone && (
                              <Form.Text className="text-danger">{errors.phone}</Form.Text>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>Address<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              placeholder="Enter address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              isInvalid={!!errors.address}
                            />
                            {errors.address && (
                              <Form.Text className="text-danger">{errors.address}</Form.Text>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formPassword" className="mb-3 position-relative">
                            <Form.Label>
                              Password<span style={{ color: 'red' }}>*</span>
                            </Form.Label>
                            <Form.Control
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              isInvalid={!!errors.password}
                            />
                            <span
                              onClick={() => setShowPassword(!showPassword)}
                              style={{
                                position: 'absolute',
                                right: errors.password ? '30px' : '10px',
                                top: '37px',
                                cursor: 'pointer',
                                color: '#888'
                              }}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
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
                          placeholder="Ex.GJ01AB1234"
                          value={vehicleNo}
                          onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                          isInvalid={!!errors.vehicleNo}

                        />
                        {errors.vehicleNo && (
                          <Form.Text className="text-danger">{errors.vehicleNo}</Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group controlId="formLicenseNo" className="mb-3">
                        <Form.Label>License Number<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ex.GJ0120191234567"
                          value={licenseNo}
                          onChange={(e) => setLicenseNo(e.target.value.toUpperCase())}
                          isInvalid={!!errors.licenseNo}

                        />
                        {errors.licenseNo && (
                          <Form.Text className="text-danger">{errors.licenseNo}</Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group controlId="formRCBook" className="mb-3">
                        <Form.Label>RC Book<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ex.GJ01AB1234"
                          value={rcBook}
                          onChange={(e) => setRcBook(e.target.value.toUpperCase())}
                          isInvalid={!!errors.rcBook}
                        />
                        {errors.rcBook && (
                          <Form.Text className="text-danger">{errors.rcBook}</Form.Text>
                        )}
                      </Form.Group>
                      <Form.Label>Vehicle Type</Form.Label>
                      <div className="row">
                        {vehicleTypes.map((type, index) => (
                          <div className="col-md-4 mb-3" key={type.id}>
                            <label
                              htmlFor={`vehicleType-${index}`}
                              className="border rounded d-flex align-items-center justify-content-center gap-2 cursor-pointer w-100"
                            >
                              <Form.Check
                                type="radio"
                                name="vehicleType"
                                id={`vehicleType-${index}`}
                                value={type.vehicle_type}
                                className="mb-0"
                                defaultChecked={index === 0}
                              />
                              <img
                                src={type.icon}
                                alt={type.vehicle_type}
                                style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                              />
                              <div className="text-capitalize">{type.vehicle_type}</div>
                            </label>
                          </div>
                        ))}
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
