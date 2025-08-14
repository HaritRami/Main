import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../services/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '../loader';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import Cookies from 'js-cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      const response = await auth.login({ email, password });
      if (response?.data?.length) {
        const { access, refresh, name, user_type } = response.data[0];
        const cookiesToStore = { access, refresh, name, user_type };

        for (const [key, value] of Object.entries(cookiesToStore)) {
          Cookies.set(key, value, { secure: true, sameSite: 'strict' });
        }
      }
      showSuccessToast('Login Successful')

      setTimeout(() => {
        setLoading(false);
        navigate('/home');
      }, 1600);
    } catch (error) {
      setLoading(false);
      showErrorToast(error?.response?.data?.message || 'Invalid email or password')
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      await auth.sendPasswordResetEmail({ email });
      showSuccessToast('OTP sent to your email');
      setTimeout(() => {
        setLoading(false);
        navigate('/forgot-password', { state: { email: email } });
      }, 2000);
    } catch (error) {
      setLoading(false);
      showErrorToast(error?.response?.data?.message || 'Failed to send OTP')
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
              <h3 className="mb-4 text-center">Login</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email address <span style={{ color: 'red' }}>*</span></Form.Label>
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
                <Form.Group controlId="formPassword" className="mb-3 position-relative">
                  <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      top: errors.password ? '39%' : '48%',
                      right: errors.password ? '35px' : '10px',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#888'
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.password && (
                    <Form.Text className="text-danger">{errors.password}</Form.Text>
                  )}
                  <div className="text-left mt-2">
                    <Button
                      variant="link"
                      onClick={handleSendOtp}
                      style={{ padding: 0, fontSize: '0.9rem' }}
                    >
                      Forgot Password?
                    </Button>
                  </div>
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
                <div className="text-center mt-3">
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
