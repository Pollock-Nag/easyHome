import axios from 'axios';
const BASE_URL = 'http://localhost:3001';

export const getAllHouses = async () => {
  const response = await axios.get(`${BASE_URL}/advertise/getAll`);
  return response.data;
};
export const getHousesByID = async (id) => {
  const response = await axios.get(`${BASE_URL}/advertise/${id}`);
  return response.data;
};
export const createPost = async (data) => {
  const response = await axios.post(`${BASE_URL}/advertise/create`, data);
  return response.data;
};
export const makeRating = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/advertise/rating/${id}`, data);
  return response.data;
};
export const makeBooking = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/advertise/booking/${id}`, data);
  return response.data;
};
export const updatePosts = async (id, data) => {
  // console.log(id, data);
  const response = await axios.put(`${BASE_URL}/advertise/${id}`, data);
  return response.data;
};
export const rejectRequest = async (id, data) => {
  // console.log(id, data);
  const response = await axios.put(
    `${BASE_URL}/advertise/booking/reject/${id}`,
    data
  );
  return response.data;
};
export const acceptRequest = async (id, data) => {
  // console.log(id, data);
  const response = await axios.put(
    `${BASE_URL}/advertise/booking/accept/${id}`,
    data
  );
  return response.data;
};
