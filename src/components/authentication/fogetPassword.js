import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../services/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import Loader from '../loader';

function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const email = location.state?.email || '';

  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!email) {
      showErrorToast('Email not provided')
      navigate('/');
    }
  }, [email, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (otp.some((digit) => digit === '')) {
      newErrors.otp = 'Please enter the OTP';
    }

    if (!newPassword?.trim()) {
      newErrors.newPassword = 'New Password is required.';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters.';
    } else if (
      !/[A-Z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    ) {
      newErrors.newPassword = 'Password must include uppercase, number, and special character.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const code = otp.join('');

    try {
      await auth.confirmPasswordReset({
        email,
        otp: code,
        new_password: newPassword,
      });

      showSuccessToast('Password reset successfully')
      setTimeout(() => {
        setLoading(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      setLoading(false);
      showErrorToast(error?.response?.data?.message || 'Invalid OTP or email')
    }
  };

  const handleResendOtp = async () => {
  try {
    setLoading(true);
    await auth.resendOtp({ email });
    setLoading(false);
    showSuccessToast('OTP Resent! A new OTP has been sent to your email.');
  } catch (error) {
    showErrorToast(error?.response?.data?.message || 'Resend Failed: Unable to resend OTP. Please try again.');
  }
};

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <ToastContainer />
      {loading && <Loader text="Processing your request..." />}
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-4 text-center">Reset Password</h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} disabled />
                </Form.Group>
                <h6 className="text-center mb-2 text-muted">Enter OTP sent to your email</h6>
                <Form.Group className="mb-2 d-flex justify-content-center gap-2">
                  {otp.map((digit, index) => (
                    <Form.Control
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        const newOtp = [...otp];
                        newOtp[index] = val;
                        setOtp(newOtp);
                        if (val && index < otp.length - 1) inputRefs.current[index + 1]?.focus();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[index] && index > 0) {
                          inputRefs.current[index - 1]?.focus();
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
    // href="#"
    className="text-primary"
    style={{ fontSize: '0.9rem' }}
    onClick={handleResendOtp}
  >
    Resend OTP
  </a>
</div>

                <Form.Group className="mb-3 position-relative">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    isInvalid={!!errors.newPassword}
                    required
                  />
                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      position: 'absolute',
                      top: errors.newPassword ? '52%' : '70%',
                      right: errors.newPassword ? '35px' : '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#888'
                    }}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <Form.Control.Feedback type="invalid">{errors.newPassword}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 position-relative">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    isInvalid={!!errors.confirmPassword}
                    required
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      top: errors.confirmPassword ? '52%' : '70%',
                      right: errors.confirmPassword ? '35px' : '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#888'
                    }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="success" onClick={handleResetPassword}>
                    Reset Password
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
