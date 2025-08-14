import api from './api';

const vehicleType = {
  getAllVehicleTypes: async () => {
    try {
      const response = await api.get('/vehicles/vehicle-types/');
      return response.data;
    } catch (error) {
      console.error("Failed to fetch vehicle types:", error);
      throw error.response?.data || error;
    }
  },

  getVehicleTypeById: async (id) => {
    try {
      const response = await api.get(`/vehicles/vehicle-types/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch vehicle type with ID ${id}:`, error);
      throw error.response?.data || error;
    }
  },

  createVehicleType: async (data) => {
    try {
      const response = await api.post('/vehicles/vehicle-types/', data);
      return response.data;
    } catch (error) {
      console.error("Failed to create vehicle type:", error);
      throw error.response?.data || error;
    }
  },

  updateVehicleType: async (id, data) => {
    try {
      const response = await api.put(`/vehicles/vehicle-types/${id}/`, data);
      return response.data;
    } catch (error) {
      console.error(`Failed to update vehicle type with ID ${id}:`, error);
      throw error.response?.data || error;
    }
  },

  deleteVehicleType: async (id) => {
    try {
      const response = await api.delete(`/vehicles/vehicle-types/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete vehicle type with ID ${id}:`, error);
      throw error.response?.data || error;
    }
  }
};

export default vehicleType;
