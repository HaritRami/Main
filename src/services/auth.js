import api from './api';

const auth = {
  register: async (userData) => {
    try {
      const response = await api.post('/api/auth/register/', userData);
      return response.data;
    } catch (error) {      
      console.error("Registration failed:", error);
      throw error;
    }
  },

  verifyOtp: async (otpData) => {
    try {

      const response = await api.post('/api/auth/verification/', otpData);
      return response.data;
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw error;
    }
  },
  resendOtp: async (emailData) => {

    try {
      const response = await api.post('/api/auth/resend-otp/', emailData);
      return response.data;
    } catch (error) {
      console.error("Resend OTP failed:", error);
      throw error;
    }
  },
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login/', credentials);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
  sendPasswordResetEmail: async (emailData) => {
    try {
      const response = await api.post('/api/password-reset/request/', emailData);
      return response.data;
    } catch (error) {
      console.error("Password reset request failed:", error);
      throw error;
    }
  },
  confirmPasswordReset: async (resetData) => {
    try {
      const response = await api.post('/api/password-reset/confirm/', resetData);
      return response.data;
    } catch (error) {
      console.error("Password reset confirmation failed:", error);
      throw error;
    }
  }
};

export default auth;
