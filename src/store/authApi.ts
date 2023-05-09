import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config/index';
import Cookies from 'js-cookie';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string, device_id: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${config.BASE_URL}/users/signin`, payload);
      const  token  = response.data.data.accessToken;
      localStorage.setItem('token', token);
      console.log(response);
      console.log(response.data.data.accessToken);
      return token;
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
}  catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = async () => {
    try {
      // await axios.post(`${config.BASE_URL}/users/logout`, null, {
      //   headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      // });
      sessionStorage.clear();
      localStorage.removeItem('token');
      console.log('Logged out successfully!');
    } catch (error) {
      console.error(error);
    }
  }
