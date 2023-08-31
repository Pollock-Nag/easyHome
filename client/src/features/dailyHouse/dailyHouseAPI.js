import axios from 'axios';
const BASE_URL = 'http://localhost:3001';

export const getAllHouses = async () => {
  const response = await axios.get(`${BASE_URL}/dailyhouse/getAll`);
  return response.data;
};
export const getHousesByID = async (id) => {
  const response = await axios.get(`${BASE_URL}/dailyhouse/${id}`);
  return response.data;
};
export const createPost = async (data) => {
  const response = await axios.post(`${BASE_URL}/dailyhouse/create`, data);
  return response.data;
};
export const makeRatingDaillyHouse = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/dailyhouse/rating/${id}`, data);
  return response.data;
};
export const makeBooking = async (id, data) => {
  const response = await axios.put(
    `${BASE_URL}/dailyhouse/booking/${id}`,
    data
  );
  return response.data;
};

export const updatePosts = async (id, data) => {
  // console.log(id, data);
  const response = await axios.put(`${BASE_URL}/dailyhouse/${id}`, data);
  return response.data;
};
export const rejectRequest = async (id, data) => {
  // console.log(id, data);
  const response = await axios.put(
    `${BASE_URL}/dailyhouse/booking/reject/${id}`,
    data
  );
  return response.data;
};
export const acceptRequest = async (id, data) => {
  // console.log(id, data);
  const response = await axios.put(
    `${BASE_URL}/dailyhouse/booking/accept/${id}`,
    data
  );
  return response.data;
};
